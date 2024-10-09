import React from 'react'
import { Table } from 'reactstrap';
import moment from 'moment';

function DataTable(props) {
    
    const items = props?.items?.transactions?.map(item => {
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
            <th>Account #</th>
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