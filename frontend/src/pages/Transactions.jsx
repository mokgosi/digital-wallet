import React from 'react'
import { Navbar } from '../components/Navbar.jsx'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import DataTable from "../components/tables/TransactionTable"
import ModalForm from '../components/Modal.jsx'
import useAxios from '../utils/useAxios';


export const Transactions = () => {

    const [transactionsData, setTransactionsData] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [owners, setOwners] = useState([])
    const api = useAxios();

    useEffect(() => {
        fetchData()
        getOwners()
    }, [])

    const fetchData = async () => {
        api.get("/transactions")
            .then(response => { setTransactionsData(response.data) })
            .catch(err => console.log(err));
    }

    const toggle = () => setShowModal(!showModal)

    const getOwners = async () => {
        return api.get("/accounts")
            .then(res => setOwners(res.data))
            .catch(err => console.log(err));

    };

    const handleDelete = (item) => {
        api.delete(`/transactions/${item.id}`)
          .then((res) => fetchData())
          .catch(err => console.log(err));
    };

    const addItemToState = (item) => {
        api.post("/transactions", item)
          .then((response) => setTransactionsData([...transactionsData, item]))
          .catch(err => console.log(err));
    };

    const updateState = (item) => {
        const itemIndex = transactionsData.findIndex((data) => data.id === item.id);
        const newArray = [
          ...transactionsData.slice(0, itemIndex),
          item,
          ...transactionsData.slice(itemIndex + 1)
        ];
        setTransactionsData(newArray);
    };

    const deleteItemFromState = (id) => {
        const updatedItems = transactionsData.filter((item) => item.id !== id);
        setTransactionsData(updatedItems);
      };  

    return (
        <div  className="transactions">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                        <div className="float-right my-2">
                            <Navbar />
                            <ModalForm buttonLabel="Transact" addItemToState={addItemToState}  owners={owners}/>
                        </div>

                        <DataTable
                            items={transactionsData}
                            updateState={updateState}
                            deleteItemFromState={deleteItemFromState} />

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                        
                    </div>
                </div>
            </div>
        </div>
    )    
}