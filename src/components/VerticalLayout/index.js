import PropTypes from "prop-types";
import React from "react";
import withRouter from "components/Common/withRouter";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = props => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header />
        <Sidebar
          isMobile={isMobile}
        />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );

};

export default withRouter(Layout);
