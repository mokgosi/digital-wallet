import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modal';
import { Link } from 'react-router-dom'
import moment from 'moment';

function DataTable(props) {

  const deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete) {
        fetch('http://localhost:3000/crud', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
      .then(response => response.json())
      .then(item => {
        props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }
  }

  const items = props.items.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.account}</td>
        <td>{item.transaction_type}</td>
        <td>{item.amount}</td>
        <td>{moment(item.date).format('Do-MM-YYYY')}</td>
        <td>{moment(item.date).format('h:mm:ss a')}</td>
      </tr>
    )
  })

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Account</th>
          <th>Transaction Type</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default DataTable