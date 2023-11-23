const { response } = require('express')
const Event = require('../models/Event')

const getEvents = async ( req, res=response ) => {

  const event = await Event.find()
                            .populate('user', 'name');

  res.json({
    ok: true,
    event
  });

}

const creationEvent = async ( req, res=response ) => {

  const event = new Event( req.body )
  
  try {

    event.user = req.uid;

    const eventSave = await event.save();

    res.json({
      ok: true,
      event: eventSave 
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el admin'
    });
  }
}

const updateEvent = async ( req, res=response) => {

  const eventId = req.params.id;
  const uid = req.uid;


  try {

    const event = await Event.findById( eventId );
    
    if ( !event ) {
      res.status(404).json({
        ok: false,
        msg: 'evento no existe por ese id' 
      });
    }
    
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'no tiene privilegio de editar este event'
      })
    }

     const newEvent = {
        ...req.body,
        user:uid
     }

     const eventUpdate =await  Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

     res.json({
      ok: true,
      event: eventUpdate
     });  


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Hable con el admin'
    })
  }

}

const deleteEvent = async ( req, res=response) => {

  const eventId = req.params.id;
  const uid = req.uid;


  try {

    const event = await Event.findById( eventId );
    
    if ( !event ) {
      return res.status(404).json({
        ok: false,
        msg: 'evento no existe por ese id' 
      });
    }
    
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'no tiene privilegio para eliminar este event'
      })
    }

     await  Event.findByIdAndDelete( eventId );

     res.json({
      ok: true,

     });  


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Hable con el admin'
    })
  }
}

module.exports = {
  getEvents,
  creationEvent,
  updateEvent,
  deleteEvent
}