import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DataTable from "../components/tables/AccountTable"

import { Navbar } from '../components/Navbar.jsx'
import useAxios from '../utils/useAxios';

export const Account = () => {
    const [accountData, setAccountData] = useState([]);
    const { account_number } = useParams();
    const api = useAxios();
    
    useEffect(() => {
        fetchData() 
    }, [])

    const fetchData = async () => {
        try {
            api.get(`/accounts/${account_number}`).then(response => { setAccountData(response.data) })
        } catch (error) {
            console.log(error)
        }
    }

    const updateState = (item) => {
        const itemIndex = accountData.findIndex((data) => data.id === item.id);
        const newArray = [
          ...accountData.slice(0, itemIndex),
          item,
          ...accountData.slice(itemIndex + 1)
        ];
        setAccountData(newArray);
    };

    return (
        <div  className="account">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                        <div className="float-right my-2">
                            <Navbar />
                        </div>
                         <DataTable
                            items={accountData}
                            updateState={updateState}
                        /> 
                    </div>
                </div>
            </div>
        </div>
    )
}