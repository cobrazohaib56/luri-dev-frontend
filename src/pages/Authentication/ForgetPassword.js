import PropTypes from "prop-types"
import React from "react"
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap"
//redux
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"
// import images
import profile from "../../assets/images/WWJD-dark.png"
import logo from "../../assets/images/WWJD-light.png"

const ForgetPasswordPage = props => {
  //meta title
  document.title = "Forget Password | WWJD"
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: values => {},
  })

  // const forgetError = state.ForgetPassword.forgetError;
  // const forgetSuccessMsg = state.ForgetPassword.forgetSuccessMsg;

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div style={{ backgroundColor: "#041D4D" }}>
                  <Row>
                    <Col xs={7}>
                      <div className="text-white p-4">
                        <p>Enter your email below.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="50"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label fw-bold text-black mt-2 ml-4 px-2">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control border-0 bg-light"
                          placeholder="Enter Email"
                          style={{
                            borderRadius: "12px",
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                          }}
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                            style={{
                              borderRadius: "12px",
                              fontSize: "12px",
                              letterSpacing: "0.1em",
                              fontWeight: "700",
                            }}
                          >
                            Reset
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go Back To{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    Login
                  </Link>{" "}
                </p>
                <p>© {new Date().getFullYear()} Complainer.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ForgetPasswordPage.propTypes = {}

export default withRouter(ForgetPasswordPage)
