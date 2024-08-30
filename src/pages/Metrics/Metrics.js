import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { map } from "lodash"
import { Button, Card, CardBody, Container, Table } from "reactstrap"
import Swal from "sweetalert2"

// Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css"

// Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import axiosInstance from "service/axiosConfig"

import logo from "../../assets/images/WWJD-dark.png"

const Metrics = () => {
  const [dailyActiveUsers, setDailyActiveUsers] = useState(0)
  const [monthlyActiveUsers, setMonthlyActiveUsers] = useState(0)
  const [userCount, SetUserCount] = useState()

  useEffect(() => {
    const fetchMetrics = async () => {
      axiosInstance
        .get("/api/active_users/")
        .then(response => {
          if (response.status === 200) {
            response = response.data
            setDailyActiveUsers(response.daily_active_users)
            setMonthlyActiveUsers(response.monthly_active_users)
            SetUserCount(response.user_count)
          }
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            text: error,
          })
        })
    }

    fetchMetrics()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        
        <Container>
          <h6>Total Users: {userCount}</h6>
          <Breadcrumbs title="WWJD" breadcrumbItem="Metrics" />
          <Card>
            <CardBody>
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Daily Active Users (DAU)</th>
                      <th>Monthly Active Users (MAU)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{dailyActiveUsers}</td>
                      <td>{monthlyActiveUsers}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Metrics
