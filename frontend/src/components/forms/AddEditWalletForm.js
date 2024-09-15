import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

function AddEditForm(props) {
  const [form, setValues] = useState({
    id: 0,
    balance: "",
    owner: ""
  });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  console.log(props);

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
      const { id, first, last, email, phone, location, hobby } = props.item;
      setValues({ id, first, last, email, phone, location, hobby });
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
        <Label for="owner">Account Holder</Label>
        {/* <select id='owner' name="owner" className='form-control' onChange={this.handleChange}>
          {props.owners.map(user => (
                <option value={user.id} key={user.id} >{user.first_name} {user.last}</option>
          ))}
        </select> */}
        
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default AddEditForm;
