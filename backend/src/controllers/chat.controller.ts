import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';
import _ from 'lodash';
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';


dotenv.config();


// get chat thread: /api/chat/:ad_id
export const get_chat_thread = async (req: Request, res: Response) => {

    try {
        const ad_id = Number(req.params.ad_id);


        // check if the ad exists
        const ad = await prisma.ads.findUnique({
            where: {
                id: ad_id
            }
        });

        if (!ad || ad.status !== 'approved') {
            return res.status(404).json({
                success: false,
                error: "ad not found!"
            });
        }

        // check if the user is the owner of the ad
        if (ad.op_username === req.user.username) {
            return res.status(403).json({
                success: false,
                error: "You are the owner of this ad! You can't chat with yourself!"
            });
        }

        // get the chat thread
        const chat_thread = await prisma.threads.findFirst({
            where: {
                AND: [
                    { ad_id: ad_id },
                    { client_username: req.user.username }
                ]

            },
            select: {
                id: true,
            }
        });

        // if thread doesn't exist, create a new thread
        if (!chat_thread) {
            const new_thread = await prisma.threads.create({
                data: {
                    id: uuidv4(),
                    ad_id: ad_id,
                    op_username: ad.op_username,
                    client_username: req.user.username
                }
            });

            return res.status(201).json({
                success: true,
                thread_id: new_thread.id
            });

        }

        return res.status(200).json({
            success: true,
            thread_id: chat_thread.id
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error!"
        });
    }
}

// send message: POST /api/chat/threads/:thread_id
export const send_message = async (req: Request, res: Response) => {
    try {// check if the thread exists
        const thread_id = req.params.thread_id;

        const thread = await prisma.threads.findUnique({
            where: {
                id: thread_id
            }
        });

        if (!thread) {
            return res.status(404).json({
                success: false,
                error: "Thread not found!"
            });
        }

        // check if the user is the participant of the thread
        if (thread.op_username !== req.user.username && thread.client_username !== req.user.username) {
            return res.status(403).json({
                success: false,
                error: "You are not the participant of this thread!"
            });
        }

        // add the message to the thread
        const new_message = await prisma.text_chats.create({
            data: {
                thread_id: thread_id,
                sender_username: req.user.username,
                receiver_username: thread.op_username === req.user.username ? thread.client_username : thread.op_username,
                text: req.body.message
            }
        });

        // update the thread
        await prisma.threads.update({
            where: {
                id: thread_id
            },
            data: {
                updated_at: new Date()
            }
        });

        return res.status(201).json({
            success: true,
            message: new_message
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error!"
        });
    }
}

// get messages: GET /api/chat/threads/:thread_id
export const get_messages = async (req: Request, res: Response) => {
    try {
        // check if the thread exists
        const thread_id = req.params.thread_id;

        const thread = await prisma.threads.findUnique({
            where: {
                id: thread_id
            }
        });

        if (!thread) {
            return res.status(404).json({
                success: false,
                error: "Thread not found!"
            });
        }

        // check if the user is the participant of the thread
        if (thread.op_username !== req.user.username && thread.client_username !== req.user.username) {
            return res.status(403).json({
                success: false,
                error: "You are not the participant of this thread!"
            });
        }

        // get the messages
        const messages_from_db = await prisma.text_chats.findMany({
            where: {
                thread_id: thread_id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const messages_to_send = messages_from_db.map(message => {
            return {
                sender: message.sender_username,
                receiver: message.receiver_username,
                text: message.text,
                timestamp: message.createdAt,
                is_my_message: message.sender_username === req.user.username
            }
        });


        return res.status(200).json(messages_to_send);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error!"
        });
    }
}


// get chat inbox: GET /api/chat/inbox
export const get_inbox = async (req: Request, res: Response) => {
    try {
        // get the threads
        const threads_from_db = await prisma.threads.findMany({
            where: {
                OR: [
                    { op_username: req.user.username },
                    { client_username: req.user.username }
                ]
            },
            include: {
                ad: {
                    select: {
                        title: true,
                        is_sell_ad: true
                    }
                },
                text_chats: {

                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1
                }
            },

            orderBy: {
                updated_at: 'desc'
            }
        });

        let threads_to_send = threads_from_db.map(thread => {

            const last_message = thread.text_chats.length > 0 ? thread.text_chats[0] : null;



            return {
                thread_id: thread.id,
                receiver: thread.op_username === req.user.username ? thread.client_username : thread.op_username,
                ad_id: thread.ad_id,
                ad_title: thread.ad.title,
                is_sell_ad: thread.ad.is_sell_ad,
                am_i_op: thread.op_username === req.user.username,
                last_message: last_message ? {
                    sender: last_message.sender_username,
                    timestamp: last_message.createdAt,
                    message: last_message.text,
                    is_my_msg: last_message.sender_username === req.user.username
                } : null
            }
        });

        // remove threads with no messages
        threads_to_send = threads_to_send.filter(thread => thread.last_message !== null);

        return res.status(200).json(threads_to_send);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error!"
        });
    }
}