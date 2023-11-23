const { response } = require('express');
const { validationResult } = require('express-validator' )

const fieldValidation = ( req, res = response, next) => {

  // handle of errors
  const errors = validationResult( req );
  if ( !errors.isEmpty() ) {
    return res.status(400).json({
      ok:false,
      errors: errors.mapped()
    })
  }

  next();
}

module.exports =  {
  fieldValidation
}