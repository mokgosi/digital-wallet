import React from 'react'
import { Navbar } from '../components/Navbar'
import { useState, useRef, useEffect } from 'react'
import CustomModal from '../components/Modal'
import axios from 'axios'

export const Transactions = () => {

    const [transactionsData, setTransactionsData] = useState([])
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await axios
            .get("http://localhost:8000/api/transactions")
            .then(response => { setTransactionsData(response.data) })
            .catch(err => console.log(err));
    }

    const handleDelete = (item) => {
        axios
          .delete(`http://localhost:8000/api/transactions/${item.id}`)
          .then((res) => fetchData())
          .catch(err => console.log(err));
    };

    return (
        <div  className="wallets">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                        <div className="float-right my-2">
                            <button onClick={() => setShowModal(!showModal)} className="float-right btn btn-success">
                            Create New
                            </button>
                            <Navbar />
                        </div>
                        <ul className="list-group list-group-flush">
                            {transactionsData.map((item,key) => (
                            <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                                <span className={`mr-2`}>{item.account.account_number}</span>
                                <span className={`mr-2`}>{item.transactions_type}</span>
                                <span className={`mr-2`}>{item.amount}</span>
                                <span className={`mr-2`}>{item.date}</span>
                                <span>
                                <button onClick={() => handleDelete(item)} className="btn btn-danger">
                                    Delete
                                </button>
                                </span>
                            </li>
                            ))}
                        </ul>
                        
                    </div>
                </div>
                {showModal ? (
                    <CustomModal isVisible={showModal} toggleModal={() => setShowModal(false)}/>
                ) : null}
            </div>
        </div>
    )    
}