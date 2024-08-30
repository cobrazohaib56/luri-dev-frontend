import React, { useState } from "react"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"
import { Link, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"
// Formik validation
import * as Yup from "yup"
import { useFormik, ErrorMessage } from "formik"
// import images
import profile from "assets/images/WWJD-dark.png"
import axiosInstance from "service/axiosConfig"
import Loader from "components/Common/loader"

import { useDispatch } from "react-redux"
import { setSuperuserStatus } from "../../redux/slices/userSlice"

const Login = props => {
  const history = useNavigate()
  const dispatch = useDispatch()

  document.title = "Login | WWJD"

  const [errors, setErrors] = useState([])
  const [isLoading, SetIsLoading] = useState(false)

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      SetIsLoading(true)
      axiosInstance
        .post("/auth/login/", {
          username: values.email,
          password: values.password,
        })
        .then(res => {
          if (res.status === 200) {
            SetIsLoading(false)
            const userData = res.data.user
            // console.log("Response: ", res)
            localStorage.setItem("authUser", JSON.stringify(res.data))
            dispatch(setSuperuserStatus(userData.is_superuser))
            history("/home")
          }
        })
        .catch(error => {
          SetIsLoading(false)
          console.log(error, "this is the error")
          setErrors(error.response?.data?.errors)
          setTimeout(() => setErrors([]), 4000)
        })
    },
  })

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          {errors &&
            errors.map((error, index) => (
              <Alert key={index} color="danger">
                {error}
              </Alert>
            ))}
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card
                className="overflow-hidden"
                style={{ borderRadius: "10px" }}
              >
                <div className="bg-soft" style={{ backgroundColor: "#041D4D" }}>
                  <Row>
                    <div className="text-white p-4 d-flex flex-column align-items-center gap-0">
                      <h1 className="text-white display-5 fw-bold">
                        Welcome Back!
                      </h1>
                      <p>Sign-in to Continue to Compliner.</p> 
                    </div>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2">
                    {isLoading ? (
                      <Loader loaderColor={"text-dark"} />
                    ) : (
                      <Form
                        className="form-horizontal"
                        // style={{fontFamily: "GreycliffCF",}}
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        {/* {error ? <Alert color="danger">{error}</Alert> : null} */}

                        <div className="mb-3">
                          <Label className="form-label fw-bold text-black mt-4 ml-4 px-2">
                            Email
                          </Label>
                          <Input
                            name="email"
                            className="form-control border-0 bg-light"
                            style={{
                              borderRadius: "12px",
                              fontSize: "12px",
                              letterSpacing: "0.05em",
                              // fontFamily: "GreycliffCF",
                            }}
                            placeholder="Enter Email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
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
                        </div>

                        <div className="mb-3">
                          <Label className="form-label fw-bold text-black mt-2 px-2">
                            Password
                          </Label>
                          <Input
                            className="border-0 bg-light"
                            style={{
                              borderRadius: "12px",
                              fontSize: "12px",
                              letterSpacing: "0.05em",
                            }}
                            name="password"
                            value={validation.values.password || ""}
                            type="password"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
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
                        </div>

                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline"
                          />
                          <label
                            className="form-check-label fw-bold text-black"
                            htmlFor="customControlInline"
                          >
                            Remember Me
                          </label>
                        </div>
                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            style={{
                              borderRadius: "12px",
                              fontSize: "14px",
                              letterSpacing: "0.1em",
                              fontWeight: "700",
                            }}
                          >
                            Log In
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <Link
                            to="/forgot-password"
                            className="text-black fw-bold"
                          >
                            Forgot Your Password?
                          </Link>
                        </div>
                      </Form>
                    )}
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t Have An Account?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Sign Up Now{" "}
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

Login.propTypes = {}

export default withRouter(Login)
