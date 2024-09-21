import React from 'react'
import { Navbar } from '../components/Navbar.jsx'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import DataTable from "../components/tables/TransactionTable"
import ModalForm from '../components/Modal.jsx'

export const Transactions = () => {

    const [transactionsData, setTransactionsData] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [owners, setOwners] = useState([])

    useEffect(() => {
        fetchData()
        getOwners()
    }, [])

    const fetchData = async () => {
        await axios
            .get("http://localhost:8000/api/transactions")
            .then(response => { setTransactionsData(response.data) })
            .catch(err => console.log(err));
    }

    const toggle = () => setShowModal(!showModal)

    const getOwners = async () => {
        return await axios
            .get("http://localhost:8000/api/accounts")
            .then(res => setOwners(res.data))
            .catch(err => console.log(err));

    };

    const handleDelete = (item) => {
        axios
          .delete(`http://localhost:8000/api/transactions/${item.id}`)
          .then((res) => fetchData())
          .catch(err => console.log(err));
    };

    const addItemToState = (item) => {
        axios
          .post("http://localhost:8000/api/transactions", item)
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
        <div  className="wallets">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                        <div className="float-right my-2">
                            <Navbar />
                        </div>

                        <DataTable
                            items={transactionsData}
                            updateState={updateState}
                            deleteItemFromState={deleteItemFromState}
                        />

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                        <ModalForm buttonLabel="Add Item" addItemToState={addItemToState}  owners={owners}/>
                    </div>
                </div>
            </div>
        </div>
    )    
}