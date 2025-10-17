// a file to manage and access all controllers

const model=require('../models/model')

// post request on: http://localhost:8080/api/categories
function create_Categories(req,res ){
    const Create = new model.Categories({
        type:"Savings",
        color:'#1f3b5c'
    })

    Create.save(function(err){
        if(!err) return res.json(Create)
        return res.status(400).json({message:`Error while creating categories ${err}`});
    });
}

module.exports={
    create_Categories
}