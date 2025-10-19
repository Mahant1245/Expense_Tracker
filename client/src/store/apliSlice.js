import{createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const baseURI='http://localhost:8080';
export const apiSlice=createApi({
    baseQuery:fetchBaseQuery({baseUrl:baseURI}),
    endpoints:builder=>({
        // use query to get details

        // get categories
        getCategories:builder.query({
            //get:'http://localhost:8080/api/categories'
            query:()=>'/api/categories',
            // fetch the query and update ui
            providesTags:['categories']
        }),

        // get labels
        getLabels:builder.query({
            //get:'http://localhost:8080/api/labels'
            query:()=>'/api/labels',
            // fetch the query and update ui
            providesTags:['transaction']
        }),
        
        // get transaction 
        // here we will use mutation to add update or delete transaction
        addTransaction:builder.mutation({
            //post:'http://localhost:8080/api/transaction'
            query:(initialTransaction)=>({
                url:'/api/transaction',
                method:"POST",
                body:initialTransaction
            }),
            invalidatesTags:['transaction']
        }),

        // delete record
        deleteTransaction:builder.mutation({
            //delete:'http://localhost:8080/api/transaction'
            query:recordId=>({
                url:'/api/transaction',
                method:"DELETE",
                body:recordId
            }),
            invalidatesTags:['transaction']
        })
    })
})

export default apiSlice;
