import React, { useContext, useEffect, useRef, useState } from "react";
import "../Chat/Chat.css";
import axios from "axios";
import Conversation from "../Conversation/Conversation";
import ChatBox from "../ChatBox/ChatBox";
import { io } from "socket.io-client";
import "./Home.css";
import { IoLogOut, IoPersonOutline } from "react-icons/io5";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsPersonFillAdd } from "react-icons/bs";
import { RiLogoutCircleRLine, RiMessage3Line, RiProfileLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { LuMoon } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { BsRecord2Fill } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  RiAttachmentLine,
  RiContactsLine,
  RiDownload2Line,
  RiFileTextFill,
  RiGlobalLine,
  RiGroupLine,
  RiMoreFill,
  RiSettings2Line,
  RiUserAddLine,
} from "react-icons/ri";
import Contact from "../Contacts/Contact";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../Context/ThemeContext";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState({});
  
  const [search, setSearch] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);
  const [groups, setGroups] = useState([]);

  const { color, setColor } = useContext(ThemeContext) // theme


  const socket = useRef();
  const navigate = useNavigate();


  useEffect(() => {
    const data = localStorage.getItem("profile");
  if (data) {
    const parsedData = JSON.parse(data);
    setUserData(parsedData);

      socket.current = io("http://localhost:8800", {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
      });

      console.log("Attempting to connect to socket...");

      socket.current.on("connect", () => {
        console.log("Socket connected:", socket.current.id);
        socket.current.emit("new-user-add", parsedData._id);
      });

      socket.current.on("connect_error", (err) => {
        console.log(`Connection error: ${err.message}`);
      });

      socket.current.on("get-users", (users) => {
        console.log("Online users:", users);
        setOnlineUsers(users);
      });
      


      // Clean up the socket connection when the component unmounts
      return () => {
        if (socket.current) {
          console.log("Disconnecting socket...");
          socket.current.disconnect();
        }
      };
    }
  }, []);


  function changeTheme() {
    setColor(!color)
  }


  useEffect(() => {
    async function fetchgroup() {
      const res = await axios.get("http://localhost:5000/group")
      setGroups(res.data)
    }
    fetchgroup()
  }, [])

  // Fetch chats when userData is available
  useEffect(() => {
    const getChats = async () => {
      if (userData?._id) {
        try {
          const { data } = await axios.get(
            `http://localhost:5000/chat/${userData._id}`
          );
          setChats(data);
          setFilteredChats(data)

        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      }
    };
    getChats();
  }, [userData?._id]);

  useEffect(() => {
    const filterChats = async () => {
      if (search === "") {
        setFilteredChats(chats);
      } else {
        const filtered = await Promise.all(
          chats.map(async (chat) => {
            const userId = chat.members.find((id) => id !== userData?._id);
            try {
              const { data } = await axios.get(`http://localhost:5000/user/${userId}`);
              if (data.username.toLowerCase().includes(search.toLowerCase())) {
                return chat;
              }
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
            return null;
          })
        );
        setFilteredChats(filtered.filter((chat) => chat !== null));
      }
    };

    filterChats();
  }, [search, chats, userData?._id]);

  // sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
    console.log("vikas" + receiveMessage);
  }, [sendMessage]);

  // receive Message from socket server
  // useEffect(() => {

  //     socket.current.on("receive-message", (data) => {
  //       setReceiveMessage(data);
  //       console.log("sirisha",data);
  //     });


  // }, []);





  function Logout() {
    localStorage.removeItem("profile");
    navigate("/login")
  }

  return (
    <div className={color && color ? "lightmode" : "darkmode"}>
      <div className="chatvia-home" style={{ overflow: "hidden" }}>
        <div className="row">
          <div className="col-lg-4" style={{ padding: "0px" }}>
            <div class="d-flex align-items-start tab-main ">
              <div
                class="nav flex-column nav-pills  home-tab-list"
                id="v-pills-tab"
                role="tablist"
                style={color ? ({ background: "white" }) : ({ background: "black", color: "white" })} //theme
                aria-orientation="vertical"
              >
                <div className="chatvia-home-logo" style={color ? ({ background: "white" }) : ({ background: "black", color: "white" })}>

                  <img src="http://chatvia-light.react.themesbrand.com/static/media/logo.e41f6087382055646c1c02d0a63583d5.svg" alt="" style={{ width: "35px", marginLeft: "12px" }} />

                </div>
                <button
                  class="nav-link active"
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                  style={color ? ({ background: "white" }) : ({ background: "black", color: "white" })} //theme
                >
                  <IoPersonOutline />
                </button>
                <button
                  class="nav-link"
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  <RiMessage3Line />
                </button>
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  <BsPersonFillAdd />
                </button>
                <button
                  class="nav-link"
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings"
                  aria-selected="false"
                >
                  <BsPersonLinesFill />
                </button>
                <button
                  class="nav-link"
                  id="v-pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-contact"
                  aria-selected="false"
                >
                  <IoSettingsOutline />
                </button>
                <button class="nav-link profile_div5">
                  <RiGlobalLine className='log'></RiGlobalLine>
                  <div className="profile_div6">
                    <div>
                      <ul className="iph">
                        <li><img className="engli" src={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/2wBDAQQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/wAARCAAqAEADASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAAcDBgEEBQj/xAA1EAABAgIHBwIFAwUAAAAAAAABAgQAAwUGBxESFlYTFBVRk6HTMVciI5GS0hdBYiElRVKC/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAYBBQcDBP/EADERAAAEAwMKBQUAAAAAAAAAAAABAgMEBRESIZETFBUWUVRWkpPSBjIzZoExQVNk0f/aAAwDAQACEQMRAD8AoRouTPo5m9mKnNJ0yS7nrcOydi8VLWAJbYpQSV88X7x0zV9nxZcnc6RwCcuVwr/KACRtNqRgw4L+0RtEhtQzadMG6hwwfoTOegOJLoiYkYGyMB2MwemOO0W39wNF7k62ofTF8Mxp4okbpftN6wXGX++CNHU4ojWRKOlFl8VFeK23oNotqsrcmbj3A7/JxFoz3kkLQ6vReFD+MWWqNDUPx+r8mlHDpk0cSX22fkjd5+xKwhTclIOH+lxjUbqQuXIfCdLmIbIohK3siQENGhxH4XkjB89Q/wBo6lW10QxrDVt/TlFOXFGzUUkpSpaxu7n4lpC20v5eySk+qY8UzWapfHktRWci5W15fTreLCUm4U0lxtG7lM5as5EiNytovJauqHXlazfWk76p/CDK1m+tJ31T+EGYbK9KPPtHlgzDZXpR59o8sZRRjZCYrG1VnXuTkhAZWs31pO+qfwjKas2cJIUmuk4KBvBBSCCP+IxmGyvSjz7R5YMw2V6UefaPLBRj9TFYKzo7j1k5IQI9FS6/MWqGrGpdJSXCpLhs8nYDOTPlzFAgJSQQjliTG2aqVzLhUn9P6T4Nty4Sw+PGJhlbPFt8OP8AlHpHglrOp2HbwwcEtZ1Ow7eGHHWmIP6y06/P9GZaswnEkr6jnYPNMuq9ooSifOqdSUykWwaJYuRKwiQlqSQlSAnDNv5qixVQoGu9DViomnBUN4HTdDsuVzQrZz1uMVygj0Rdf6CHpwS1nU7Dt4YOCWs6nYdvDHJ/xJEPsvM6PUjKINFpJXlUqbR2h/DsEw+y8ufyp1KFpUaFuu2VU+x0QIs0V90IjprgzRX3QiOmuJeCWs6nYdvDBwS1nU7Dt4YW6vbYrlQGazKPbvXihFmivuhEdNcGaK+6ER01xLwS1nU7Dt4YOCWs6nYdvDBV7bFcqAWZR7d68UK1lep3uIrrIgyvU73EV1kQqXqEIeukIQAkTZgAAuAuMa1w5RW5w3uyMVB/TI5goiPWOLvL8THYG/lep3uIrrIgyvU73EV1kQoLhyguHKDOW92RioToGYcRxfSY7A38r1O9xFdZEGV6ne4iusiFBcOUFw5QZy3uyMVA0DMOI4vpMdgb+V6ne4iusiDK9TvcRXWRCguHKNlkhC3rVC0ApM2WCCLwbzBnDe7IxUIVI5glJnrHF3FX0mOwf//Z'} alt="" />&nbsp;&nbsp;&nbsp;English</li>
                        <li> <img className="engli" src={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/2wBDAQQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/wAARCAAqAEADASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAAUIBgQBAv/EACkQAAIBAgQFBAMBAAAAAAAAAAECAwAEBQYREhUWVZTRExRRUiIxQXH/xAAaAQACAwEBAAAAAAAAAAAAAAAABgEDBwQC/8QAKREAAgEDAgUDBQEAAAAAAAAAAQIDAAQRIVQFEhMUkhWRkwYWNFNxgf/aAAwDAQACEQMRAD8AyzSSSMWZ2ZmbVmJJJJ/przc32aq04BgXRrDtk8V8PguW4Y5JrrDcNggiR3eR7eMKqqNST+NZfH9WxSukcdhKzuQqgMNSa2b1+ID8Z/epO3N9mo3N9mqlbC7yLiF/Lh8WHwRS+pshe5w4QpK2u3buK/idw0Aan/AMC6NYdsniui6+omsigueHSLzZ5SJFIOP5Xo8dVTyvZyqcA4bTQ/0VJe5vs1G5vs1VpwDAujWHbJ4o4BgXRrDtk8VyfeFvspPIVHr8W3f3qS9zfZq9WSSNgyuysraqwJBBH9FVnwDAujWHbJ4o4BgXRrDtk8UfeFvspPIUevRbZ/enFYLMM/D0ZbLD8QtPd3UbX07e3kUxsCm5VjaRwGAGm5K3tZWe1fFbO4w9cCTCgzBzcL6Tes4kDEuI2JJPyaW+ENbIl7JcdPRY+UO4U5LjUAnXFLkcqxTwBwSjNhsAkf7iluRsTytMbuC6ksPd2uIMDLd7bZxbFQFKkiMFtQdRWlshavcXN9Dhl5BLcNtmmlkt2icwnaoURO5BA+wFZmfIqJbotpiVuXnhMd0TAwOpZ9HTQjcdH0/KtLbPuugnLiWuxHT32sReZQw2hthLf5rTJxm74XcWkkNrFbo8VmoEglQu7FkY5xy5Oh0ql2w5m7h5WmkcEBHVUQEkDBNOKKKKQKsooooooqT+aMx9cv8AuH80c0Zj65f9w/mubEY40v75ERVVbiVVAGgAB/Qrl2r8Cto7S120PxrT6IoSAehH4LTPmjMfXL/uH80c0Zj65f8AcP5pZtX4FG1fgUdpa7aH41qejD+mPwWmfNGY+uX/AHD+aOaMx9cv+4fzSzavwKNq/Ao7S120PxrR0Yf0x+C0z5ozH1y/7h/NHNGY+uX/AHD+aWbV+BXVh0cb39ijorK1xErAjUEE/o0dna7aH41qDFCBnoR+C1//2Q=='} alt="" />&nbsp;&nbsp;&nbsp;Spanish</li>
                        <li><img className="engli" src={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/2wBDAQQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/wAARCAAqAEADASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcCBQH/xAAlEAABAgILAQEAAAAAAAAAAAABAAIDUQUREhYXVFWjpNLiITL/xAAYAQEBAQEBAAAAAAAAAAAAAAAABwEDBf/EACURAAACCQUBAQAAAAAAAAAAAAABAgMEBREVVKPRFBZVkpTSUf/aAAwDAQACEQMRAD8AiL4sWI98SJFe57nEucSSST9JJK8tOmV3bs03kdyH2S7NN5Hch9l31bLVKe5D1JA/eEb/ADLMDhWnTKWnTK7t2abyO5D7Jdmm8juQ+yaxlqlPcgkD94Rv8yzA4Vp0ylp0yu7dmm8juQ+yXZpvI7kPsmsZapT3IJA/eEb/ADLMDhWnTK9ZFiw3siQ4r2va4FrgSCCPoIIXcuzTeR3IfZLs03kdyH2TVstUp7kEgfvCN/mWYFWRVjC8a5xfaYXjXOL7UunzqqraeBft0uKutLPkSdFWMLxrnF9pheNc4vtJ86qq2ngN0uKutLPkSdFWMLxrnF9pheNc4vtJ86qq2ngN0uKutLPkSdFWMLxrnF9pheNc4vtJ86qq2ngN0uKutLPkVpFt/wC3iRSoSU5SRgZlER+Iwi3UJJUJLIBEYRbqEkqEkgERhFuoSRn7YJlaSMTIv0wiP//Z'} alt="" />&nbsp;&nbsp;&nbsp;German</li>
                        <li><img className="engli" src={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/2wBDAQQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/wAARCAAqAEADASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAAgCBwEDBAX/xAAjEAACAQMEAgMBAAAAAAAAAAABAgADBzYEEXSxUbISIUQW/8QAFwEBAQEBAAAAAAAAAAAAAAAABwYFCP/EACcRAAIAAgkEAwAAAAAAAAAAAAABAgMEBQYHETM0dII1NrHBEiEx/9oADAMBAAIRAxEAPwD1mdmYu7sWLbkk7kkyO58yMJzKT5ZtqSf6at9/gre6xi4ulqcmrcCr7rGLjRYXoS3Ez0atDyeTCLPdnKl+/wAVLtozEWa7OVrwqPbShrPTc4RGu77he1m+UVlufMyrupDK5UqdwQdiCJiEnh2aT+mjuhCEFzi4s21OTVuBV91jFxdLU5NW4FX3WMXGiwnQluJno1aFk8mEWa7OVrwqPbRmYs12crXhUe2lDWem5wiNd33C9rN8orKEISeHc7oT0NaiJrdWiIFUVXAAGwABmj4r4EGYocG1icWliWpyatwKvusYuLvazJq3Cq+yxiozWF6EtxM9GrQsnkyMWa7OVrwqPbRm4tF18qXhUu2lDWem5wiNd33A9rN8oq6E27DxOnRIj63So6AqatMEEbg7mTw6RR/GFvD8WJ//2Q=='} alt="" />&nbsp;&nbsp;&nbsp;Italian</li>
                        <li><img className="engli" src={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/2wBDAQQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/wAARCAAqAEADASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAMGBwQI/8QAIxAAAgACCwEAAAAAAAAAAAAAAAECBAcRFhdRVFajpNPiA//EABoBAQACAwEAAAAAAAAAAAAAAAABBgIEBwj/xAAmEQAAAwUJAQEAAAAAAAAAAAAAAQIDBhZUowQRExRSVZPR0hIx/9oADAMBAAIRAxEAPwD3UDLL6qM9S8Oa6xfVRnqXhzXWbeQt0k341dDDERrIamDLL6qM9S8Oa6xfVRnqXhzXWMhbpJvxq6DERrIamDLL6qM9S8Oa6xfVRnqXhzXWMhbpJvxq6DERrIamDLL6qM9S8Oa6xfVRnqXhzXWMhbpJvxq6DERrIeBgXOySz+16Fkln9r0WmLHfn6TXyLBAD27TXY+xTAXOySz+16Fkln9r0Isd+fpNfIQA9u012PsUwFzsks/tehZJZ/a9CLHfn6TXyEAPbtNdj7FMBc7JLP7XoWSWf2vQix35+k18hAD27TXY+xcwd07BBBOzUEECUK+v0SSVSVTOapYHGR6SSv6Iju/SIxECWpYCpYATeIgS1LAVLABeIgS1LA6ZKCCOdlYI4E4X9fmmmq062BCl/KTO78K8f//Z'} alt="" />&nbsp;&nbsp;&nbsp;Russian</li>
                      </ul>
                    </div>
                  </div>
                </button>
                <button onClick={() => { changeTheme() }} class="nav-link" >
                  <LuMoon />
                </button>
                <button class="nav-link profile_div1">
                  <img className='log' src={userData?.image} alt="" />
                  <div className="profile_div2">
                    <div>
                      <ul>
                        <li>Profile <RiProfileLine className="fileline"></RiProfileLine></li>
                        <li>Settings<RiSettings2Line className="fileline1"></RiSettings2Line></li><hr className="textmar"></hr>
                        <li onClick={() => Logout()}>Logout <RiLogoutCircleRLine className="fileline" /></li>
                      </ul>
                    </div>
                  </div>
                </button>
              </div>
              <div
                className="tab-content home-chat-tabs"
                id="v-pills-tabContent"
                style={{ width: "100%" }}
              >
                <div
                  class="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div className="dashnoardchats">
                    <div>
                      <h5 className="myprofileh5margintop">My Profile</h5>
                    </div>
                    <div>
                      <img
                        className="chatviamyprofileimage"
                        src={userData?.image}
                        alt=""
                      />


                      <h6 className="chatviaprofilename">{userData?.username}  <span><i style={{ fontSize: '25px', cursor: 'pointer' }}
                      >&#9998;</i></span></h6>

                      <div className="profilechatdisplayflex">
                        <div className="recordcirclewidth">
                          <BsRecord2Fill />
                        </div>
                        <div className="activeleft">Active</div>
                      </div>
                    </div>

                  </div>
                  <div className="dashnoardchats1222">
                    <div className="container">
                      <p className="ifseveral">
                        If several languages coalesce, the grammar of the
                        resulting language is more simple and regular than that
                        of the individual.
                      </p>
                      {/* <div className="dashboardabout">
                                    <h6 className="userlineabout"> <RiUser2Line></RiUser2Line> About <span className="downspan"> <ChevronBarDown></ChevronBarDown></span></h6>
                                </div>
                                <div className="dashboardaboutmargintop">
                                    <h6 className="userlineabout"> <RiUser2Line></RiUser2Line> Attached Files <span className="downspanattached"> <ChevronBarDown></ChevronBarDown></span></h6>
                                </div> */}
                      <div class="accordion" id="accordionExample">
                        <div
                          class="accordion-item"
                          style={{ marginBottom: "10px" }}
                        >
                          <h2 class="accordion-header" id="headingOne">
                            <button
                              class="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              <div className="dashboardabout">
                                <h6>
                                  {" "}
                                  <IoPersonOutline></IoPersonOutline> About{" "}
                                </h6>
                              </div>
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            class="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <div>
                                <p className="accp">Name</p>
                                <h6 className="acch">{userData?.username}</h6>
                              </div>

                              <div>
                                <p className="accp">Email</p>
                                <h6 className="acch">{userData?.email}</h6>
                              </div>

                              <div>
                                <p className="accp">Time</p>
                                <h6 className="acch">11:40 AM</h6>
                              </div>

                              <div>
                                <p className="accp">Location</p>
                                <h6 className="acch">California, USA</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="headingTwo">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              <div className="dashboardabout">
                                <h6>
                                  <RiAttachmentLine></RiAttachmentLine> Attached
                                  Files{" "}
                                </h6>
                              </div>
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <div className="flex5">
                                <div>
                                  <RiFileTextFill className="file" />
                                </div>
                                <div>
                                  <h6 className="acch2">Admin-A.zip</h6>
                                  <p className="accp2">12.5 MB</p>
                                </div>
                                <div>
                                  <RiDownload2Line className="download" />
                                </div>
                                <div>
                                  <RiMoreFill className="download2" />
                                </div>
                              </div>

                              <div className="flex5">
                                <div>
                                  <RiFileTextFill className="file" />
                                </div>
                                <div>
                                  <h6 className="acch2">Image-1.jpg</h6>
                                  <p className="accp2">4.2 MB</p>
                                </div>
                                <div>
                                  <RiDownload2Line className="download3" />
                                </div>
                                <div>
                                  <RiMoreFill className="download4" />
                                </div>
                              </div>

                              <div className="flex5">
                                <div>
                                  <RiFileTextFill className="file" />
                                </div>
                                <div>
                                  <h6 className="acch2">Image-2.jpg</h6>
                                  <p className="accp2">3.1 MB</p>
                                </div>
                                <div>
                                  <RiDownload2Line className="download5" />
                                </div>
                                <div>
                                  <RiMoreFill className="download6" />
                                </div>
                              </div>

                              <div className="flex5">
                                <div>
                                  <RiFileTextFill className="file" />
                                </div>
                                <div>
                                  <h6 className="acch2">Landing-A.zip</h6>
                                  <p className="accp2">6.7 MB</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ height: '500px' }}
                  className="tab-pane fade chat-list-home "
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <div className="dashnoardchats" >
                    <h5 className="dashboardmessages">Chats</h5>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: "325px",
                        margin: "0 auto",
                      }}
                    >
                      <CiSearch
                        style={{
                          position: "absolute",
                          left: "10px",
                          color: "#aaa",
                          fontSize: "20px",

                        }}
                      />
                      <input
                        type="text"
                        placeholder="Search messages or users"
                        onChange={(e) => { setSearch(e.target.value) }}
                        value={search}
                        style={{
                          width: "100%",
                          padding: "10px 10px 10px 40px",
                          backgroundColor: "#E6EbF5",
                          border: "none",

                          borderRadius: "4px",
                          fontSize: "16px",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div className="d-flex">
                      <div className="patrickbackground">
                        <h6 className="patrickmargintop">{userData?.username}</h6>
                        {/* <h6 className="patrickmargintop">Beaulah</h6> */}
                      </div>
                      <div className="person1width">
                        <img
                          src={userData?.image}
                          alt=""
                        />
                        <p className="online"></p>
                      </div>
                      <div className="patrickbackground">
                        <h6 className="patrickmargintop"> chinnu</h6>
                      </div>
                      <div className="person1width1">
                        <img
                          src="http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg"
                          alt=""
                        />
                        <p className="online"></p>
                      </div>
                      <div className="patrickbackground">
                        <h6 className="patrickmargintop">manisha</h6>
                      </div>
                      <div className="person1width2">
                        <img
                          src="http://chatvia-light.react.themesbrand.com/static/media/avatar-5.a5c59cee7b3dfda1156d.jpg"
                          alt=""
                        />
                        <p className="online"></p>
                      </div>
                      <div className="patrickbackground">
                        <h6 className="patrickmargintop">sandhya</h6>
                      </div>
                      <div className="person1width3">
                        <img
                          src="http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg"
                          alt=""
                        />
                        <p className="online"></p>
                      </div>
                    </div>
                    <h6 className="dashboardrecent">Recent</h6>
                  </div>
                  <div className="dashnoardchats indexdashboard">
                    {filteredChats.map((chat) => (
                      <div style={{ cursor: "pointer" }} key={chat._id} onClick={() => setCurrentChat(chat)}>
                        <Conversation
                          data={chat}
                          currentUserId={userData?._id}
                        />
                      </div>
                    ))}
                  </div>

                </div>

                <div
                  class="tab-pane fade"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"

                >
                  {/*Changes */}
                  <div className="dashboardgroupmessages" style={color ? ({ }) : ({ background: "black", color: "white" })} >
                    <div className="d-flex groupdflexmargintop">
                      <div>
                        {" "}
                        <h5 className="grouomessagemarginleft">Groups</h5>
                      </div>
                      <div className="messagesgroupline">
                        {" "}
                        <Link to='/groupform'><RiGroupLine></RiGroupLine></Link>
                      </div>
                    </div>

                    {
                      groups && groups.map((item) => {
                        return (
                          <div className="d-flex groupsgeneralg" style={{ cursor: "pointer" }} onClick={() => setCurrentChat(item)}>
                            <div className="groupsgcircle">
                              <h6>#</h6>
                            </div>
                            <div style={{ marginLeft: "20px" }}>{item.name}</div>
                          </div>
                        )
                      })
                    }


                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-settings"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                >
                  <div
                    className="contactsbackground"
                    style={{
                      height: "100vh",
                      overflow: "scroll",
                      overflowX: "hidden",
                      scrollbarColor: "##f5f7fb #f5f7fb",

                      padding: "0px 20px 0px 10px",
                    }}
                  >
                    <div className="d-flex contactmargintopcontact ">
                      <div>
                        <h5 className="contactsnameh5">Contacts</h5>
                      </div>
                      <div className="contactueraddline">
                        <RiUserAddLine></RiUserAddLine>
                      </div>
                    </div>

                    <Contact />
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-contact"
                  role="tabpanel"
                  aria-labelledby="v-pills-contact-tab"
                  style={{ marginLeft: '20px' }}
                >
                  <div className="settingsbackgroundtotal">
                    <h4 className="settingsmargintop">Settings</h4>
                    <div>
                      <img
                        className="chatviamyprofileimage"
                        src={userData?.image}
                        alt=""
                      />
                      <h6 className="chatviaprofilename">{userData?.username}</h6>
                      <div className="profilechatdisplayflex">
                        <div className="availablesettings">available</div>
                      </div>
                    </div>
                  </div>
                  <div className="settingsbackgroundsecond">
                    <div class="accordion" id="accordionPanelsStayOpenExample">
                      <div class="accordion-item">
                        <h2
                          class="accordion-header"
                          id="panelsStayOpen-headingOne"
                        >
                          <button
                            class="accordion-button "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseOne"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseOne"
                          >
                            <div>
                              <h6 className="userlineabout"> Personal Info </h6>
                            </div>
                          </button>
                        </h2>
                        <div
                          id="panelsStayOpen-collapseOne"
                          class="accordion-collapse collapse show"
                          aria-labelledby="panelsStayOpen-headingOne"
                        >
                          <div class="accordion-body">
                            <div>
                              <p className="accp">Name</p>
                              <h6 className="acch">{userData?.username}</h6>
                            </div>

                            <div>
                              <p className="accp">Email</p>
                              <h6 className="acch">{userData?.email}</h6>
                            </div>

                            <div>
                              <p className="accp">Time</p>
                              <h6 className="acch">11:40 AM</h6>
                            </div>

                            <div>
                              <p className="accp">Location</p>
                              <h6 className="acch">California, USA</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2
                          class="accordion-header"
                          id="panelsStayOpen-headingTwo"
                        >
                          <button
                            class="accordion-button collapsed mt-2"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseTwo"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseTwo"
                          >
                            <div>
                              <h6 className="userlineabout"> Privacy </h6>
                            </div>
                          </button>
                        </h2>
                        <div
                          id="panelsStayOpen-collapseTwo"
                          class="accordion-collapse collapse"
                          aria-labelledby="panelsStayOpen-headingTwo"
                        >
                          <div class="accordion-body">
                            <div className="d-flex">
                              <div>profile photo</div>
                              <div
                                style={{
                                  marginLeft: "129px",
                                  fontSize: "13px",
                                  background: "rgb(230,235,245)",
                                  paddingLeft: "5px",
                                  paddingRight: "5px",
                                  borderRadius: "3px",
                                }}
                              >
                                Everyone{" "}
                                <span style={{}}>
                                  {" "}
                                  <BsChevronUp></BsChevronUp>{" "}
                                </span>{" "}
                              </div>
                            </div>
                            <hr />
                            <div className="d-flex">
                              <div>Last seen</div>
                              <div style={{ marginLeft: "190px" }}>
                                <div class="form-check form-switch">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexSwitchCheckDefault"
                                  ></label>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="d-flex">
                              <div>Status</div>
                              <div
                                style={{
                                  marginLeft: "179px",
                                  fontSize: "13px",
                                  background: "rgb(230,235,245)",
                                  paddingLeft: "5px",
                                  paddingRight: "5px",
                                  borderRadius: "3px",
                                }}
                              >
                                Everyone{" "}
                                <span style={{}}>
                                  {" "}
                                  <BsChevronUp></BsChevronUp>
                                </span>{" "}
                              </div>
                            </div>
                            <hr />
                            <div className="d-flex">
                              <div>Read receipts</div>
                              <div style={{ marginLeft: "160px" }}>
                                <div class="form-check form-switch">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexSwitchCheckDefault"
                                  ></label>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="d-flex">
                              <div>groups</div>
                              <div
                                style={{
                                  marginLeft: "180px",
                                  fontSize: "13px",
                                  background: "rgb(230,235,245)",
                                  paddingLeft: "5px",
                                  paddingRight: "5px",
                                  borderRadius: "3px",
                                }}
                              >
                                Everyone{" "}
                                <span style={{}}>
                                  {" "}
                                  <BsChevronUp></BsChevronUp>{" "}
                                </span>{" "}
                              </div>
                            </div>
                            <hr />
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2
                          class="accordion-header "
                          id="panelsStayOpen-headingThree"
                        >
                          <button
                            class="accordion-button collapsed mt-2"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseThree"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseThree"
                          >
                            <div>
                              <h6 className="userlineabout"> Security </h6>
                            </div>
                          </button>
                        </h2>
                        <div
                          id="panelsStayOpen-collapseThree"
                          class="accordion-collapse collapse"
                          aria-labelledby="panelsStayOpen-headingThree"
                        >
                          <div class="accordion-body">
                            <div className="d-flex">
                              <div>Show notification</div>
                              <div>
                                <div style={{ marginLeft: "150px" }}>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexSwitchCheckDefault"
                                    ></label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item" >
                        <h2
                          class="accordion-header"
                          id="panelsStayOpen-headingfour"
                        >
                          <button
                            class="accordion-button collapsed mt-2"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapsefour"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapsefour"
                          >
                            <div>
                              <h6 className="userlineabout"> Help</h6>
                            </div>
                          </button>
                        </h2>
                        <div
                          id="panelsStayOpen-collapsefour"
                          class="accordion-collapse collapse"
                          aria-labelledby="panelsStayOpen-headingfour"
                        >
                          <div class="accordion-body">
                            <div>FAQs</div>
                            <hr />
                            <div>Contact</div>
                            <hr />
                            <div>Terms & Privacy policy</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8" style={{ padding: "0px" }}>
            <div className="chats-right-side" style={color ? ({ background: "" }) : ({ background: "black", color: "white" })}>
              <div className="chatbox-body">
                <ChatBox
                  chat={currentChat}
                  currentUser={userData?._id}
                  setSendMessage={setSendMessage}
                  recieveMessage={receiveMessage}
                  currentUserDetails={userData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
