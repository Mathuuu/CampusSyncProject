import React, { useRef } from 'react';
import "./Chat.css";
import Comment from '../../img/comment.png'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import LogoSearch from '../../components/LogoSearch/LogoSearch';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { userChats } from "../../server/Controllers/ChatController"
import Conversation from "../../components/Conversation/Conversation"
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UilSetting } from '@iconscout/react-unicons'
import ChatBox from '../../components/ChatBox/ChatBox';
import { io } from 'socket.io-client'
const Chat = () => {

  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef()

  const profile = localStorage.getItem('profile');
  const loggedInUserId = JSON.parse(profile).user._id

  console.log("ID HERE", loggedInUserId)

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);


  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);


  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setRecieveMessage(data);
    }

    );
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        fetch(`http://localhost:5000/chat/${user._id}`).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json()
        }).then(data => {
          const membersArray = data[0].members; // Accessing the members array
          setChats(data);
        })
        // const dt = await fetch(`http://localhost:5000/chat/${user._id}`);
        // const whole = dt.json()
        // const data = whole[0].members
        // console.log(data)
        // setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className='Chat-container'>
          <h2>Chats</h2>
          <div className="Chat-list"> Conversation
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUser={user._id} online={checkOnlineStatus(chat)} />
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
          <div className="navIcons">
            <Link to='../home'><img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to='../chat'>
              <img src={Comment} alt="" />
            </Link>
          </div>
          { }
          <ChatBox chat={currentChat} currentUser={user._id} setSendMessage=
            {setSendMessage} recieveMessage={recieveMessage} />
        </div>
      </div>
    </div>
  )
}


export default Chat;




