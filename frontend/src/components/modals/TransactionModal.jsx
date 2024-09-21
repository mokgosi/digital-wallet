
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddEditTransactionForm from "../forms/AddEditTransactionForm.jsx";

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
          <AddEditTransactionForm addItemToState={props.addItemToState} updateState={props.updateState} toggle={toggle} item={props.item} owners={props.owners}/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalForm;



