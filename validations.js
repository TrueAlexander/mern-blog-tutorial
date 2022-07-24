import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Wrong email format').isEmail(),
  body('password', 'Password min length should be 5 symbols').isLength({min: 5}),
]

export const registerValidation = [
  body('email', 'Wrong email format').isEmail(),
  body('password', 'Password min length should be 5 symbols').isLength({min: 5}),
  body('fullName', 'Add your name').isLength({min: 3}),
  body('avatarUrl', 'Wrong URL address').optional().isURL(),

]

export const postCreateValidation = [
  body('title', 'Add a title').isLength({min: 3}).isString(),
  body('text', 'Add a text').isLength({min: 3}).isString(),
  body('tags', 'Wrong format of tags (add an array)').optional().isString(),
  body('imageUrl', 'Wrong URL address').optional().isString(),

]