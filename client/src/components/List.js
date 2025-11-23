import React from "react";
import "boxicons";
import{default as api} from '../store/apliSlice';



export default function List(){

    const {data,isFetching,isSuccess,isError}=api.useGetLabelsQuery()
    const [deleteTransaction]=api.useDeleteTransactionMutation()
    const [deleteAll] = api.useDeleteAllMutation();

    const handleDeleteAll = () => {
        if (window.confirm("Delete your entire history?")) {
            deleteAll();
        }
    };
    let Transactions;

    const handlerClick =(e)=>{
    if(!e.target.dataset.id)return 0;
    deleteTransaction({_id:e.target.dataset.id})
    }
    
    if(isFetching){
        Transactions=<div>Fetching</div>;
    }
    else if(isSuccess){
        Transactions=data.map((v,i)=><Transaction key={i} category={v} handler={handlerClick}></Transaction>)
    }
    else if(isError){
        Transactions=<div>Eror</div>
    }
    


    return(
        <div className="flex flex-col py-6 gap-3">
            <h1 className="py-4 font-bold text-xl">History</h1>
            <button onClick={handleDeleteAll} className="px-4 py-2 bg-red-500 text-white rounded-md"> Delete All </button>
            {Transactions}
            
        </div>
    )
}

function Transaction({category,handler}) {
    if(!category) return null;
    return(
        <div className=" item flex justify-center bg-gray-50 py-2 rounded-r" style={{ borderRight: `8px solid ${category.color ?? "#d6c2c2ff"}` }} >
            {/* installed boxicons lib */}
            <button className="px-3" onClick={handler}><box-icon data-id={category._id?? ''} color={category.color??"#f80606ff"} size="20px" name="trash"></box-icon></button>
            <span className="block w-full">{category.name ?? ""}</span>
        </div>
    )
}
