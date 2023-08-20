import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';
import { notify_user } from './user_notification.controller';
import _ from 'lodash';
import * as dotenv from "dotenv";

const limit = 10;


dotenv.config();

/**
 * @todo consult the frontend guy about the things to be shown in the pending review list card
 * @param req 
 * @param res 
 * @returns 
 */


// get all pending reviews: /api/admin/ad_reviews
export const get_all_pending_reviews = async (req: Request, res: Response) => {
    try {
        let skip = (Number(req.query.page || 1) - 1) * limit;
        if (skip < 0) skip = 0;
        const pending_reviews = await prisma.ads.findMany({
            where: {
                status: 'pending'
            },

            orderBy: {
                createdAt: 'desc'
            },

            skip: skip,

            take: limit,
        });

        const total_pending_reviews = await prisma.ads.count({
            where: {
                status: 'pending'
            }
        });


        // console.log(pending_reviews);
        return res.status(200).json({
            "current_page": req.query.page || 1,
            "total_pages": Math.ceil(total_pending_reviews / limit),

            "review_list": pending_reviews
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}



// get pending review details: /api/admin/ad_reviews/:id
export const get_pending_review_details = async (req: Request, res: Response) => {
    try {
        let review_details: {
            id: number;
            op_username: string;
            op?: {
                name: string;

            };
            category_name: string;
            title: string;
            description?: string | null;
            price?: number | null;
            is_negotiable: boolean;
            is_used: boolean;
            is_sell_ad: boolean;
            is_phone_public: boolean;
            days_used?: number | null;
            address?: string | null;
            promotion_type: string;
            createdAt: Date;
            status?: string;
        } | null
            = await prisma.ads.findUnique({
                where: { id: Number(req.params.id) },
                select: {
                    id: true,
                    op_username: true,
                    op: {
                        select: {
                            name: true
                        },
                    },
                    category_name: true,
                    title: true,
                    description: true,
                    price: true,
                    is_negotiable: true,
                    is_used: true,
                    is_sell_ad: true,
                    is_phone_public: true,
                    days_used: true,
                    address: true,
                    promotion_type: true,
                    createdAt: true,
                    status: true,
                }
            });


        // ad not found
        if (!review_details || review_details.status !== 'pending') {
            return res.status(404).json({
                success: false,
                error: 'review not found!'
            });
        }


        let usage_time = undefined;
        if (review_details.days_used !== undefined && review_details.days_used !== null) {
            usage_time = {
                years: Math.floor(review_details.days_used / 365),
                months: Math.floor((review_details.days_used % 365) / 30),
                days: Math.floor((review_details.days_used % 365) % 30),
            }
        }


        // phone is sent even if is_phone_public is false
        const user = await prisma.users.findUnique({
            where: { username: review_details.op_username },
            select: { phone: true }
        });



        // capitalize
        const op_fullname = _.startCase(review_details.op!.name);


        // remove days_used from review_details
        delete review_details.days_used;

        // remove op from review_details
        delete review_details.op;

        // add usage_time and phone to review_details
        const review_details_json = {
            ...review_details,
            usage_time: usage_time,
            phone: user?.phone,
            op_fullname: op_fullname,
        }



        return res.json(review_details_json);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

/**
 * checks whether the ad exists or not
 * if not, return 404
 * checks whether the ad is pending or not
 * if not pending, return 404
 * if pending, approve the ad and notify the user
 * @param req 
 * @param res 
 * @returns 
 */
// approve pending review: PUT /api/admin/ad_reviews/:id
export const approve_pending_review = async (req: Request, res: Response) => {
    try {
        const pending_review = await prisma.ads.findUnique({
            where: {
                id: Number(req.params.id!)
            }
        });

        if (!pending_review) return res.status(404).json({});

        if (pending_review.status !== 'pending') return res.status(404).json({});

        const updated_review = await prisma.ads.update({
            where: {
                id: Number(req.params.id!)
            },

            data: {
                status: 'approved'
            }
        });

        // notify user
        await notify_user(pending_review.op_username,
            'ad_approved',
            'Ad Approved',
            `Your ad #${updated_review.id} titled "${updated_review.title}" has been approved by the admin.`);

        return res.status(200).json(updated_review);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


/**
 * checks whether the ad exists or not
 * if not, return 404
 * checks whether the ad is pending or not
 * if not pending, return 404
 * if pending, deletes the ad from ads table and add it to archived ads table
 * notify the user why his ad is declined
 * @todo add reason to archived ads table
 * @param req 
 * @param res 
 * @returns 
 */
// decline pending review: DELETE /api/admin/ad_reviews/:id
export const decline_pending_review = async (req: Request, res: Response) => {
    try {
        const pending_review = await prisma.ads.findUnique({
            where: {
                id: Number(req.params.id!)
            }
        });

        if (!pending_review) return res.status(404).json({});

        if (pending_review.status !== 'pending') return res.status(404).json({ "error": "ad not pending" });

        // delete from ads table
        const deleted_review = await prisma.ads.delete({
            where: {
                id: Number(req.params.id!)
            }
        });

        // add to archived ads table
        const archived_review = await prisma.archived_ads.create({
            data: {
                op_username: pending_review.op_username,
                title: pending_review.title,
                description: pending_review.description,
                price: pending_review.price,
                image1: pending_review.image1,
                address: pending_review.address,
            }
        });



        // notify user
        await notify_user(pending_review.op_username,
            'ad_declined',
            'Ad Declined',
            `Your ad #${deleted_review.id} titled "${deleted_review.title}" has been declined by the admin for "${req.body.reason}"`);

        return res.status(200).json(archived_review);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
