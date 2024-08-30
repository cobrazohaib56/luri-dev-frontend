import React, { useState } from "react"
import { Modal, ModalBody } from "reactstrap"
import axiosInstance from "service/axiosConfig"
import Swal from "sweetalert2"
import Loader from "./loader"

export const FeedbackModel = ({
  toggle,
  modal,
  feedback,
  SetFeedback,
  setIsFeedbackButtonClicked,
}) => {
  const [isLoading, SetIsLoading] = useState(false)
  async function SubmitFeedback() {
    if (feedback.length > 5) {
      setIsFeedbackButtonClicked(false)
      SetIsLoading(true)
      const user = JSON.parse(localStorage.authUser)?.user
      axiosInstance
        .post("/api/userfeedback/", {
          user: user?.id,
          comment: feedback,
        })
        .then(response => {
          SetIsLoading(false)
          SetFeedback("")
          if (response.status === 200) {
            toggle()
            Swal.fire({
              icon: "success",
              text: "Feedback Submitted Successfully",
            })
          }
        })
        .catch(error => {
          SetIsLoading(false)
          Swal.fire({
            icon: "error",
            text: error,
          })
        })
    }
  }

  const setUserFeedback = e => {
    if (e.target.value.length < 200) SetFeedback(e.target.value)
  }

  /* Please Provide Your Feedback */

  // position: absolute;
  // width: 518px;
  // height: 43px;
  // left: 55px;
  // top: 49px;

  // font-family: 'Greycliff CF';
  // font-style: normal;
  // font-weight: 600;
  // font-size: 36px;
  // line-height: 43px;
  // letter-spacing: 0.05em;

  // color: #000000;

  /* WWJDchat is built by Christians, for Christians. We need your help to make a better product for you! */

  // position: absolute;
  // width: 674px;
  // height: 48px;
  // left: 55px;
  // top: 110px;

  // font-family: 'Greycliff CF';
  // font-style: normal;
  // font-weight: 600;
  // font-size: 20px;
  // line-height: 24px;

  // color: rgba(0, 0, 0, 0.5);

  /* Line 6 */

  // position: absolute;
  // width: 716px;
  // height: 0px;
  // left: 55px;
  // top: 188px;

  // border: 2px solid rgba(145, 151, 161, 0.5);

  /* Rectangle 15 */

  // position: absolute;
  // width: 728px;
  // height: 109px;
  // left: 55px;
  // top: 215px;

  // background: #F2F2F2;
  // border-radius: 20px;

  /* Enter Your Feedback */

  // position: absolute;
  // width: 315px;
  // height: 29px;
  // left: 90px;
  // top: 240px;

  // font-family: 'Greycliff CF';
  // font-style: normal;
  // font-weight: 300;
  // font-size: 24px;
  // line-height: 29px;
  // /* identical to box height */
  // letter-spacing: 0.05em;

  // color: #9197A1;

  /* Rectangle 14 */

  // position: absolute;
  // width: 287px;
  // height: 62px;
  // left: 496px;
  // top: 351px;

  // background: #3A83FF;
  // border-radius: 20px;

  /* Submit Feedback */

  // position: absolute;
  // width: 203px;
  // height: 29px;
  // left: 532px;
  // top: 367px;

  // font-family: 'Greycliff CF';
  // font-style: normal;
  // font-weight: 700;
  // font-size: 24px;
  // line-height: 29px;
  // /* identical to box height */
  // letter-spacing: 0.05em;

  // color: #FFFFFF;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalBody
          style={{
            padding: "2rem",
            textAlign: "center",
            fontFamily: "GreycliffCF",
          }}
        >
          <h3
            style={{
              marginBottom: "1rem",
              fontSize: "1.5rem",
              fontWeight: "600",
              textAlign: "left",
              fontStyle: "normal",
              lineHeight: "40px",
              letterSpacing: "0.05em",
            }}
          >
            Please Provide Your Feedback
          </h3>
          <p
            style={{
              marginBottom: "1rem",
              color: "#6c757d",
              fontSize: "0.85rem",
              textAlign: "left",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "24px",
              color: "rgba(0, 0, 0, 0.5)",
            }}
          >
            Complainer is built for drafting the best legal cases. Help us get
            better by providing feedback!
          </p>
          <div
            style={{
              borderTop: "2px solid rgba(145, 151, 161, 0.5)",
              marginBottom: "20px",
            }}
          ></div>
          {isLoading ? (
            <Loader loaderColor={"text-dark"} />
          ) : (
            <div style={{ marginBottom: "2rem" }}>
              <textarea
                id="feedback_inp"
                name="feedback_inp"
                className="form-control"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#F2F2F2",
                  height: "80px",
                  color: "#9197A1",
                  fontSize: "0.8rem",
                  fontStyle: "normal",
                  fontWeight: "300",
                  lineHeight: "30px",
                  letterSpacing: "0.05em",
                }}
                placeholder="Enter Your Feedback"
                value={feedback}
                onChange={setUserFeedback}
              />
            </div>
          )}
          <div
            className=""
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button
              type="button"
              className="btn btn-primary"
              style={{
                borderRadius: "20px",
                backgroundColor: "#3A83FF",
                fontFamily: "GreycliffCF",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "14px",
                lineHeight: "30px",
                padding: "5px 35px",
                letterSpacing: "0.1em",
                color: "#FFFFFF",
              }}
              onClick={SubmitFeedback}
            >
              Submit Feedback
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}