import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import GSTNavbar from "./components/navbar";
import GSTList from "./components/gst_list";
import CreateCounter from "./components/create_counter";
import EditCounter from "./components/edit_counter";

// We implement the React.HTMLAttributes<HTMLDivElement> interface so we can give
// our divs className properties
export default class App extends Component<React.HTMLAttributes<HTMLDivElement>> {

  render() {
    return (
      <Router>
        <div className="container">
          <GSTNavbar />
          <br />
          <div>
            <strong>
              View source code <a href="https://github.com/RYLiang18/the_gst">here<span role="img" aria-label="react">⚛️</span></a>
            </strong>
          </div>
          <br />
          <Route path="/the_gst" exact component={GSTList} />
          <Route path="/the_gst/create" component={CreateCounter} />
          <Route path="/the_gst/edit/:id" component={EditCounter} />
        </div>
      </Router>
    )
  }
}
