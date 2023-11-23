/*
  Events routs
  host + /api/events
*/

const { Router } = require('express');
const { check } = require( 'express-validator') 
const { fieldValidation } = require('../middlewares/fields-validation')
const { isDate } = require('../helpers/isDate')


const { validationJWT } = require('../middlewares/validation-jwt')
const { getEvents, creationEvent, updateEvent, deleteEvent } = require ('../controllers/events')

//Everything should validation jwt
//Get events
const router = Router();

router.use(validationJWT);

//Get events
router.get('/', getEvents)
 
//Creation new events
router.post(
  '/',
   [
      check('title', 'El titulo es obligatorio').not().isEmpty(),
      check('start', 'fecha de inicio es obligatoria').custom( isDate ),
      check('end', 'fecha de finalización es obligatoria').custom( isDate ),
      fieldValidation
   ],
  creationEvent )

//Update  events
router.put('/:id', updateEvent)

//Delete  events
router.delete('/:id', deleteEvent)


module.exports = router;