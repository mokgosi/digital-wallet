// import React, { useEffect, useState, useRef, Component } from "react";

// // importing all of these classes from reactstrap module
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label} from "reactstrap";
// import axios from 'axios';  

// class CustomModal extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       activeItem: this.props.activeItem,
//       accountList: []
//     };
//   }

//   handleChange = e => {
//     let { name, value } = e.target;
//     const activeItem = { ...this.state.activeItem, [name]: value };
//     this.setState({ activeItem });
//   };

//   componentDidMount() {
//     this.refreshList(); 
//   }

//   refreshList = () => {
//     axios   //Axios to send and receive HTTP requests
//       .get("http://localhost:8000/api/")
//       .then(res => this.setState({ accountList: res.data }))
//       .catch(err => console.log(err));
//   };
  
//   render() {
//     const { toggle, onSave } = this.props;
//     const accountList = this.state.accountList

//     return (
//       <Modal isOpen={true} toggle={toggle}>
//         <ModalHeader toggle={toggle}> New Wallet </ModalHeader>
//         <ModalBody>
//             <Form>
//                 <FormGroup>
//                 <Label for='owner'>Owner</Label>
//                 <select id='owner' name="owner" className='form-control' onChange={this.handleChange}>
//                   {accountList.map(user => (
//                        <option value={user.id} key={user.id} >{user.first_name} {user.last}</option>
//                    ))}
//                 </select>
//                 </FormGroup>

//                 <FormGroup>
//                 <Label for='balance'>Balance</Label>
//                 <Input type="text" id='balance' name="balance" onChange={this.handleChange} placeholder="Enter Balance" />
//                 </FormGroup>

//             </Form>
//         </ModalBody>
//         <ModalFooter>
//             <Button color="success" onClick={() => onSave(this.state.activeItem)}>
//                 Save
//             </Button>
//         </ModalFooter>
//       </Modal>
//     );
//   }
// }
// export default CustomModal





import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddEditForm from "./forms/AddEditWalletForm.jsx";
import AddEditTransactionForm from "./forms/AddEditTransactionForm.jsx";

function ModalForm(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );
  const label = props.buttonLabel;

  let button = "";
  let title = "";

  if (label === "Edit") {
    button = (
      <Button color="warning" onClick={toggle} style={{ float: "left", marginRight: "10px" }}>
        {label}
      </Button>
    );
    title = "Edit Wallet";
  } else {
    button = (
      <Button color="success" onClick={toggle} style={{ float: "left", marginRight: "10px" }}>
        {label}
      </Button>
    );
    title = "Add New Wallet";
  }

  return (
    <div>
      {button}
      <Modal isOpen={modal} toggle={toggle} className={props.className} backdrop={"static"} keyboard={false}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          {title}
        </ModalHeader>
        <ModalBody>
          {/* <AddEditForm addItemToState={props.addItemToState} updateState={props.updateState} toggle={toggle} item={props.item} owners={props.owners}/> */}
          <AddEditTransactionForm addItemToState={props.addItemToState} updateState={props.updateState} toggle={toggle} item={props.item} owners={props.owners}/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalForm;



