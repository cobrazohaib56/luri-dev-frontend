import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import {
  Button,
  Card,
  CardBody,
  Container,
  Table,
} from "reactstrap";

// Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import axiosInstance from "service/axiosConfig";
import Swal from "sweetalert2"
import logo from "../../assets/images/WWJD-dark.png"

const Feedback = () => {
    // Meta title
    document.title = "Feedbacks | Complainer";

    const [feedbacks, SetFeedbacks] = useState([]);
    const [userCount, SetUserCount] = useState();

    useEffect(() => {
        GetAllFeedbacks();
    }, []);

    async function GetAllFeedbacks() {
        axiosInstance.get("/api/get_feedbacks/")
            .then(response => {
                if (response.status === 200) {
                    var data = response.data;
                    var parsedData = JSON.parse(data);
                    SetFeedbacks([...parsedData.feedback_list]);
                    SetUserCount(parsedData.user_count);
                }
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    text: error
            })
        });
    }

    return (
        <React.Fragment>
        <div className="page-content">
            
            <Container>
                <h6>Total Users: { userCount }</h6>
                {/* Render Breadcrumb */}
                <Breadcrumbs title="WWJD" breadcrumbItem="Feedbacks" />
                <Card>
                    <CardBody>
                    <div className="table-responsive">
                        <Table className="table mb-0">
                        <thead>
                            <tr>
                            <th></th>
                            <th>User</th>
                            <th>Comment</th>
                            <th>DateTime</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((row, index) => (
                                <tr key={index}>
                                    <th scope="row">{ index + 1 }</th>
                                    <td>{row.user}</td>
                                    <td>{row.comment}</td>
                                    <td>{row.datetime}</td>
                                </tr>
                            ))}
                        </tbody>
                        </Table>
                    </div>
                    </CardBody>
                </Card>
            </Container>
        </div>
        </React.Fragment>
    );
};

export default Feedback;
