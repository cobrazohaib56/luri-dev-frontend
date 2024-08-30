import React from "react"
import { Navigate } from "react-router-dom"

// Pages Component

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

import Pages500 from "pages/Utility/pages-500"
import Pages404 from "pages/Utility/pages-404"
import Chat from "pages/Chat/Chat"
import Feedback from "pages/feedback/Feedback"
import Metrics from "pages/Metrics/Metrics"

import ProtectedRoute from "./ProtectedRoute"

const authProtectedRoutes = [
  { path: "/home", component: <Chat /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/home" />,
  },
  {
    path: "/feedback",
    component: (
      <ProtectedRoute>
        <Feedback />
      </ProtectedRoute>
    ),
  },
  {
    path: "/metrics",
    component: (
      <ProtectedRoute>
        <Metrics />
      </ProtectedRoute>
    ),
  },
]

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/register/:uuid", component: <Register /> },
  { path: "/page404", component: <Pages404 /> },
  { path: "/page500", component: <Pages500 /> },
]

export { authProtectedRoutes, publicRoutes }
