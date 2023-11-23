/*
  Routes Users/ Auth
  host + /api/auth
*/ 

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/fields-validation')
const { validationJWT } = require('../middlewares/validation-jwt.js')

const router = Router();

const { creationUser, loginUser, renewToken } = require('../controllers/auth');

router.post('/new',
[//midlewares
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El passwordebe de ser de 6 caracteres').isLength({ min: 6 }),
  fieldValidation
],
creationUser 
)

router.post('/',
[//midlewares
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
  fieldValidation
],
loginUser)

router.get('/renew', validationJWT, renewToken)

module.exports = router;