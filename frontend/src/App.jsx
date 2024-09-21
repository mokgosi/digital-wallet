// import Component from the react module
import React, { Component } from "react";
import Routing from "./Routes.jsx";


export default function App() {

  return (
    <div className="root">
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
    </div>
  )
}

