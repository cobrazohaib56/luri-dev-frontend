import React, { useState } from "react"
import { Modal, ModalBody, Button } from "reactstrap"
import axiosInstance from "service/axiosConfig"
import Swal from "sweetalert2"
import Loader from "./loader"
import { useDispatch } from "react-redux"
import { setBibleVersion } from "../../redux/slices/userSlice"
import { useSelector } from "react-redux"


export const PreferredVersionModal = ({ toggle, modal }) => {
  const [isLoading, SetIsLoading] = useState(false)
  //   async function SubmitFeedback() {
  //     if (feedback.length > 5) {
  //       setIsFeedbackButtonClicked(false)
  //       SetIsLoading(true)
  //       const user = JSON.parse(localStorage.authUser)?.user
  //       axiosInstance
  //         .post("/api/userfeedback/", {
  //           user: user?.id,
  //           comment: feedback,
  //         })
  //         .then(response => {
  //           SetIsLoading(false)
  //           SetFeedback("")
  //           if (response.status === 200) {
  //             toggle()
  //             Swal.fire({
  //               icon: "success",
  //               text: "Feedback Submitted Successfully",
  //             })
  //           }
  //         })
  //         .catch(error => {
  //           SetIsLoading(false)
  //           Swal.fire({
  //             icon: "error",
  //             text: error,
  //           })
  //         })
  //     }
  //   }

  const dispatch = useDispatch()
  const [showVersionList, setShowVersionList] = useState(false)
  
  const bibleVersion = useSelector(state => state.user.bibleVersion)
  
  const [optionSelected, setOptionSelected] = useState(bibleVersion)
  const [optionIsSelected, setOptionIsSelected] = useState(false)

  const handleChooseBibleVersion = () => {
    setShowVersionList(!showVersionList)
  }

  const handleOptionSelection = value => {
    setOptionIsSelected(true)
    setOptionSelected(value)
  }

  const handleEdit = () => {
    setShowVersionList(true)
    setOptionIsSelected(false)
  }

  const handleConfirm = () => {
    dispatch(setBibleVersion(optionSelected))
    toggle()
  }

  const commonOptionsStyles = {
    borderRadius: "20px",
    backgroundColor: "#3A83FF",
    fontFamily: "GreycliffCF",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "30px",
    padding: "5px 35px",
    letterSpacing: "0.1em",
    color: "#FFFFFF",
    minWidth: "250px",
  }

  const skipButtonStyles = {
    borderRadius: "20px",
    backgroundColor: "#041D4D",
    fontFamily: "GreycliffCF",
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "30px",
    padding: "5px 35px",
    letterSpacing: "0.1em",
    color: "#FFFFFF",
    border: "2px solid #9197A1",
  }

  const buttonsData = [
    "King James Version",
    "English Standard Version",
    "New International Version",
  ]

  // return (
  //   <div>
  //     <Modal isOpen={modal} toggle={toggle} centered>
  //       <ModalBody
  //         style={{
  //           padding: "1rem 2rem",
  //           textAlign: "center",
  //           fontFamily: "GreycliffCF",
  //         }}
  //       >
  //         <h3
  //           style={{
  //             marginBottom: "1rem",
  //             fontSize: "1.5rem",
  //             fontWeight: "600",
  //             textAlign: "center",
  //             fontStyle: "normal",
  //             lineHeight: "40px",
  //             letterSpacing: "0.05em",
  //           }}
  //         >
  //           Choose Your Preferred Bible Version
  //         </h3>
  //         <p
  //           style={{
  //             marginBottom: "1rem",
  //             color: "#6c757d",
  //             fontSize: "0.85rem",
  //             textAlign: "center",
  //             fontStyle: "normal",
  //             fontWeight: "600",
  //             lineHeight: "24px",
  //             color: "rgba(0, 0, 0, 0.5)",
  //           }}
  //         >
  //           Select a Bible version that resonates with you for a more
  //           personalized experience. You can change this at any time in
  //           settings.
  //         </p>
  //         <div
  //           style={{
  //             borderTop: "2px solid rgba(145, 151, 161, 0.5)",
  //             marginBottom: "20px",
  //           }}
  //         ></div>
  //         {isLoading ? (
  //           <Loader loaderColor={"text-dark"} />
  //         ) : (
  //           optionIsSelected && (
  //             <div style={{ marginBottom: "2rem" }}>
  //               <h3
  //                 style={{
  //                   borderRadius: "15px",
  //                   //   backgroundColor: "#F2F2F2",
  //                   height: "40px",
  //                   color: "#9197A1",
  //                   fontSize: "20px",
  //                   fontStyle: "normal",
  //                   fontWeight: "300",
  //                   letterSpacing: "0.05em",
  //                   lineHeight: "30px",
  //                   textAlign: "center",
  //                   padding: "5px 35px",
  //                   border: "none",
  //                 }}
  //               >
  //                 You Have Selected
  //               </h3>
  //               <Button style={commonOptionsStyles}>{optionSelected}</Button>
  //             </div>
  //           )
  //         )}

  //         {isLoading ? (
  //           <Loader loaderColor={"text-dark"} />
  //         ) : (
  //           !optionIsSelected && (
  //             <div style={{ marginBottom: "0.5rem" }}>
  //               <Button
  //                 id="feedback_inp"
  //                 name="feedback_inp"
  //                 className="form-control"
  //                 style={{
  //                   borderRadius: "15px",
  //                   backgroundColor: "#F2F2F2",
  //                   height: "40px",
  //                   color: "#9197A1",
  //                   fontSize: "14px",
  //                   fontStyle: "normal",
  //                   fontWeight: "300",
  //                   letterSpacing: "0.05em",
  //                   lineHeight: "30px",
  //                   textAlign: "center",
  //                   padding: "5px 35px",
  //                   border: "none",
  //                 }}
  //                 onClick={handleChooseBibleVersion}
  //               >
  //                 Click Here to Choose Bible Version
  //               </Button>
  //               {!showVersionList && (
  //                 <div
  //                   style={{
  //                     display: "flex",
  //                     justifyContent: "space-between",
  //                     marginTop: "20px",
  //                   }}
  //                 >
  //                   <button
  //                     type="button"
  //                     className="btn"
  //                     style={skipButtonStyles}
  //                     onClick={() => toggle()} // Existing onClick for Skip
  //                   >
  //                     Skip
  //                   </button>
  //                   <button
  //                     type="button"
  //                     className="btn btn-primary"
  //                     style={{
  //                       borderRadius: "20px",
  //                       backgroundColor: "#3A83FF",
  //                       fontFamily: "GreycliffCF",
  //                       fontWeight: "700",
  //                       fontSize: "14px",
  //                       lineHeight: "30px",
  //                       padding: "5px 35px",
  //                       letterSpacing: "0.1em",
  //                       color: "#FFFFFF",
  //                     }}
  //                     onClick={() => toggle()}
  //                     // onClick={handleConfirm} // Implement this function as needed
  //                   >
  //                     Confirm
  //                   </button>
  //                 </div>
  //               )}
  //               {showVersionList && (
  //                 <div
  //                   style={{
  //                     maxHeight: "210px",
  //                     overflowY: "auto",
  //                     display: "flex",
  //                     flexDirection: "column",
  //                     alignItems: "center",
  //                     gap: "10px",
  //                     backgroundColor: "#FAFAFA",
  //                     padding: "30px 10px 30px 20px",
  //                     marginTop: "-15px",
  //                     marginBottom: "0px",
  //                   }}
  //                 >
  //                   {buttonsData.map((buttonData, index) => (
  //                     <Button
  //                       key={index}
  //                       style={commonOptionsStyles}
  //                       onClick={() => {
  //                         handleOptionSelection(buttonData)
  //                       }}
  //                     >
  //                       {buttonData}
  //                     </Button>
  //                   ))}
  //                 </div>
  //               )}
  //             </div>
  //           )
  //         )}

  //         {isLoading ? (
  //           <Loader loaderColor={"text-dark"} />
  //         ) : (
  //           optionIsSelected && (
  //             <div
  //               style={{
  //                 display: "flex",
  //                 justifyContent: "space-between",
  //                 marginTop: "20px",
  //               }}
  //             >
  //               <button
  //                 type="button"
  //                 className="btn"
  //                 style={skipButtonStyles}
  //                 onClick={handleEdit} // Existing onClick for Skip
  //               >
  //                 Edit
  //               </button>
  //               <button
  //                 type="button"
  //                 className="btn btn-primary"
  //                 style={{
  //                   borderRadius: "20px",
  //                   backgroundColor: "#3A83FF",
  //                   fontFamily: "GreycliffCF",
  //                   fontWeight: "700",
  //                   fontSize: "14px",
  //                   lineHeight: "30px",
  //                   padding: "5px 35px",
  //                   letterSpacing: "0.1em",
  //                   color: "#FFFFFF",
  //                 }}
  //                 onClick={handleConfirm}
  //               >
  //                 Confirm
  //               </button>
  //             </div>
  //           )
  //         )}
  //       </ModalBody>
  //     </Modal>
  //   </div>
  // )
}
