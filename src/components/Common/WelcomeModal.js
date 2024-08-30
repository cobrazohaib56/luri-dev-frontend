import React, { useState } from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap"

export const WelcomeModal = ({ toggle, modal }) => {
  async function ClosePopup() {
    toggle()
  }

  /* Welcome to WWJDchat! */

  // position: absolute;
  // width: 587px;
  // height: 58px;
  // left: 125px;
  // top: 60px;

  // font-family: 'Greycliff CF';
  // font-style: normal;
  // font-weight: 700;
  // font-size: 48px;
  // line-height: 58px;
  // /* identical to box height */
  // letter-spacing: 0.05em;

  // color: #000000;

  /* Your Scripture-Based Guide */

  // font-family: 'Greycliff CF';
  // font-style: normal;
  // font-weight: 500;
  // font-size: 24px;
  // line-height: 29px;
  // /* identical to box height */
  // text-align: center;
  // letter-spacing: 0.05em;

  // color: rgba(0, 0, 0, 0.5);

  /* Line 6 */

  // position: absolute;
  // width: 716px;
  // height: 0px;
  // left: 55px;
  // top: 197px;

  // border: 2px solid rgba(145, 151, 161, 0.5);

  /* WWJDchat is a non-denominational AI chatbot designed to provide scripture-based responses to your questions and reflections. Our goal is to offer wisdom and guidance grounded in the teachings of the Bible, helping you navigate life's journey with faith and understanding. Our chatbot draws from a diverse range of Christian scriptures, encompassing various translations and interpretations of the Bible. By integrating these rich and varied sources, WWJDchat delivers thoughtful and relevant answers that resonate with the teachings of Christianity, while remaining inclusive and respectful of different denominational beliefs and practices. Let WWJDchat be your companion in exploring the depths of Christian wisdom and finding answers that bring peace, clarity, and inspiration. */

  // position: absolute;
  // width: 710px;
  // height: 288px;
  // left: 61px;
  // top: 243px;

  // font-family: 'Greycliff CF';
  // font-style: normal;
  // font-weight: 600;
  // font-size: 20px;
  // line-height: 24px;
  // text-align: justify;

  // color: rgba(0, 0, 0, 0.5);

  /* Rectangle 14 */

  // position: absolute;
  // width: 287px;
  // height: 62px;
  // left: 484px;
  // top: 577px;

  // background: #3A83FF;
  // border-radius: 20px;

  /* Close Pop-up */

  // position: absolute;
  // width: 155px;
  // height: 29px;
  // left: 542px;
  // top: 593px;

  // font-family: 'Greycliff CF';
  // font-style: normal;
  // font-weight: 700;
  // font-size: 24px;
  // line-height: 29px;
  // /* identical to box height */
  // letter-spacing: 0.05em;

  // color: #FFFFFF;

  /* Rectangle 18 */

  // position: absolute;
  // width: 847px;
  // height: 701px;
  // left: 0px;
  // top: 0px;

  // background: #FFFFFF;
  // border-radius: 20px;

  // return (
  //   <div>
  //     <Modal isOpen={modal} toggle={toggle} centered>
  //       <ModalBody
  //         style={{
  //           padding: "1.5rem 2.5rem",
  //           textAlign: "center",
  //           fontFamily: "GreycliffCF",
  //         }}
  //       >
  //         <p
  //           style={{
  //             fontFamily: "GreycliffCF",
  //             fontStyle: "normal",
  //             fontWeight: "700",
  //             fontSize: "30px",
  //             lineHeight: "58px",
  //             letterSpacing: "0.05em",
  //             color: "#000000",
  //             marginBottom: '0px',
  //           }}
  //         >
  //           Welcome to WWJDchat!
  //         </p>
  //         <p
  //           style={{
  //             fontFamily: "GreycliffCF",
  //             fontStyle: "normal",
  //             fontWeight: "500",
  //             lineHeight: "29px",
  //             textAlign: "center",
  //             letterSpacing: "0.05em",
  //             fontSize: "16px",
  //             color: "rgba(0, 0, 0, 0.5)",
  //           }}
  //         >
  //           Your Scripture-Based Guide
  //         </p>
  //         <div
  //           style={{
  //             borderTop: "2px solid rgba(145, 151, 161, 0.5)",
  //             marginBottom: "20px",
  //           }}
  //         ></div>
  //         <div
  //           style={{
  //             fontFamily: "GreycliffCF",
  //             fontStyle: "normal",
  //             fontWeight: "600",
  //             fontSize: "14px",
  //             lineHeight: "20px",
  //             textAlign: "justify",
  //             color: "rgba(0, 0, 0, 0.5)",
  //           }}
  //         >
  //           <p>
  //           WWJDchat is a non-denominational AI chatbot designed to provide scripture-based responses to your questions and reflections. Our goal is to offer wisdom and guidance grounded in the teachings of the Bible, helping you navigate life's journey with faith and understanding.
  //           </p>

  //           <p>
  //           Our chatbot draws from a diverse range of Christian scriptures, encompassing various translations and interpretations of the Bible. By integrating these rich and varied sources, WWJDchat delivers thoughtful and relevant answers that resonate with the teachings of Christianity, while remaining inclusive and respectful of different denominational beliefs and practices. Let WWJDchat be your companion in exploring the depths of Christian wisdom and finding answers that bring peace, clarity, and inspiration.
  //           </p>
  //         </div>

  //         <div
  //           className=""
  //           style={{ display: "flex", justifyContent: "flex-end" }}
  //         >
  //           <button
  //             type="button"
  //             className="btn btn-primary"
  //             style={{
  //               borderRadius: "20px",
  //               backgroundColor: "#3A83FF",
  //               fontFamily: "GreycliffCF",
  //               fontStyle: "normal",
  //               fontWeight: "700",
  //               fontSize: "14px",
  //               lineHeight: "30px",
  //               padding: "5px 35px",
  //               letterSpacing: "0.05em",
  //               color: "#FFFFFF",
  //             }}
  //             onClick={ClosePopup}
  //           >
  //             Close
  //           </button>
  //         </div>
  //       </ModalBody>
  //     </Modal>
  //   </div>
  // )
}

// WWJDchat is a non-denominational AI chatbot designed to provide scripture-based responses to your questions and reflections. Our goal is to offer wisdom and guidance grounded in the teachings of the Bible, helping you navigate life's journey with faith and understanding.

// Our chatbot draws from a diverse range of Christian scriptures, encompassing various translations and interpretations of the Bible. By integrating these rich and varied sources, WWJDchat delivers thoughtful and relevant answers that resonate with the teachings of Christianity, while remaining inclusive and respectful of different denominational beliefs and practices. Let WWJDchat be your companion in exploring the depths of Christian wisdom and finding answers that bring peace, clarity, and inspiration.