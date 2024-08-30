import React, { useEffect, useReducer, useRef, useState } from "react"
import ReactMarkdown from 'react-markdown';

import { Link } from "react-router-dom"
import { map } from "lodash"
import { Card, Col, Container, Input, Row, Button } from "reactstrap"

// Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"

// Import Breadcrumb
import axiosInstance from "../../service/axiosConfig"
import Swal from "sweetalert2"
import { FeedbackModel } from "components/Common/FeedbackModel"
import { WelcomeModal } from "components/Common/WelcomeModal"
import { ReferralModal } from "components/Common/ReferralModal"
import { PreferredVersionModal } from "components/Common/PreferredVersionModal"
import { useSelector } from "react-redux"

// import { setTitle, setSystemMsgBgColor, setSystemTextColor } from "../../redux/slices/userSlice"

import Loader from "components/Common/loader"

// Need to store title and systemMsgBgColor in redux

const Chat = () => {
  // Meta title
  document.title = "Chat | Complainer"

  //const bibleVersion = useSelector(state => state.user.bibleVersion)
  // console.log("Bible Version: ", bibleVersion)
  //   const scrollbarRef = useRef()
  const [scrollEl, setScrollEl] = useState()

  const [isFeedbackModal, SetIsFeedbackModal] = useState(false)
  const [isLoading, SetIsLoading] = useState(false)
  const [isFeedbackButtonClicked, setIsFeedbackButtonClicked] = useState(true)

  const [welcomeModal, setWelcomeModal] = useState(false)
  const [versionModal, setVersionModal] = useState(false)

  const [search, setSearch] = useState("")
  const [curMessage, setcurMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [feedback, SetFeedback] = useState("")

  const [referralModal, setReferralModal] = useState(false)
  const [referralLink, setReferralLink] = useState("")

  const openReferralModal = () => {
    setReferralModal(!referralModal)
  }

  const openFeedbackModal = () => {
    SetIsFeedbackModal(!isFeedbackModal)
  }

  // const title = useSelector(state => state.user.title)
  const [title, setTitle] = useState("Chat")
  const [buttonsData, setButtonsData] = useState([])
  const [showButtons, setShowButtons] = useState(true)
  const [customPrompt, setCustomPrompt] = useState("")
  const [isCustomPrompt, setIsCustomPrompt] = useState(false)

  // const systemMsgBgColor = useSelector(state => state.user.systemMsgBgColor)
  const [systemMsgBgColor, setSystemMsgBgColor] = useState("#041D4D")
  const [colorMappings, setColorMappings] = useState([])
  
  // const systemTextColor = useSelector(state => state.user.systemTextColor)
  const [systemTextColor, setSystemTextColor] = useState("#FFFFFF")
  const [goToEndColor, setGoToEndColor] = useState("rgba(58, 131, 255, 0.25)")

  const systemMsgBgColorShades = [
    "#87CEEB",
    "#1E90FF",
    "#40A740",
    "#FFD700",
    "#9370DB",
  ]

  const goToEndColors = {
    "Civil Torts in US": "rgba(58, 131, 255, 0.25)",
    "Types of harassment": "rgba(58, 131, 255, 0.25)",
    "How does lawsuits work?": "rgba(64, 167, 64, 0.25)",
    "How do I sue for personal injury?": "rgba(255, 215, 0, 0.25)",
    "What are the costs of filing a lawsuit?": "rgba(147, 112, 219, 0.25)",
  }

  useEffect(() => {
    GetAllChats()
  }, [customPrompt, isCustomPrompt])

  const handleButtonClick = (title2, prompt, index) => {
    SetIsLoading(true)
    axiosInstance
      .post("/api/create_custom_chat/", { prompt: prompt })
      .then(response => {
        setTitle(title2)
        setSystemMsgBgColor(colorMappings[title2])
        setCustomPrompt(prompt)
        setIsCustomPrompt(true)
        setShowButtons(false)
        // console.log("Title: ", title2)
        // console.log("Dict: ", goToEndColors)
        // console.log("Go to end color: ", goToEndColors[title2])
        setGoToEndColor(goToEndColors[title2])
        if (index == 3) {
          setSystemTextColor("#000000")
        }
        // GetAllChats()
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          text: error,
        })
      })
  }

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited")

    if (!hasVisited) {
      setWelcomeModal(true)
      // localStorage.setItem("hasVisited", "true")
    }
  }, [])

  const openWelcomeModal = () => {
    setWelcomeModal(!welcomeModal)
    setVersionModal(true)
    localStorage.setItem("hasVisited", "true")
  }

  const openVersionModal = () => {
    setVersionModal(!versionModal)
  }

  const scrollToBottom = () => {
    if (scrollEl) {
      scrollEl.scrollTop = scrollEl?.scrollHeight
    }
  }

  useEffect(() => {
    GetAllChats()
    const feedbackInterval = setInterval(openFeedbackModal, 1500000)
    return () => clearInterval(feedbackInterval)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollEl])

  async function GetAllChats() {
    SetIsLoading(true)
    const user = JSON.parse(localStorage.authUser)?.user
    // console.log("User: ", user)
    // console.log("Show button: ", showButtons)
    axiosInstance
      .post("/api/chats_by_user/", { user_id: user?.id })
      .then(response => {
        SetIsLoading(false)
        if (response.status === 200) {
          var data = response.data
          var parsedData = JSON.parse(data)
          // console.log("Parsed data: ", parsedData)
          parsedData.forEach(element => {
            element["loading"] = false
          })
          // console.log("Type: ", parsedData[0])
          setMessages([...parsedData])

          // console.log("IS CUSTOM PROMPT: ", isCustomPrompt)
          if (parsedData.length <= 1 && !isCustomPrompt) {
            // console.log("In The second request")
            axiosInstance.get("/api/get_buttons/").then(response2 => {
              if (response2.status === 200) {
                const buttons = response2.data
                setButtonsData(buttons)

                let newColorMappings = {}
                for (let i = 0; i < buttons.length; i++) {
                  newColorMappings[buttons[i].title] = systemMsgBgColorShades[i]
                }
                setColorMappings(newColorMappings)

                if (isCustomPrompt) {
                  setShowButtons(false)
                } else {
                  setShowButtons(true)
                  setTitle("Chat")
                }
              }
            })
          }
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

  // console.log("newColorMappings: ", colorMappings)

  // async function SendInitialServerMessage() {
  //   console.log("SEND INITIAL SERVER MESSAGE")
  //   SetIsLoading(true)
  //   const user = JSON.parse(localStorage.authUser)?.user
  //   const InitialMessage = [
  //     {
  //       type: "server",
  //       message: `Hello ${user?.first_name} ${user?.last_name}! I’m WWJD, your personal faith-based assistant. How can I provide you with scripture-based guidance and support today?`,
  //       createdAt: new Date(),
  //       loading: false,
  //     },
  //   ]
  //   console.log("Sending request to save_initial_conversation")
  //   axiosInstance
  //     .post("/api/save_initial_conversation/", {
  //       user_id: user?.id,
  //       chat_list: InitialMessage,
  //     })
  //     .then(response => {
  //       SetIsLoading(false)
  //       if (response.status === 200) {
  //         var resp = response.data
  //         console.log("Response from server: ", resp)
  //         setMessages(InitialMessage)
  //       }
  //     })
  //     .catch(error => {
  //       SetIsLoading(false)
  //       Swal.fire({
  //         icon: "error",
  //         text: error,
  //       })
  //     })
  // }

  async function clearChat() {
    SetIsLoading(true)
    axiosInstance
      .post("/api/clear_chat/", { isCustomPrompt: isCustomPrompt })
      .then(response => {
        // console.log("Clear chat response: ", response)
        setCustomPrompt(response.data.message)
        setShowButtons(true)
        setIsCustomPrompt(false)
        setSystemMsgBgColor("#041D4D")
        setSystemTextColor("#FFFFFF")
        setGoToEndColor("#CDE0FF")
        setTitle("Chat")
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          text: error,
        })
      })
  }

  async function createReferralLink() {
    const user = JSON.parse(localStorage.authUser)?.user
    const guid = user.uuid
    setReferralLink(`${window.location.origin}/register/${guid}`)
    openReferralModal()
  }

  async function SubmitChat(list_chat) {
    const user = JSON.parse(localStorage.authUser)?.user
    axiosInstance
      .post("/api/chat_request/", {
        user_id: user?.id,
        chat_list: list_chat,
        is_custom_prompt: isCustomPrompt,
        custom_prompt: title,
      })
      .then(response => {
        var resp = response.data
        var server_message = {
          type: resp.type,
          message: resp.message,
          createdAt: new Date(),
          loading: false,
        }
        setMessages([...list_chat, server_message])
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          text: error,
        })
      })
  }

  const addMessage = () => {
    const clientMessage = curMessage.trim()
    if (clientMessage) {
      const newMessage = [
        {
          type: "client",
          message: clientMessage,
          createdAt: new Date(),
          loading: false,
        },
        { loading: true },
      ]
      // Update the local chat data
      setMessages([...messages, ...newMessage])
      setShowButtons(false)
      SubmitChat([...messages, newMessage[0]])
      // Clear the message input field
      setcurMessage("")
      // set the scroll to bottom
      //   scrollToBottom()
    }
  }

  const filteredMessages = messages => {
    if (search) {
      return messages.filter(message =>
        message?.message?.toLowerCase().includes(search.toLowerCase())
      )
    }
    return messages
  }

  function ChatMessage({ message }) {
    return (
      <div className="chat-message">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    );
  }
  

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {isLoading ? (
            <Loader loaderColor={"text-dark"} />
          ) : (
            <Row>
              <Col lg={12}>
                <div>
                  <div className="w-100 user-chat">
                    <Card>
                      <div
                        className="d-flex flex-nowrap justify-content-between align-items-center px-4 mt-4"
                        // style={{ height: "53px" }}
                      >
                        {/* Left-aligned elements (Go-to End and Search Chat) */}
                        <div className="d-flex flex-row flex-nowrap">
                          <button
                            type="button"
                            className="btn mx-1 form-control d-none d-md-block"
                            onClick={scrollToBottom}
                            style={{
                              // backgroundColor: "#CDE0FF",
                              backgroundColor: goToEndColor,
                              borderRadius: "12px",
                              minWidth: "100px",
                              minHeight: "34px",
                              color: "041D4D",
                              // color: systemTextColor,
                            }}
                          >
                            Go-to End
                          </button>
                          <Input
                            id="search-input"
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="form-control d-none d-md-block" // Hide on small screens
                            style={{
                              borderRadius: "30px",
                              backgroundColor: "var(--bs-light)",
                              borderColor: "var(--bs-light)",
                              minWidth: "350px",
                            }}
                            placeholder="Search Chat"
                          />
                          <button
                            type="button"
                            className="btn mx-1 form-control d-none d-md-block"
                            onClick={clearChat}
                            style={{
                              backgroundColor: "#c0c6d2",
                              borderRadius: "12px",
                              minWidth: "120px",
                              // minHeight: "24px",
                            }}
                          >
                            Clear Chat
                          </button>
                        </div>

                        {/* Right-aligned elements (Clear Chat and Create Referral) */}
                        <div className="d-flex flex-row flex-nowrap">
                          <button
                            type="button"
                            className="btn mx-1 form-control d-none d-md-block"
                            onClick={createReferralLink}
                            style={{
                              backgroundColor: "#041D4D",
                              borderRadius: "12px",
                              minWidth: "120px",
                              color: "#FFFFFF",
                              // minHeight: "24px",
                            }}
                          >
                            Refer Friends!
                          </button>
                        </div>
                      </div>

                      {/* Mobile View */}
                      <div className="d-flex flex-nowrap px-4 mb-2 d-md-none">
                        <button
                          type="button"
                          className="btn mx-1"
                          onClick={scrollToBottom}
                          style={{
                            backgroundColor: "#CDE0FF",
                            borderRadius: "12px",
                            minWidth: "100px",
                            // width: "100%",
                            minHeight: "34px",
                          }}
                        >
                          Go-to End
                        </button>
                        <button
                          type="button"
                          className="btn mx-1"
                          onClick={clearChat}
                          style={{
                            backgroundColor: "#c0c6d2",
                            borderRadius: "12px",
                            // minWidth: "100px",
                            // minHeight: "34px",
                          }}
                        >
                          Clear Chat
                        </button>
                        <button
                          type="button"
                          className="btn mx-1"
                          onClick={createReferralLink}
                          style={{
                            backgroundColor: "#c0c6d2",
                            borderRadius: "12px",
                            // minWidth: "100px",
                            // minHeight: "34px",
                          }}
                        >
                          Create Referral
                        </button>
                      </div>

                      {/* Only visible on small screens */}
                      <div className="px-4 mt-4 mb-2 d-md-none">
                        <Input
                          id="mobile-search-input"
                          type="text"
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                          className="form-control"
                          style={{
                            borderRadius: "30px",
                            backgroundColor: "var(--bs-light)",
                            borderColor: "var(--bs-light)",
                          }}
                          placeholder="Search Chat"
                        />
                      </div>

                      <div className="chat-conversation p-2">
                        <ul className="list-unstyled">
                          <PerfectScrollbar
                            containerRef={ref => {
                              setScrollEl(ref)
                            }}
                            style={{
                              height: "65vh",
                              width: "100%",
                              padding: "0px 10px 0px 10px",
                            }}
                          >
                            <li>
                              <div
                                className="chat-day-title"
                                style={{ marginTop: "10px" }}
                              >
                                {isCustomPrompt && (
                                  <span
                                    className="title"
                                    style={{
                                      // marginTop: "30px",
                                      backgroundColor: colorMappings[title],
                                      color: systemTextColor,
                                      borderRadius: "20px",
                                      fontFamily: "GreycliffCF",
                                      fontStyle: "normal",
                                      fontWeight: "600",
                                      fontSize: "11px",
                                      letterSpacing: "0.1em",
                                      height: "30px",
                                      minWidth: "200px",
                                      // color: "white"
                                    }}
                                  >
                                    {title}
                                  </span>
                                )}
                                {!isCustomPrompt && (
                                  <span
                                    className="title"
                                    style={{
                                      borderRadius: "20px",
                                      fontFamily: "GreycliffCF",
                                      fontStyle: "normal",
                                      fontWeight: "600",
                                      fontSize: "11px",
                                      letterSpacing: "0.1em",
                                      height: "30px",
                                      minWidth: "200px",
                                      backgroundColor: "rgb(192, 198, 210)",
                                      color: "black",
                                    }}
                                  >
                                    {title}
                                  </span>
                                )}
                              </div>
                            </li>
                            {messages &&
                              map(filteredMessages(messages), message => (
                                <li
                                  key={"test_k" + message.id}
                                  className={`${
                                    message.type === "client"
                                      ? "text-end"
                                      : "text-start"
                                  }`}
                                >
                                  {message.loading ? (
                                    <div className="placeholder-glow">
                                      <span className="placeholder col-4 rounded"></span>
                                    </div>
                                  ) : (
                                    <div
                                      className={`rounded d-flex ${
                                        message.type === "client"
                                          ? "flex-row-reverse"
                                          : "flex-row"
                                      }`}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "left",
                                        }}
                                      >
                                        <p
                                          // className = "p-2"
                                          className={`p-2 ${
                                            message.type === "client" ? "" : ""
                                          }`}
                                          style={{
                                            maxWidth: "100%",
                                            borderRadius: "8px",
                                            fontSize: "13px",
                                            // backgroundColor: "#3A83FF",
                                            fontFamily: "GreycliffCF",
                                            fontStyle: "normal",
                                            fontWeight: "300",
                                            // fontSize: "11px",
                                            lineHeight: "20px",
                                            // // padding: "5px 35px",
                                            // letterSpacing: "0.05em",

                                            // color: "#FFFFFF",
                                            // minWidth: "250px",
                                            // marginRight:
                                            //   message.type === "client"
                                            //     ? "10px"
                                            //     : "",
                                            // : "bg-primary text-white"
                                            color:
                                              message.type === "client"
                                                ? "#202020"
                                                : systemTextColor == "#000000"
                                                ? "#000000"
                                                : "#FFFFFF",
                                            backgroundColor:
                                              message.type === "client"
                                                ? "#F2F2F2"
                                                : systemMsgBgColor,
                                            textAlign: "left",
                                          }}
                                        >
                                          <ChatMessage message={message.message} />
                                        </p>
                                        {showButtons && (
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              alignItems: "flex-start",
                                            }}
                                          >
                                            {buttonsData.map(
                                              (buttonData, index) => (
                                                <Button
                                                  key={index}
                                                  style={{
                                                    marginTop: "10px",
                                                    // backgroundColor:
                                                    //   systemMsgBgColorShades[
                                                    //     index
                                                    //   ],
                                                    backgroundColor:
                                                      colorMappings[
                                                        buttonData.title
                                                      ],
                                                    borderRadius: "20px",
                                                    fontFamily: "GreycliffCF",
                                                    fontStyle: "normal",
                                                    fontWeight: "600",
                                                    fontSize: "11px",
                                                    letterSpacing: "0.1em",
                                                    height: "30px",
                                                    padding: "0px",
                                                    minWidth: "200px",
                                                    color:
                                                      index == 0 || index == 3
                                                        ? "rgba(0, 0, 0, 0.65)"
                                                        : "#FFFFFF",
                                                  }}
                                                  onClick={() => {
                                                    handleButtonClick(
                                                      buttonData.title,
                                                      buttonData.prompt,
                                                      index
                                                    )
                                                  }}
                                                >
                                                  {buttonData.title}
                                                </Button>
                                              )
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </li>
                              ))}
                          </PerfectScrollbar>
                        </ul>
                      </div>
                      <div
                        className="p-3 chat-input-section"
                        style={{
                          borderRadius: "12px",
                          border: "1px solid lightgray",
                        }}
                      >
                        <Row>
                          <Col>
                            <div>
                              <Input
                                type="text"
                                value={curMessage}
                                onChange={e => setcurMessage(e.target.value)}
                                onKeyDown={e => {
                                  if (e.key === "Enter") {
                                    e.preventDefault()
                                    addMessage()
                                  }
                                }}
                                className="form-control chat-input"
                                placeholder="Enter Message..."
                              />
                              <div className="chat-input-links">
                                <ul className="list-inline mb-0">
                                  <li className="list-inline-item">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={addMessage}
                                      style={{
                                        //   backgroundColor: "#CDE0FF",
                                        borderRadius: "12px",
                                        minWidth: "80px",
                                        marginRight: 0,
                                        backgroundColor: colorMappings[title],
                                        color: systemTextColor,
                                        fontFamily: "GreycliffCF",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        fontSize: "11px",
                                        letterSpacing: "0.1em",
                                        // backgroundColor: systemMsgBgColor
                                      }}
                                    >
                                      Send
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </div>
                </div>
              </Col>
            </Row>
          )}
          {/* <div className="d-flex justify-content-end">
                    <Button className="btn btn-primary my-2" onClick={openFeedbackModalButtonClicked}>Send Feedback</Button>
                </div> */}
          <FeedbackModel
            modal={isFeedbackModal}
            toggle={openFeedbackModal}
            feedback={feedback}
            SetFeedback={SetFeedback}
            setIsFeedbackButtonClicked={setIsFeedbackButtonClicked}
          />
          <WelcomeModal modal={welcomeModal} toggle={openWelcomeModal} />

          <PreferredVersionModal
            modal={versionModal}
            toggle={openVersionModal}
          />

          <ReferralModal
            modal={referralModal}
            toggle={openReferralModal}
            link={referralLink}
          />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Chat
