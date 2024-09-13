import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CustomModal from '../components/Modal'
import { Navbar } from '../components/Navbar'

export const Wallets = () => {

    const [walletsData, setWalletsData] = useState([])
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await axios
            .get("http://localhost:8000/api/accounts")
            .then(response => { setWalletsData(response.data) })
            .catch(err => console.log(err));
    }

    
    
    const toggle = () => {
        setShowModal(!showModal)
    };
    
    //   handleSubmit = (item) => {
    //     this.toggle();
    //     const id = item.id ? item.id : item.uuid; 
    
    //     if (id) {
    //       axios
    //         .put(`http://localhost:8000/api/accounts/${item.id}/`, item)
    //         .then((res) => this.refreshList());
    //       return;
    //     }
    //     axios
    //       .post("http://localhost:8000/api/accounts", item)
    //       .then((res) => this.refreshList());
    //   };
    
      const handleDelete = (item) => {
        axios
          .delete(`http://localhost:8000/api/accounts/${item.account_number}`)
          .then((res) => fetchData())
          .catch(err => console.log(err));
      };
     
      const createItem = () => {
        const item = { owner: "", balance: ""};
        // this.setState({ activeItem: item, modal: !this.state.modal });
      };
    
    //   editItem = (item) => {
    //     this.setState({ activeItem: item, modal: !this.state.modal });
    //   };
    




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
                            {walletsData.map((item,key) => (
                            <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                                <span className={`mr-2`}>{item.account_holder.first_name} {item.account_holder.last_name}</span>
                                <span className={`mr-2`}><a href=''>{item.account_number}</a></span>
                                <span className={`mr-2`}>{item.balance}</span>
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