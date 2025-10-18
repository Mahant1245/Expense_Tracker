// a file to manage and access all controllers

const model = require('../models/model');

// POST request on: http://localhost:8080/api/categories
async function create_Categories(req, res) {
  try {
    const Create = new model.Categories({
      type: "Investment",
      color: "#FCBE44"
    });

    // Save using async/await instead of callback
    const savedCategory = await Create.save();

    // Return the saved data as JSON
    return res.json(savedCategory);

  } catch (err) {
    console.error(" Error while creating category:", err);
    return res
      .status(400)
      .json({ message: `Error while creating categories: ${err.message}` });
  }
}

// get request on: http://localhost:8080/api/categories
async function get_Categories(req, res) {
    let data=await model.Categories.find({})
    // filter var only for type and color
    let filter=await data.map(v=> Object.assign({},{type:v.type,color:v.color}));

    return res.json(filter)
}


// post request on: http://localhost:8080/api/transaction
// controller for creating a new transaction
async function create_transation(req, res) {
  try {
    if (!req.body)
      return res.status(400).json("Post HTTP data not provided");

    const { name, type, amount } = req.body;

    const create = new model.Transactions({
      name,
      type,
      amount,
      date: new Date()
    });

    const savedTransaction = await create.save();
    return res.json(savedTransaction);

  } catch (err) {
    console.error("Error while creating transaction:", err);
    return res
      .status(400)
      .json({ message: `Error while creating a transaction: ${err.message}` });
  }
}


// get request on: http://localhost:8080/api/transaction
async function get_transaction(req, res) {
    let data=await model.Transactions.find({});

    return res.json(data)
}

// delete request on: http://localhost:8080/api/transaction
async function delete_transaction(req,res) {
    if(!req.body) res.status(400).json({message:"REquest body not found"});
    // await instead of callback
  const result = await model.Transactions.deleteOne(req.body)
    .then(() => res.json("Record Deleted!"))
    .catch((err) => res.status(400).json({ message: "Error while deleting transaction record", error: err.message }));
}

// get request on: http://localhost:8080/api/labels
async function get_labels(req, res) {
    model.Transactions.aggregate([
        {
            // this allow us to lookup specific field from different collections
            $lookup:{
                from:"categories",
                localField:'type',//specifies the field we want to join by the local connevtion
                foreignField:'type',//specifies the field we want to join by the foriegn connevtion
                as:"categories_info"//name of ouput array
            }
        },
        {
            $unwind:"$categories_info"
        }
    ]).then(result =>{
        let data =result.map(v=>Object.assign({},{_id:v._id,name:v.name,type:v.type,amount:v.amount,color:v.categories_info['color']}));
        res.json(data);
    }).catch(error=>{
        res.status(400).json("Lookup Collection Error");
    })

}


module.exports = {
  create_Categories,
  get_Categories,
  create_transation,
  get_transaction,
  delete_transaction,
  get_labels
};
