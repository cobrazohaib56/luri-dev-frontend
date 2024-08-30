import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
  InputGroup,
} from "reactstrap"
// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"
import { Link, useNavigate, useParams } from "react-router-dom"
// import images
import profileImg from "../../assets/images/WWJD-dark.png"
import axiosInstance from "service/axiosConfig"
import Loader from "components/Common/loader"
import { useDispatch } from "react-redux"
import { setSuperuserStatus } from "../../redux/slices/userSlice"

const Register = props => {
  const dispatch = useDispatch()

  //meta title
  document.title = "Register | WWJD"
  const { uuid } = useParams()
  const [response, setResponse] = useState({})
  const [isLoading, SetIsLoading] = useState(false)
  const history = useNavigate()
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required("Please Enter Your Full Name"),
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      SetIsLoading(true)
      const payload = {
        email: values.email,
        first_name: values.full_name.split(" ")[0],
        last_name: values.full_name.split(" ").slice(1).join(" "),
        phone: values.phone,
        company: values.company,
        password: values.password,
      }
      if (uuid) {
        payload.referral_uuid = uuid
      }
      axiosInstance
        .post("/auth/register/", payload)
        .then(res => {
          SetIsLoading(false)
          const userData = res.data.user
          localStorage.setItem("authUser", JSON.stringify(res.data))
          dispatch(setSuperuserStatus(userData.is_superuser))
          
          if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", "CompleteRegistration")
          }
          
          history("/home")
        })
        .catch(error => {
          SetIsLoading(false)
          setResponse({ errors: error.response.data.errors })
          setTimeout(() => setResponse({}), 4000)
        })
    },
  })

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          {response && (
            <>
              {response.errors?.map((error, index) => (
                <Alert key={index} color="danger">
                  {error}
                </Alert>
              ))}
              {response.success?.map((success, index) => (
                <Alert key={index} color="success">
                  {success}
                </Alert>
              ))}
            </>
          )}
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card
                className="overflow-hidden"
                style={{ borderRadius: "10px" }}
              >
                <div className="bg-soft" style={{ backgroundColor: "#041D4D" }}>
                  <Row>
                    <Col className="col-7">
                      <div className="text-white p-4">
                        <h5 className="text-white">Free Register</h5>
                        <p>Get Your Free Complainer Account</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2">
                    {!isLoading ? (
                      <Form
                        className="form-horizontal"
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <div className="mb-3">
                          <Label className="form-label fw-bold text-black mt-4 ml-4 px-2">
                            Full Name
                          </Label>
                          <InputGroup>
                            {/* <div className="input-group-text">
                              <i className="fas fa-user"></i>
                            </div>   */}
                            <Input
                              name="full_name"
                              type="text"
                              className="form-control border-0 bg-light"
                              style={{
                                borderRadius: "12px",
                                fontSize: "12px",
                                letterSpacing: "0.05em",
                              }}
                              placeholder="Enter Full Name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.full_name || ""}
                              invalid={
                                validation.touched.full_name &&
                                validation.errors.full_name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.full_name &&
                            validation.errors.full_name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.full_name}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                        </div>
                        <div className="mb-3">
                          <Label className="form-label fw-bold text-black mt-2 ml-4 px-2">
                            Email
                          </Label>
                          <InputGroup>
                            {/* <div className="input-group-text">
                              <i className="fas fa-envelope"></i>
                            </div>  */}
                            <Input
                              id="email"
                              name="email"
                              className="form-control border-0 bg-light"
                              style={{
                                borderRadius: "12px",
                                fontSize: "12px",
                                letterSpacing: "0.05em",
                              }}
                              placeholder="Enter Email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values?.email || ""}
                              invalid={
                                validation.touched?.email &&
                                validation.errors?.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                        </div>

                        <div className="mb-3">
                          <Label className="form-label fw-bold text-black mt-2 ml-4 px-2">
                            Phone
                          </Label>
                          <InputGroup>
                            {/* <div className="input-group-text">
                              <i className="fas fa-phone-alt"></i>
                            </div>  */}
                            <Input
                              id="phone"
                              name="phone"
                              className="form-control border-0 bg-light"
                              style={{
                                borderRadius: "12px",
                                fontSize: "12px",
                                letterSpacing: "0.05em",
                              }}
                              placeholder="Enter Phone Number"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.phone || ""}
                              invalid={
                                validation.touched.phone &&
                                validation.errors.phone
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.phone &&
                            validation.errors.phone ? (
                              <FormFeedback type="invalid">
                                {validation.errors.phone}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                        </div>

                        <div className="mb-3">
                          <Label className="form-label fw-bold text-black mt-2 ml-4 px-2">
                            Password
                          </Label>
                          <InputGroup>
                            {/* <div className="input-group-text">
                              <i className="fas fa-lock"></i>
                            </div> */}
                            <Input
                              name="password"
                              type="password"
                              className="form-control border-0 bg-light"
                              style={{
                                borderRadius: "12px",
                                fontSize: "12px",
                                letterSpacing: "0.05em",
                              }}
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                        </div>

                        <div
                          className="mt-4"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            className="btn btn-primary btn-block "
                            type="submit"
                            style={{
                              borderRadius: "12px",
                              fontSize: "12px",
                              letterSpacing: "0.1em",
                              fontWeight: "700",
                            }}
                          >
                            Register
                          </button>
                        </div>
                      </Form>
                    ) : (
                      <Loader loaderColor={"text-dark"} />
                    )}
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already Have An Account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>© {new Date().getFullYear()} Complainer TM.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Register
