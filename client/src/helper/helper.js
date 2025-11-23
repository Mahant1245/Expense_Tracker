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

export function chart_Data(transaction, custom) {
    let dataValue = getSum(transaction);
    let bg = _.uniq(_.map(transaction, (a) => a.color));

    const config = {
        data: {
            labels: transaction.map((a) => a.type),
            datasets: [
                {
                    data: dataValue,
                    backgroundColor: bg,
                    hoverOffset: 4,
                    borderRadius: 10,
                    spacing: 10
                }
            ]
        },
        options: {
            cutout: 95,
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (context) {
                            const label = context.label || "";
                            const value = context.raw || 0;
                            return `${label}: £${value}`;
                        }
                    }
                }
            }
        }
    };

    return custom ?? config;
}


export function getTotal(transaction){
    return _.sum(getSum(transaction));
}