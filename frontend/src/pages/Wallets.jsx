import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CustomModal from '../components/Modal'
import { Navbar } from '../components/Navbar.jsx'
import { Link } from 'react-router-dom'

import ModalForm from '../components/Modal.jsx'
import DataTable from "../components/tables/WalletTable"
import useAxios from '../utils/useAxios';

export const Wallets = () => {

    const [walletsData, setWalletsData] = useState([{
        id: 0,
        balance: "",
        account_holder: ""}
    ])
    const [showModal, setShowModal] = useState(false);
    const [owners, setOwners] = useState([])
    const [activeItem, setActiveItem] = useState(null)

    const api = useAxios();


    useEffect(() => {
        fetchData()
        getOwners()
    }, [])

    const fetchData = async () => {
        try {
            api.get(`/accounts`).then(response =>  setWalletsData(response.data))
        } catch (error) {
            console.log(error)
        }
    }
    
    const toggle = () => setShowModal(!showModal)
    
    // const  handleSubmit = (item) => {
    //     toggle();
    
    //     axios
    //       .post("http://localhost:8000/api/accounts", item)
    //       .then((response) =>  setWalletsData(response.data))
    //       .catch(err => console.log(err));
    // };
    
    // const handleDelete = (item) => {
    //     axios
    //         .delete(`http://localhost:8000/api/accounts/${item.account_number}`)
    //         .then(() => fetchData())
    //         .catch(err => console.log(err));
    // };

    //update this on the api side
    const getOwners = async () => {
        return api.get("http://localhost:8000/api/")
            .then(res => setOwners(res.data))
            .catch(err => console.log(err));

    };

    const addItemToState = (item) => {

        api.post("http://localhost:8000/api/accounts", item)
          .then((response) =>  setWalletsData([...walletsData, item]))
          .catch(err => console.log(err));

    };
     
    const updateState = (item) => {
        const itemIndex = walletsData.findIndex((data) => data.id === item.id);
        const newArray = [
          ...walletsData.slice(0, itemIndex),
          item,
          ...walletsData.slice(itemIndex + 1)
        ];
        setWalletsData(newArray);
    };

    const deleteItemFromState = (id) => {
        const updatedItems = walletsData.filter((item) => item.account_number !== id);
        setWalletsData(updatedItems);
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
                            items={walletsData}
                            updateState={updateState}
                            deleteItemFromState={deleteItemFromState}
                        />
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                        <ModalForm buttonLabel="Add Item" addItemToState={addItemToState} owners={owners}/>
                    </div>
                </div>
            </div>
        </div>
                    
    )    
}