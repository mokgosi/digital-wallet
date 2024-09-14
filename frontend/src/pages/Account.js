import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { Navbar } from '../components/Navbar'

export const Account = () => {
    const [accountData, setAccountData] = useState([]);
    const { account_number } = useParams();
    
    useEffect(() => {
        fetchData() 
        console.log(accountData)
    }, [])

    const fetchData = async () => {
        await axios
            .get(`http://localhost:8000/api/accounts/${account_number}`)
            .then(response => { setAccountData(response.data) })
            .catch(err => console.log(err)); 

    }

    return (
        <div  className="account">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                        <div className="float-right my-2">
                            <Navbar />
                            <span>{`Account Number: ${account_number}`}</span>
                            <span>{`  --   Balance: ${accountData.balance}`}</span>
                        </div>
                        <ul className="list-group list-group-flush">
                            {/* Uncaught TypeError: Cannot read property 'transactions' of undefined */}
                            {accountData?.transactions?.map((item, key) => (
                            <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                                <span className={`mr-2`}>{item.account}</span>
                                <span className={`mr-2`}>{item.transaction_type}</span>
                                <span className={`mr-2`}>{item.amount}</span>
                                <span className={`mr-2`}>{item.date}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}