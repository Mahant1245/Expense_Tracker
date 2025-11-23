import React from "react";
import{useForm} from "react-hook-form";
import List from "./List";
import apiSlice, {default  as api} from '../store/apliSlice'
import BudgetInput from "./BudgetInput";


export default function Form(){

    const{register,handleSubmit,resetField}=useForm();
    const [addTransaction]=api.useAddTransactionMutation();

    const onSubmit = async (data) => {
        if (!data) return {};
        await addTransaction(data).unwrap();
        resetField("name");
        resetField("amount");
        window.dispatchEvent(new Event("transactionAdded"));
    };


    return(
        <div className="form max-w-sm mx-auto w-96">
            <h1 className="font-bold pb-4 text-xl">Transaction</h1>

            {/* design for form */}
            <BudgetInput onBudgetChange={(b) => localStorage.setItem("budget", b)} />
            <form id = "form" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="input-group">
                        <input type ="text" {...register("name")} placeholder="Salary,House Rent, SIP" className="form-input"></input>
                    </div>
                    <select className="form-input" {...register("type")}>
                        <option value="Investment" defaultValue>Investment</option>
                        <option value="Income" >Income</option>
                        <option value="Expense" >Expense</option>
                    </select>

                    <div className="input-group">
                        <input type ="text" {...register("amount")} placeholder="Amount" className="form-input"></input>
                    </div>
                    <div className="submit-btn">
                        <button className="border py-2 text-white bg-indigo-500 w-full">Add Transaction</button>
                    </div>

                </div>
            </form>

            <List></List>

        </div>
    )
}