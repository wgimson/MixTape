// Accessing the Service that we just created

var MixTapeService = require('../services/mixtape.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getMixTapes = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var mixtapes = await MixTapeService.getMixTapes({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: mixtapes, message: "Succesfully Retrieved MixTapes"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createMixTape = async function(req, res, next){

    // Req.Body contains the form submit values.

    var mixtape = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdMixTape = await MixTapeService.createMixTape(mixtape)
        return res.status(201).json({status: 201, data: createdMixTape, message: "Succesfully Created ToDo"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"})
    }
}

exports.updateMixTape = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var mixtape = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updatedMixTape = await MixTapeService.updateMixTape(mixtape)
        return res.status(200).json({status: 200, data: updatedMixTape, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeMixTape = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await MixTapeService.deleteMixTape(id)
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}