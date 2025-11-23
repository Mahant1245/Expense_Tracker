import _ from 'lodash';

export function getSum(transaction,type){
    let sum =_(transaction)
            .groupBy('type')
            .map((objs,key)=>{
                if(!type)return _.sumBy(objs,'amount');//300,500,660....
                return{
                    'type':key,
                    'color':objs[0].color,
                    'total':_.sumBy(objs,'amount')
                }
            })
            .value()
    return sum;
}

export function getLabels(transaction){
    let amountSum=getSum(transaction,'type')
    let Total=_.sum(getSum(transaction));


    let percent=_(amountSum)
                .map(objs=>_.assign(objs,{percent:(100*objs.total)/Total}))
                .value()


    return percent;
}

export function chart_Data(transaction,custom){

    let dataValue=getSum(transaction)
    let bg=_.map(transaction,a=>a.color)
    bg=_.uniq(bg)//only passes unique color. this is inbuilt function of lodash
    const config ={
    data:{
        datasets: [
    {
      data:dataValue,
      backgroundColor: bg,
      hoverOffset: 4,
      borderRadius: 10,
      spacing: 10
    }]
    },
    options:{
        cutout:95
    }
}



// if user wants to use custom colors they can otherwise it will use config
return custom??config

}

export function getTotal(transaction){
    return _.sum(getSum(transaction));
}