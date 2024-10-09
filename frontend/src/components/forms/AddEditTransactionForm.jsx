import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

function AddEditTransactionForm(props) {
  const [form, setValues] = useState({
    id: 0,
    amount: "",	
    transaction_type: "",
    status: "",	
    account: "",   
    date: "",
  });
  const [transfer, setTrasfer] = useState(false)


  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });

    if(e.target.name === 'transaction_type') {
        if(e.target.value === "Transfer") {
            setTrasfer(true);
        } else {
            setTrasfer(false);
        }
    }
  };

  const submitFormAdd = (e) => {
    e.preventDefault();
    props.addItemToState(form);
    props.toggle();
  };

  const submitFormEdit = (e) => {
    e.preventDefault();
    props.updateState(form);
    props.toggle();
  };

  useEffect(() => {
    if (props.item) {
      const { id, amount, transaction_type, status, account, date } = props.item;
      setValues({ id, amount, transaction_type, status, account, date });
    }
  }, [props.item]);

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>

      <FormGroup>
        <Label for="account">Account</Label>
        <select id='account' name="account" className='form-control' onChange={onChange}>
            <option value='' >Select Account</option>
            {props.owners.map(account => (
                <option value={account.id} key={account.id} >{account.account_holder.first_name} {account.account_holder.last}</option>
            ))}
        </select>
        
      </FormGroup>

      <FormGroup>
        <Label for="transaction_type">Transaction Type:</Label>
        <select id='transaction_type' name="transaction_type" className='form-control' onChange={onChange}>
            <option value="">Select Type</option>
            <option value="Deposit">Deposit</option>
            <option value="Transfer">Transfer</option>
            <option value="Withdraw">Withdraw</option>
        </select>
      </FormGroup>

      {transfer && 
        <FormGroup>
            <Label for="receiver">Transfer Account</Label>
            <select id='receiver' name="receiver" className='form-control' onChange={onChange}>
                <option value='' >Select Transfer Account</option>
                {props.owners.map(account => (
                    <option value={account.id} key={account.id} >{account.account_holder.first_name} {account.account_holder.last}</option>
                ))}
            </select>
            
        </FormGroup>
      }

      <FormGroup>
        <Label for="amount">Amount:</Label>
        <Input
          type="text"
          name="amount"
          id="amount"
          onChange={onChange}
          value={form.amount === null ? "" : form.amount}
          placeholder="Enter Amount"
        />
      </FormGroup>

      
      
      <FormGroup>
        <Label for="status">Status:</Label>
        <select id='status' name="status" className='form-control' onChange={onChange}>
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Success">Success</option>
            <option value="Fail">Fail</option>
          
        </select>
      </FormGroup>

      <Button>Submit</Button>
    </Form>
  );
}

export default AddEditTransactionForm;
