import React from "react";
import{default as api} from '../store/apliSlice';
import { getLabels } from "../helper/helper";



export default function Labels(){

    const {data,isFetching,isSuccess,isError}=api.useGetLabelsQuery()
    let Transactions;


    if(isFetching){
        Transactions=<div>Fetching</div>;
    }
    else if(isSuccess){
        console.log()    
        Transactions=getLabels(data,'type').map((v,i)=><LabelComponent key={i} data={v}></LabelComponent>)
    }
    else if(isError){
        Transactions=<div>Eror</div>
    }

    return(
        // this will map an object with data component
        <>{Transactions}</>
    );
}



function LabelComponent({data}){
            const isDarkTheme = document.body.classList.contains("theme-storm");
    // checks wheter the data is empty otherwise gets the data
    if(!data) return<></>;
    return(

        
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded py-3" style={{background:data.color ?? "#f9c74f"}}></div>
            <h3 className="text-md">{data.type ??""}</h3>
            </div>
            <h3 className={`font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>
            {Math.round(data.percent)}%
            </h3>

        </div>
    )
    
}