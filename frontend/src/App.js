// import Component from the react module
import React, { Component } from "react";
import Routing from "./Routes";


export default function App() {

  return (
    <main className="content">
        
         <div className="row">
           <div className="col-md-6 col-sm-10 mx-auto p-0">
             <div className="card p-3">
                 <h1 className="text text-uppercase text-center my-4">
                   Digital Wallates
                 </h1>
             </div>
           </div>
         </div>

         <Routing />

    </main>
  )
}




// class App extends Component {

//   constructor(props) {
//     super(props);
    
//     this.state = {
//       activeItem: {
//         owner: "",
//         balance: "",
//       },
//       accountList: [],
//     };

//   }

//   componentDidMount() {
//     this.refreshList(); 
//   }
 
//   refreshList = () => {
//     axios
//       .get("http://localhost:8000/api/accounts")
//       .then(res => this.setState({ accountList: res.data }))
//       .catch(err => console.log(err));
//   };

//   toggle = () => {
//     this.setState({ modal: !this.state.modal });
//   };

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

//   handleDelete = (item) => {
//       alert("delete" + JSON.stringify(item));
      
//     axios
//       .delete(`http://localhost:8000/api/accounts/${item.account_number}`)
//       .then((res) => this.refreshList());
//   };
 
//   createItem = () => {
//     const item = { owner: "", balance: ""};
//     this.setState({ activeItem: item, modal: !this.state.modal });
//   };

//   editItem = (item) => {
//     this.setState({ activeItem: item, modal: !this.state.modal });
//   };

//   render() {

//     const newItems = this.state.accountList
//     return (
//       <main className="content">
        
//         <div className="row">
//           <div className="col-md-6 col-sm-10 mx-auto p-0">
//             <div className="card p-3">
//                 <h1 className="text text-uppercase text-center my-4">
//                   Digital Wallates
//                 </h1>
//             </div>
//           </div>
//         </div>

        
        
//         <div className="row">
//           <div className="col-md-6 col-sm-10 mx-auto p-0">
//             <div className="card p-3">

//               <Routing />

//               <div className="float-right my-2">
//                 <button onClick={this.createItem} className="float-right btn btn-success">
//                   Create New
//                 </button>
//               </div>

//               <ul className="list-group list-group-flush">

//                 {newItems.map((item) => (
//                   <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
//                     <span className={`mr-2`}>{item.owner.first_name} {item.owner.last_name}</span>
//                     <span className={`mr-2`}>{item.account_number}</span>
//                     <span className={`mr-2`}>{item.balance}</span>
//                     <span>
//                       <button onClick={() => this.handleDelete(item)} className="btn btn-danger">
//                         Delete
//                       </button>
//                     </span>
//                   </li>
//                 ))}

//               </ul>
              
//             </div>
//           </div>
//         </div>
//         {this.state.modal ? (
//           <CustomModal activeItem={this.state.activeItem} 
//             toggle={this.toggle} 
//             onSave={this.handleSubmit} />
//         ) : null}




//       </main>
//     );
//   }
// }
// export default App;