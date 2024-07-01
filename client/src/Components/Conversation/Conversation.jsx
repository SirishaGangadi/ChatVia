import axios from "axios";
import "./Conversation.css";
import React, { useEffect, useState } from "react";

const Conversation = ({ data, currentUserId }) => {
  const [userData, setUserData] = useState(null);
  

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        if (userId) {

          const { data } = await axios.get(
            `http://localhost:5000/user/${userId}`
          );
          setUserData(data);
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <div>
      <div>
        <div className="d-flex">
          <div>
            <img
              className="person1chatlist"
              src={userData?.image}
              alt=""
            />
          </div>
          <div>
            <div className="person1chatheading6">{userData?.username}</div>
            <div className="person1chatparagraph">hey! there i'm available</div>
          </div>
          <div className="person1timing">02:50 pm</div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
