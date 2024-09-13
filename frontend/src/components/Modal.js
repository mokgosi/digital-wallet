import React, { useEffect, useState, useRef, Component } from "react";

// importing all of these classes from reactstrap module
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Dropdown,  DropdownToggle,  DropdownMenu,  DropdownItem,} from "reactstrap";
import axios from 'axios';  

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
//                 <Input type="text" id='balance' name="balance" value={this.state.activeItem.balance} onChange={this.handleChange} placeholder="Enter Balance" />
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


const CustomModal = () => {

  const [userData, setUserData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsVisible(false);
      closeModal();
    }
  };

  useEffect(() => {
      const url = 'http://localhost:8000/api/'

      axios.get(url)
        .then(response => {
            setUserData(response.data);
            setSelectedUser(response.data[0])
        })
        .catch(err => {
          console.error('Error:', err);
        })

        if (isVisible) {
          document.addEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
  }, [isVisible]);

  const handleChange = (event) => {
    const selectedUserId = event.target.value;
    const selected = userData.find(user => user.id === parseInt(selectedUserId));
    selectedUser(selected);
  };

  return (

      <Modal isOpen={true}>
        <ModalHeader> New Wallet </ModalHeader>
        <ModalBody>
        
            <Form>
                <FormGroup>
                <Label for='title'>Owner</Label>
                <select id='owner' name="owner" className='form-control' onChange={handleChange}>
                  {userData.map(user => (
                      <option value={user.id} key={user.id}>{user.first_name} {user.last}</option>
                  ))}
                </select>
                </FormGroup>

                <FormGroup>
                <Label for='description'>Balance</Label>
                <Input type="text" id='balance' name="balance" placeholder="Enter Balance" />
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="success">
                Save
            </Button>
        </ModalFooter>
      </Modal>
  )
}

export default CustomModal