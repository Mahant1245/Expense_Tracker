import React from "react";
import "boxicons";

const obj=[
    {
    name:"Savings",
    color: "#f9c74f",
    
},
{
    name:"Investment",
    color: "rgba(37, 82, 179, 1)",
    
},
{
    name:"Expense",
    color: "rgb(255, 99, 132)",
    
}]

export default function List(){
    return(
        <div className="flex flex-col py-6 gap-3">
            <h1 className="py-4 font-bold text-xl">History</h1>
            {obj.map((v,i)=><Transaction key={i} category={v}></Transaction>)}
            
        </div>
    )
}

function Transaction({category}) {
    if(!category) return null;
    return(
        <div className=" item flex justify-center bg-gray-50 py-2 rounded-r" style={{ borderRight: `8px solid ${category.color ?? "#d6c2c2ff"}` }} >
            {/* installed boxicons lib */}
            <button className="px-3"><box-icon color={category.color??"#f80606ff"} size="20px" name="trash"></box-icon></button>
            <span className="block w-full">{category.name ?? ""}</span>
        </div>
    )
}
