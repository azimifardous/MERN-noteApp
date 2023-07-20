import React, { Component } from "react";
import Sidebar from "./sideBar";
import SearchBar from "./searchBar";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <SearchBar />
        <Sidebar />
        {/* <Main/> */}
      </div>
    );
  }
}

export default Dashboard;
