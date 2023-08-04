import { check } from 'express-validator';


// import prisma client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



// ------------------ Post AD Validation ------------------ //


// check if category exists
const category = check('category_name').custom(async (value: string) => {
    const category = await prisma.category.findUnique({
        where: { name: value },
    });

    if (!category) {
        throw new Error('Category does not exist.')
    }
})


// check if title length is valid
const title = check('title').isLength({ min: 5, max: 50 })
                            .withMessage('Title length should be between 5 and 50 characters.')


// check if description length is valid. Description is optional
const description = check('description').optional().isLength({ min: 5, max: 500 })
                            .withMessage('Description length should be between 5 and 500 characters.')


// check if price is valid. Price is optional
const price = check('price').optional().isNumeric()
                            .withMessage('Price should be a number.')


// check if is_negotiable is valid. is_negotiable is optional and defaults to false
const is_negotiable = check('is_negotiable').optional().isBoolean()
                            .withMessage('is_negotiable should be true/false.')


// check if is_used is valid. is_used is optional and defaults to true
const is_used = check('is_used').optional().isBoolean()
                            .withMessage('is_used should be true/false.')


// check if days_used is valid. days_used is optional
const days_used = check('days_used').optional().isInt()
                            .withMessage('days_used should be an integer.')


// check if is_phone_public is valid. is_phone_public is optional and defaults to false
const is_phone_public = check('is_phone_public').optional().isBoolean()
                            .withMessage('is_phone_public should be true/false.')


// check if address is valid.
const address = check('address').isLength({ min: 5, max: 100 })
                            .withMessage('Address length should be between 5 and 100 characters.')
    

// check if promotion_type is valid.
const promotion_type = check('promotion_type').custom(async (value: string) => {
    const promotion = await prisma.promotions.findUnique({
        where: { promotion_type: value },
    });

    if (!promotion) {
        throw new Error('Promotion does not exist.')
    }
})



export const postAdValidation = [category, title, description, price, is_negotiable, 
                                is_used, days_used, is_phone_public, address, promotion_type]