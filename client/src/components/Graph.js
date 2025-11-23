import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "./Labels";
import{default as api} from '../store/apliSlice';
import { chart_Data,getTotal } from "../helper/helper";
import { motion } from "framer-motion";


Chart.register(ArcElement);


export default function Graph() {
  
    const {data,isFetching,isSuccess,isError}=api.useGetLabelsQuery()
    // after you have data from query
    useEffect(() => {
      // keep a global copy for ThemeManager / WeatherPopup to read
      window.__latestTransactions = data || [];
    }, [data]);
    
    const total = getTotal(data) || 0;
    const budget = Number(localStorage.getItem("budget")) || 0;

    


let weatherStatus = "sunny";
if (budget > 0) {
  if (total < budget * 0.8) weatherStatus = "sunny";
  else if (total <= budget) weatherStatus = "cloudy";
  else weatherStatus = "stormy";
}

      let graphData;
      if(isFetching){
          graphData=<div>Fetching</div>;
      }
      else if(isSuccess){
          graphData=<Doughnut {...chart_Data(data)}></Doughnut>
      }
      else if(isError){
          graphData=<div>Eror</div>
      }

  return (
  <div className="flex justify-content max-w-xs mx-auto relative">

    
    <div className="item">
      <div className="chart relative z-20">
        <motion.div
  animate={
    total > budget
      ? { y: [-8, 8, -8] }
      : { y: 0 }
  }
  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
>
  {graphData}
</motion.div>

        <h3 className="mb-4 font-bold title">Total
          <span className="block text-3xl text-emerald-400">
            £{total}
          </span>
        </h3>
      </div>

      <div className="flex flex-col py-10 gap-4 z-20 relative">
        <Labels />
      </div>
    </div>
  </div>
);

}




// thats fine i can the image in chart. i didnt like the idea of that changing the chart colour so i removed that from helper.js.

// THis is what it looks like currently. few changes:
// 1)current system asks the montly budget and then i have to press add tracsaction. Instead i would like to set a budget using button. so user enter the value and submit it. it will be placed below those expense investement and income labels.
// 2) rather than showing image inside the chart, the idea of cashcow was to actually like that clould or sun or storm image pops out of top middle gets enlarged and like stay there for 5 secs and disappear. it pops when user sets the budget and press submit.
// 3) also when user press submit for budget, it changes like the whole background theme. for example like if budget user has spent over budget the background changes to modern gradient of greyish colour and for close budget gradient of dark bluish to idicate its gonna turn dark grey soon. and for under budget its something like pleasant gradient  