import axios from "axios";
import React, { useEffect, useState } from "react";
import { LuMessageSquarePlus } from "react-icons/lu";
import { RiMore2Fill } from "react-icons/ri";

const Contact = () => {
  const [contactUser, setContactUser] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchContactUsers() {
      try {
        const res = await axios.get("http://localhost:5000/user");
        const sortedUsers = res.data.sort((a, b) =>
          a.username.localeCompare(b.username)
        );
        setContactUser(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchContactUsers();
  }, []);

  // Function to group users by the first letter of their username
  const groupUsersByInitial = (users) => {
    return users.reduce((groups, user) => {
      const initial = user.username[0].toUpperCase();
      if (!groups[initial]) {
        groups[initial] = [];
      }
      groups[initial].push(user);
      return groups;
    }, {});
  };

  const groupedUsers = groupUsersByInitial(contactUser);

  useEffect(() => {
    const data = localStorage.getItem("profile");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
    }
  }, []);

  async function newChat(receiverId) {
    if (!userData) return;

    const chatData = {
      senderId: userData._id,
      receiverId: receiverId,
    };

    try {
      const res = await axios.post("http://localhost:5000/chat", chatData);
      console.log(chatData.senderId)
      console.log(chatData.receiverId)
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ paddingBottom: "40px" }}>
      {Object.keys(groupedUsers).map((initial) => (
        <div key={initial}>
          <h6 className="contactsAlist">{initial}</h6>
          {groupedUsers[initial].map((user) => (
            <div className="d-flex justify-content-between" key={user._id}>
              <div className="contactalbert">{user.username}</div>
              <div className="contactalbertmore2fill">
                <div className="newchat contactthreedots">
                  <div
                    className="create-new-chat"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      newChat(user._id);
                    }}
                  >
                   <div>new chat</div>
                    {/* <LuMessageSquarePlus /> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Contact;
