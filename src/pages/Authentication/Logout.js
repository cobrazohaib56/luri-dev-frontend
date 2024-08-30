import React, { useEffect } from "react";
import withRouter from "components/Common/withRouter";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { setSuperuserStatus, setBibleVersion } from "../../redux/slices/userSlice"

const Logout = () => {
  const history = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.removeItem("authUser");
    localStorage.removeItem('hasVisited');
    dispatch(setSuperuserStatus(false))
    dispatch(setBibleVersion("King James Version"))  
    history("/login");
  }, [])
  return <></>;
};

export default withRouter(Logout);