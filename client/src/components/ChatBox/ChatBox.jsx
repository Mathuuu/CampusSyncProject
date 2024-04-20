import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../../api/UserRequest';
import { addMessage, getMessages } from '../../api/MessageRequest';
// import { format } from 'timeago.js';
import InputEmoji from 'react-input-emoji'

const ChatBox = ({chat, currentUser,setSendMessage, recieveMessage}) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessages] = useState(" ");
    const scroll = useRef()

    useEffect(()=> {
        if (recieveMessage !== null && recieveMessage?.chatId === chat._id) {
          setMessages([...messages, recieveMessage]);
        }
      
      },[recieveMessage])
      

    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
          try {
            const { data } = await getUser(userId);
            setUserData(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        if (chat !== null) getUserData();
      }, [chat, currentUser])

      useEffect(() => {
        const fetchMessages = async () => {
          try {
            const { data } = await getMessages(chat._id);
            setMessages(data);
          } catch (error) {
            console.log(error);
          }
        };
        if (chat !== null) fetchMessages();

      }, [chat]);

      const handleChange = (newMessage)=> {
        setNewMessages(newMessage)
      }


      const handleSend = async(e)=> {
        e.preventDefault()
        const message = {
          senderId : currentUser,
          text: newMessage,
          chatId: chat._id,
      }



      try {
        const { data } = await addMessage(message);
        setMessages([...messages, data]);
        setNewMessages("");
      }
      catch
      {
        console.log("error")
      }


      const receiverId = chat.members.find((id)=>id!==currentUser);
      // send message to socket server
      setSendMessage({...message, receiverId})

    }
    
    useEffect(()=> {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      },[messages])

  return (
    <>
    <div className="ChatBox-container">
        {chat ? (
        <>
        <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
          </div>

          <div className="chat-body">
          {messages.map((message) => (
                <>
                  <div ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{(message.createdAt)}</span>
                  </div>
                </>
              ))}
          </div>

           {/* chat-sender */}
           <div className="chat-sender">
              <div>+</div>
              < InputEmoji 
              value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick={handleSend}>Send</div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
        
    </div>
    </>
  )
}

export default ChatBox