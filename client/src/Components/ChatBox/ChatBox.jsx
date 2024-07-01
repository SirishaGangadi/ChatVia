import axios from "axios";
import "./ChatBox.css";
import InputEmoji from "react-input-emoji";
import React, { useContext, useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import { TfiSearch } from "react-icons/tfi";
import { IoCall, IoCallOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { MdCancel, MdOutlinePersonOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { TbClockHour9 } from "react-icons/tb";
import { RiSendPlane2Fill } from "react-icons/ri";
import { MdOutlineAttachFile } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";
import { ThemeContext } from "../../Context/ThemeContext";

const ChatBox = ({ chat, currentUser, currentUserDetails, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const scroll = useRef();

  const { color, setColor } = useContext(ThemeContext) // theme

  console.log("Chat ID: " + chat?._id);

  function convertFile(event) {
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      setImage(dataURL);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  useEffect(() => {

    console.log("sirilu", receiveMessage)
    setMessages([...messages, receiveMessage]);

  }, [receiveMessage]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        if (userId) {
          const { data } = await axios.get(
            `http://localhost:5000/user/${userId}`
          );
          setUserData(data);
          console.log("User Data: ", data);
        }
      } catch (error) {
        console.log("Error fetching user data: ", error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (chat?._id) {
        try {
          const { data } = await axios.get(
            `http://localhost:5000/message/${chat._id}`
          );
          console.log("Messages: ", data);
          setMessages(data);
        } catch (error) {
          console.log("Error fetching messages: ", error);
        }
      }
    };

    fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
      image: image,
    };


    try {
      const { data } = await axios.post(
        "http://localhost:5000/message",
        message
      );
      setMessages([...messages, data]);
      setNewMessage("");
      setImage(null);
    } catch (error) {
      console.log(error);
    }

    // Send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    convertFile(event);
  };

  return (

    //theme
    <div className="chat_box" style={color ? ({ background: "white" }) : ({ background: "black", color: "white" })}>
      {chat ? (
        <div style={{ width: '100%' }}>
          <div className="chatbox-header">
            <div className="chatbox-header-img-name">
              <div className="chatbox-profile-image">
                <img
                  src={userData?.image}
                  alt=""
                />
              </div>
              <div className="chatbox-profile-name">{userData?.username}</div>
            </div>
            <div className="chatbox-header-icons">
              <div className="chatbox-header-icon">
                <TfiSearch />
              </div>
              {/* <div className="chatbox-header-icon">
                <IoCallOutline />
              </div> */}
              {/* <div>
                <img src="http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg" alt="" />
                <h6 style={{ textAlign: "center" }}>Doris Brown</h6>
                <span style={{ fontSize: '12px', color: 'rgb(137,142,166)' }}>start audio call</span>
                <div className="d-flex">
                  <div style={{ background: 'red', padding: '10px 20px', borderRadius: '10px' }}><MdCancel></MdCancel></div>
                  <div style={{ background: 'green', padding: '10px 20px', borderRadius: '10px' }}><IoCall></IoCall></div>
                </div>
              </div> */}

              <p data-toggle="modal" data-target="#exampleModal" className="chatbox-header-icon">
                <IoCallOutline />
              </p>


              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content" style={{marginTop:'200px'}}>
                    <div class="modal-body">
                      <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'40px 10px 40px 10px'}}>
                        <img src="http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg" alt="" style={{ width: '90px', height: '90px', borderRadius: '50%' }} />
                        <h6 style={{ textAlign: "center" }}>Doris Brown</h6>
                        <span style={{ fontSize: '15px', color: 'rgb(137,142,166)' }}>start audio call</span>
                        <div className="d-flex mt-3">
                          <div style={{ background: 'red', padding: '10px 20px', borderRadius: '10px' }}  data-dismiss="modal">< MdCancel style={{color:'white'}}></MdCancel></div>&nbsp;
                          <div style={{ background: 'green', padding: '10px 20px', borderRadius: '10px' }}><IoCall></IoCall></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                   <p data-toggle="modal" data-target="#exampleModal1" className="chatbox-header-icon">
                   <IoVideocamOutline />
              </p>


              <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content" style={{marginTop:'200px'}}>
                    <div class="modal-body">
                      <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'40px 10px 40px 10px'}}>
                        <img src="http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg" alt="" style={{ width: '90px', height: '90px', borderRadius: '50%' }} />
                        <h6 style={{ textAlign: "center" }}>Doris Brown</h6>
                        <span style={{ fontSize: '15px', color: 'rgb(137,142,166)' }}>start video call</span>
                        <div className="d-flex mt-3">
                          <div style={{ background: 'red', padding: '10px 20px', borderRadius: '10px' }}  data-dismiss="modal">< MdCancel style={{color:'white'}}></MdCancel></div>&nbsp;
                          <div style={{ background: 'green', padding: '10px 20px', borderRadius: '10px' }}> <IoVideocamOutline /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chatbox-header-icon"> 
                <MdOutlinePersonOutline />
              </div>
              <div className="chatbox-header-icon">
                <BsThreeDots />
              </div>
            </div>
          </div>
          <hr style={{ color: "#f5f7fb", opacity: "1" }} />
          {/* Chatbox Messages */}
          <div className="chatbox-message-container">
            {messages.map((message) => (
              <div
                ref={scroll}
                key={message?._id}
                className={
                  message?.senderId === currentUser
                    ? "ownmessage"
                    : "receivermessage"
                }
              >
                {message?.senderId === userData?._id && <img style={{ width: "30px", borderRadius: "50%", position: "absolute", left: "-34px", top: "32px" }} src={userData?.image} alt="" />}
                {message?.text && <span className="text">{message?.text}</span>}
                {message?.image && (
                  <div className="message-image"><img style={{ maxWidth: "230px" }}
                    src={message?.image}
                    alt="sent image"
                    className="sent-image"
                  /></div>
                )}
                <p className="chatbox-message-time">
                  <span>
                    <TbClockHour9 />
                  </span>
                  <span>{format(message?.createdAt)}</span>
                </p>
                {message?.senderId === currentUser && <img style={{ width: "30px", height: "30px", borderRadius: "50%", position: "absolute", right: "-34px", top: "32px" }} src={currentUserDetails?.image} alt="" />}
              </div>
            ))}
          </div>
          <div className="chat-sender">
            <InputEmoji
              color="#7269ef"
              value={newMessage}
              onChange={handleChange}
            />
            <MdOutlineAttachFile onClick={handleIconClick} />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <FaRegImage onClick={handleIconClick} />
            <div type="submit" className="send-button " onClick={handleSend}>
              <RiSendPlane2Fill />
            </div>
          </div>
        </div>
      ) : (
        <span>Tap on a Chat to start a Conversation...</span>
      )}
    </div>
  );
};

export default ChatBox;
