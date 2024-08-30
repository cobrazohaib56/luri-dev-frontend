import React from "react";
import SidebarContent from "./SidebarContent";
import { Link } from "react-router-dom";
import logo from "../../assets/images/WWJD-light.png";
import logoDark from "../../assets/images/WWJD-light.png";

const Sidebar = props => {

  return (
    <React.Fragment>
      <div className="vertical-menu" style={{position: "fixed"}}>
        
        <div data-simplebar className="h-100">
          <SidebarContent />
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
