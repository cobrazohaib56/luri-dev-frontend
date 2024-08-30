import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

//Import Images
import error from "../../assets/images/WWJD-dark.png"

const Pages500 = () => {
   //meta title
   document.title = "500 Error Page | Complainer";

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-5" style={{backgroundColor: "#041D4D"}}>
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <h1 className="display-2 fw-medium text-white">
                  5<i className="bx bx-buoy bx-spin text-white display-3" />
                  0
                </h1>
                <h4 className="text-uppercase text-white">Internal Server Error</h4>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" xl="6">
              <div>
                <img src={error} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Pages500
