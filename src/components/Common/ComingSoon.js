import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

//Import Countdown
import Countdown from "react-countdown"

//Import Images
import maintanence from "../../assets/images/coming-soon.svg"

const Comingsoon = () => {
    const targetMonth = () => {
        var currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1)

        // format date
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var day = '01';

        var formatedDate = `${year}/${month}/${day}`;
        return formatedDate;
    }
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
        // Render a completed state
        return <span>You are good to go!</span>
        } else {
        return (
            <>
            <div className="coming-box">
                {days} <span>Days</span>
            </div>{" "}
            <div className="coming-box">
                {hours} <span>Hours</span>
            </div>{" "}
            <div className="coming-box">
                {minutes} <span>Minutes</span>
            </div>{" "}
            <div className="coming-box">
                {seconds} <span>Seconds</span>
            </div>
            </>
        )
        }
    }

    //meta title
    document.title = "Coming Soon | Complainer";

    return (
        <React.Fragment>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-white">
                <i className="fas fa-home h2" />
                </Link>
            </div>
            <div className="my-5 pt-sm-5">
                <Container>
                <Row>
                    <Col lg="12">
                    <div className="text-center">
                        <Row className="justify-content-center mt-5">
                        <Col sm="4">
                            <div className="maintenance-img">
                            <img
                                src={maintanence}
                                alt=""
                                className="img-fluid mx-auto d-block"
                            />
                            </div>
                        </Col>
                        </Row>
                        <h4 className="mt-5">Stay Tuned.</h4>
                        <p className="text-muted">
                        Complainer Team is working on the feature.
                        </p>

                        <Row className="justify-content-center mt-5">
                        <Col md="8">
                            <div className="counter-number">
                            <Countdown date={targetMonth()} renderer={renderer} />
                            </div>
                        </Col>
                        </Row>
                    </div>
                    </Col>
                </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Comingsoon
