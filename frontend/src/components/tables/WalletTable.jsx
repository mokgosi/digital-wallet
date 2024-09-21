import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modal';
import { Link } from 'react-router-dom'
import axios from 'axios';

function DataTable(props){

  const deleteItem = account_number => {
    let confirmDelete = window.confirm('Are sure you want to delete account?')
    
    if(confirmDelete) {
           axios
            .delete(`http://localhost:8000/api/accounts/${account_number}`)
            .then(item => {
              props.deleteItemFromState(account_number)
            })
            .catch(err => console.log(err));

          //   fetch('http://localhost:3000/crud', {
          //   method: 'delete',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   body: JSON.stringify({
          //     id
          //   })
          // })
          //   .then(response => response.json())
          //   .then(item => {
          //     props.deleteItemFromState(id)
          //   })
          //   .catch(err => console.log(err))
    }
  }

  const items = props.items.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.account_holder.first_name} {item.account_holder.last_name}</td>
        <td><Link to={`/accounts/${item.account_number}`}>{item.account_number}</Link></td>
        <td>{item.balance}</td>
        {/* <td>
          <div style={{width:"110px"}}>
            <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState}/>
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.account_number)}>Delete</Button>
          </div>
        </td> */}
      </tr>
      )
    })

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Owner</th>
          <th>Account</th>
          <th>Balance</th>
          {/* <th>Actions</th> */}
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default DataTable