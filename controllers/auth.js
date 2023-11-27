const { response } = require('express');
const bcrypt = require('bcryptjs'); 
const User  = require('../models/User');
const  { generationJWT } = require('../helpers/jwt')

const creationUser = async (req, res = response ) => {
  
  const {  email, password } = req.body;

  try {
    
    let user = await User.findOne({email})

    if (user) {
      return res.status(400).json({
        ok:false,
        msg: 'Un usuario existe con ese correo'
      });
    }
     user = new User( req.body ); 

    // Encrypt Password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt ); 

     await user.save();

     //generation JWT
     const token = await  generationJWT( user.id, user.name )

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      // token: token
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg:'Por favor hable con el admin'
    });
  }
  
}

const loginUser = async (req, res= response) => {

  const {  email, password } = req.body;
  
 try {
  const user = await User.findOne({email})

  if ( !user ) {
    return res.status(400).json({
      ok:false,
      msg: 'Un usuario no existe con ese email'
    });
  }
  
  // validation password
  const validPassword = bcrypt.compareSync( password, user.password )

  if( !validPassword ) {
    return res.status(400).json({
      ok:false,
      msg: 'Password incorrecto'
    });
  }

  // generation our JWT
  const token = await  generationJWT( user.id, user.name );

  res.status(201).json({
    ok: true,
    uid: user.id, 
    name: user.name,
    token
  })

 } catch (error) {
  console.log(error);
  res.status(500).json({
    ok: false,
    msg:'Por favor hable con el admin'
  });
 } 
}

const renewToken = async  (req, res) => {
  
  const { uid, name }  = req

  //generation JWT
  const token = await  generationJWT( uid,    name )


  res.status(201).json({
    ok: true,
    uid,
    name,
    token
  })
}


module.exports = {
  creationUser,
  loginUser,
  renewToken

}