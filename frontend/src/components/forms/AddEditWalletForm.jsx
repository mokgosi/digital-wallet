import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

function AddEditWalletForm(props) {
  const [form, setValues] = useState({
    id: 0,
    balance: "",
    account_holder: ""
  });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const submitFormAdd = (e) => {
    console.log(props.item);
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
      const { id, balance, account_holder } = props.item;
      setValues({ id, balance, account_holder });
    }
  }, [props.item]);

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="balance">Balance</Label>
        <Input
          type="text"
          name="balance"
          id="balance"
          onChange={onChange}
          value={form.balance === null ? "" : form.balance}
          placeholder="Deposit Starting Balance"
        />
      </FormGroup>
      
      <FormGroup>
        <Label for="account_holder">Account Holder</Label>
        <select id='account_holder' name="account_holder" className='form-control' onChange={onChange}>
          {props.owners.map(user => (
                <option value={user.id} key={user.id} >{user.first_name} {user.last}</option>
          ))}
        </select>
        
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default AddEditWalletForm;
