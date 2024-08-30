import React, { useState } from "react"
// import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { Col, Input, InputGroup, Modal, Row, UncontrolledTooltip } from "reactstrap";

export const ReferralModal = ({ toggle, modal, link }) => {
  async function ClosePopup() {
    toggle()
  }

  const [toolTipText, SetToolTipText] = useState("Copy Job Link to Clipboard")
  const [showToolTip, SetShowToolTip] = useState(false)
  const SetLinkToClipboard = () => {
    SetShowToolTip(true)
    navigator.clipboard.writeText(link)
    SetToolTipText("Job Link Copied to Clipboard")
    setTimeout(() => {
      SetShowToolTip(false)
    }, 1500)
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} centered>
        <div className="modal-header">
          <h5 className="modal-title mt-0">Referral Link</h5>
          <button
            type="button"
            onClick={toggle}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Row className="mb-2">
            <Col>
              <InputGroup>
                <div className="input-group-append">
                  <button
                    id="sharetooltipcopy"
                    onClick={SetLinkToClipboard}
                    type="button"
                    className="btn btn-outline-primary mx-2"
                  >
                    {!showToolTip && (
                      <i className="fa fa-clone" aria-hidden="true" />
                    )}
                    {showToolTip && (
                      <i className="fa fa-check" aria-hidden="true" />
                    )}
                  </button>
                  <UncontrolledTooltip
                    placement="top"
                    isOpen={showToolTip}
                    target="sharetooltipcopy"
                  >
                    {toolTipText}
                  </UncontrolledTooltip>
                </div>
                <Input type="text" value={link} disabled />
              </InputGroup>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  )
}
