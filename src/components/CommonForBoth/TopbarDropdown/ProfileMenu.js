import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";

import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";

// users
import user1 from "../../../assets/images/users/avatar.png";

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [firstName, setFirstName] = useState("Admin");
  const [initialFN, SetInitialFN] = useState("");

  useState(() => {
    const name = props.userData?.first_name;
    setFirstName(`Hi ${name}`);
    if (name && name.length > 0)
      SetInitialFN(name[0]);
  }, []);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item d-flex align-items-center"
          id="page-header-user-dropdown"
          tag="button"
        >
          {/* <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          /> */}
          <Badge color="success" className="rounded-circle header-profile-user d-flex align-items-center justify-content-center" style={{fontSize: 22}}>{initialFN}</Badge>
          <span className="d-none d-xl-inline-block ms-2 me-1 text-white">{firstName}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {/* <Link to="/profile" className="dropdown-item">
            <i className="bx bx-user font-size-16 align-middle me-1" />
            <span>Profile</span>
          </Link> */}
          {/* <div className="dropdown-divider" /> */}
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(ProfileMenu);
