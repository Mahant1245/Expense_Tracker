const mongoose =require('mongoose');

const Schema = mongoose.Schema;

// categories => fiels => [type,color]
const categories_model=new Schema({
    type:{type: String, default:"Investment"},
    color:{type: String, default: '#FCBE44'}
})


// transactions => field => [name,type,amount,date] here date is optional
const transactions_model=new Schema({
    name:{type: String, default:"Anonymous"},
    type:{type: String, default:"Investment"},
    amount:{type: Number},
    date:{type: Date, default: Date.now}
})

const Categories=mongoose.model('categories',categories_model)
const Transactions=mongoose.model('transaction',transactions_model);

exports.default=Transactions;
module.exports={Categories,Transactions}

