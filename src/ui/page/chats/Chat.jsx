// import React, { useEffect, useState } from "react";
// import "./Chat.css";
// import sendMessageIcon from "../../assets/image/send-message_icon.png";
// import { io, Socket } from "socket.io-client";
// import { useDispatch, useSelector } from "react-redux";
// import { fetch } from "../../redux/thunk/user/user";

// const ENDPOINT = "http://localhost:3001";
// let socket;

// export const Chat = () => {
//   const { userDataFetch } = useSelector((state) => state.userFetchSlice);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [showChats, setShowChats] = useState({});
//   const [input, setInput] = useState("");
//   const [chatWith, setChatWith] = useState(null);
//   const [peoples, setPeoples] = useState();
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
//   const dispatch = useDispatch();
//   // console.log("chatMessages: ", chatMessages);
//   // console.log("showChats: ", showChats);

//   useEffect(() => {
//     dispatch(fetch());
//     socket = io(ENDPOINT);

//     socket.emit("setup", user);

//     socket.on("connected", () => {
//       console.log("---Socket connected to server---");
//     });

//     socket.on("receive message", ({ chatId, newMessage }) => {
//       // console.log("chatId:", chatId, "newMessage:", newMessage);
//       // setMessages((prevMessages) => [...prevMessages, message]);

//       // setChatMessages((data) => {
//       //   data?.map((details) =>
//       //     details?.chatId === chatWith?._id
//       //       ? { ...details, message: [...details?.message, newMessage] }
//       //       : details
//       //   );
//       // });
//       updateMessage(chatId, newMessage);
//     });
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     setPeoples(userDataFetch);
//   }, [userDataFetch]);

//   useEffect(() => {
//     const chatData = chatMessages.filter(
//       (detail) => detail.chatId == chatWith?._id + user?._id
//     )[0];
//     // console.log("chatData:", chatData);
//     setShowChats(chatData);
//   }, [chatWith, chatMessages]);

//   const sendMessage = () => {
//     if (input.trim() !== "") {
//       // const newMessage = {
//       //   // chatId: user._id + chatWith._id,
//       //   chatId: chatWith._id,
//       //   text: input,
//       //   sender: "You",
//       // };

//       // setChatMessages([...chatMessages,newMessage]);

//       // socket.emit("send message", {
//       //   chatId: chatWith._id,
//       //   message: input,
//       //   sender: "You",
//       // });

//       // setInput("");

//       const newMessage = {
//         text: input,
//         sender: "You",
//         date: new Date(),
//       };

//       updateMessage(chatWith._id + user._id, newMessage);
//       // console.log("newMessage: ", newMessage);

//       socket.emit("send message", {
//         chatId: chatWith._id,
//         userId: user._id,
//         newMessage: newMessage,
//       });
//       socket.emit("fetchOneToOneChat", {
//         userId: user._id,
//         chatId: chatWith._id,
//       });
//       setInput("");
//       socket.on("getOneToOneChat", ({ chatData }) => {
//         console.log("chatData: ", chatData.data);
//       });
//     }
//   };

//   const updateMessage = (id, newMessage) => {
//     setChatMessages((prevData) => {
//       const idPresent = prevData.findIndex((data) => data.chatId === id);
//       if (idPresent !== -1) {
//         return prevData.map((data) =>
//           data.chatId === id
//             ? { ...data, message: [...data.message, newMessage] }
//             : data
//         );
//       } else {
//         return [...prevData, { chatId: id, message: [newMessage] }];
//       }
//     });
//   };
//   return (
//     <div className="chat-container">
//       <aside className="sidebar">
//         <h2>Chats</h2>
//         <ul>
//           {peoples?.map((data, index) => (
//             <li
//               key={index}
//               onClick={() => {
//                 setChatWith(data);
//               }}
//               className="focused-li"
//               tabIndex="0"
//             >
//               <div>
//                 {data.name}
//                 {data.name == user.name ? " (you)" : null}
//                 {/* <div class="online-indicator"></div> */}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </aside>
//       {chatWith && (
//         <main className="chat-window">
//           {chatWith?.name && (
//             <header className="chat-header">{chatWith?.name}</header>
//           )}

//           {/* <section className="chat-messages">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`message ${
//                   msg.sender === "You" ? "sent" : "received"
//                 }`}
//               >
//                 <span>{msg.text}</span>
//               </div>
//             ))}
//           </section> */}

//           {/* <section className="chat-messages">
//             {chatMessages?.map((data) => {
//               data.chatId === chatWith._id ? (
//                 <>
//                   {data?.message?.map((msg, index) => (
//                     <div
//                       key={index}
//                       className={`message ${
//                         msg.sender === "You" ? "sent" : "received"
//                       }`}
//                     >
//                       <span>{msg.text}</span>
//                       {console.log("msg: ", msg)}
//                     </div>
//                   ))}
//                 </>
//               ) : null;
//             })}
//           </section> */}

//           <section className="chat-messages">
//             {(showChats &&
//               showChats?.message?.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`message ${
//                     msg.sender === "You" ? "sent" : "received"
//                   }`}
//                 >
//                   <span>{msg.text}</span>
//                   {console.log("msg.text: ", msg.text)}
//                 </div>
//               ))) ||
//               null}
//           </section>

//           <footer className="chat-input">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type a message..."
//             />
//             <button onClick={sendMessage} className="send-button">
//               <img src={sendMessageIcon} alt="Send" />
//             </button>
//           </footer>
//         </main>
//       )}
//     </div>
//   );
// };

////////////////////////////////////////////////////////////////////////////////
//backup
///////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useRef, useState } from "react";
// import "./Chat.css";
// import sendMessageIcon from "../../assets/image/send-message_icon.png";
// import { io, Socket } from "socket.io-client";
// import { useDispatch, useSelector } from "react-redux";
// import { fetch } from "../../redux/thunk/user/user";

// const ENDPOINT = "http://localhost:3001";
// let socket;

// export const Chat = () => {
//   const { userDataFetch } = useSelector((state) => state.userFetchSlice);
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [chatMessages, setChatMessages] = useState();
//   const [input, setInput] = useState("");
//   const [chatWith, setChatWith] = useState();
//   const [peoples, setPeoples] = useState();
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
//   const dispatch = useDispatch();
//   const messagesRef = useRef(null);

//   useEffect(() => {
//     dispatch(fetch());
//     socket = io(ENDPOINT);

//     socket.emit("setup", user);

//     socket.on("connected", () => {
//       console.log("---Socket connected to server---");
//       setSocketConnected(true);
//     });
//     // if (socketConnected) {
//       socket.on("receive message", ({ chatId, newMessage }) => {
//         console.log("receive message");
//         fetchingChats(user?._id, chatId);
//       });
//     // }

//     return () => {
//       setSocketConnected(false);
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     setPeoples(userDataFetch);
//   }, [userDataFetch]);

//   useEffect(() => {
//     fetchingChats(user?._id, chatWith?._id + user?._id);
//     // console.log("starting of get message");
//   }, [chatWith]);

//   // Effect to scroll to the bottom of chat messages
//   useEffect(() => {
//     if (messagesRef.current) {
//       messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
//     }
//   }, [chatMessages]);

//   const sendMessage = () => {
//     // if (input.trim() !== "" && socketConnected) {
//       if (input.trim() !== "") {
//       const newMessage = {
//         text: input,
//         sender: "You",
//         date: new Date(),
//       };

//       socket.emit(
//         "send message",
//         {
//           chatId: chatWith._id,
//           userId: user._id,
//           newMessage: newMessage,
//         },
//         (sendMessageStatus) => {
//           if (sendMessageStatus?.success) {
//             fetchingChats(user?._id, chatWith?._id + user?._id);
//           } else {
//             console.log("send message -error");
//           }
//         }
//       );
//       setInput("");
//     }
//   };

//   const fetchingChats = (userId, chatId) => {
//     // if (socketConnected) {
//       socket.emit("fetchOneToOneChat", {
//         userId,
//         chatId,
//       });
//       socket.on("getOneToOneChat", ({ chatData }) => {
//         console.log("chatData: ", chatData?.data.chat[0].messagesByDate);
//         setChatMessages(chatData?.data.chat[0].messagesByDate);
//       });
//     // }
//   };

//   return (
//     <div className="chat-container">
//       <aside className="sidebar">
//         <h2>Chats</h2>
//         <ul>
//           {peoples?.map((data, index) => (
//             <li
//               key={index}
//               onClick={() => {
//                 setChatWith(data);
//               }}
//               className="focused-li"
//               tabIndex="0"
//             >
//               <div>
//                 {data.name}
//                 {data.name == user.name ? " (you)" : null}
//                 {/* <div class="online-indicator"></div> */}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </aside>
//       {chatWith && (
//         <main className="chat-window">
//           {chatWith?.name && (
//             <header className="chat-header">{chatWith?.name}</header>
//           )}

//           <section ref={messagesRef} className="chat-messages">
//             {(chatMessages &&
//               chatMessages?.map((chat, index) => (
//                 <div key={index} className="chat-content">
//                   <div className="chat-date">{chat.date}</div>
//                   {chat?.messages?.map((message, messageIndex) => (
//                     <div
//                       key={messageIndex}
//                       className={`message ${
//                         message?.sender === "You" ? "sent" : "received"
//                       }`}
//                     >
//                       <span className="message-text">{message?.text}</span>
//                       <div className="message-details">
//                         <div className="message-info">i</div>
//                         <div className="message-time">
//                           {message?.date
//                             ? new Date(message.date).toLocaleTimeString([], {
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               })
//                             : ""}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ))) || <h2 style={{ margin: "auto auto" }}>No chats there</h2>}
//           </section>

//           <footer className="chat-input">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type a message..."
//             />
//             <button onClick={sendMessage} className="send-button">
//               <img src={sendMessageIcon} alt="Send" />
//             </button>
//           </footer>
//         </main>
//       )}
//     </div>
//   );
// };

/////////////////////////////////////////////////////////////////////////////

import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import sendMessageIcon from "../../assets/image/send-message_icon.png";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "../../redux/thunk/user/user";
import { apiBaseUrl } from "../../utils/url";

// const ENDPOINT = apiBaseUrl || "http://localhost:3001";
const ENDPOINT = apiBaseUrl;
let socket;

export const Chat = () => {
  const { userDataFetch } = useSelector((state) => state.userFetchSlice);
  const [chatMessages, setChatMessages] = useState();
  const [input, setInput] = useState("");
  const [chatWith, setChatWith] = useState();
  const [peoples, setPeoples] = useState();
  // console.log("peoples: ", peoples);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
  const dispatch = useDispatch();
  const messagesRef = useRef(null);

  useEffect(() => {
    // dispatch(fetch());

    // socket connect
    socket = io(ENDPOINT);
    socket.emit("setup", user);

    socket.on("connected", () => {
      console.log("---Socket connected to server---");
    });

    // socket receive message
    socket.on("receive message", ({ chatId, newMessage }) => {
      try {
        console.log("receive message");
        fetchingChats(user?._id, chatId);
      } catch (error) {
        socketConnected(null);
      }
    });

    // socket disconnect
    return () => {
      socket.emit("offline", user?._id);
      socket.disconnect(user?._id);
    };
  }, []);

  // users fetch
  useEffect(() => {
    socket.on("getUser", () => {
      dispatch(fetch());
    });

    setPeoples(userDataFetch);
  }, [userDataFetch]);

  // socket fetch message
  useEffect(() => {
    fetchingChats(user?._id, chatWith?._id + user?._id);
  }, [chatWith]);

  // Effect to scroll to the bottom of chat messages
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        text: input,
        sender: "You",
        date: new Date(),
      };

      // socket send message
      socket.emit(
        "send message",
        {
          chatId: chatWith._id,
          userId: user._id,
          newMessage: newMessage,
        },
        (sendMessageStatus) => {
          if (sendMessageStatus?.success) {
            fetchingChats(user?._id, chatWith?._id + user?._id);
          } else {
            console.log("send message -error");
          }
        }
      );
      setInput("");
    }
  };

  const fetchingChats = (userId, chatId) => {
    // socket fetch message  one to one
    socket.emit("fetchOneToOneChat", {
      userId,
      chatId,
    });
    socket.on("getOneToOneChat", ({ chatData }) => {
      console.log("chatData: ", chatData?.data.chat[0].messagesByDate);
      setChatMessages(chatData?.data.chat[0].messagesByDate);
    });
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <h2>Chats</h2>
        <ul>
          {peoples?.map((data, index) => (
            <li
              key={index}
              onClick={() => {
                setChatWith(data);
              }}
              className="focused-li"
              tabIndex="0"
            >
              <div>
                {data.name}
                {/* {data.name == user.name ? " (you)" : null} */}
              </div>
              {data.name == user.name ? (
                <div className="sidebar-display-you">me</div>
              ) : (
                (data.chatStatus === "online" && (
                  <div className="online-indicator"></div>
                )) ||
                null
              )}
            </li>
          ))}
        </ul>
      </aside>
      {chatWith && (
        <main className="chat-window">
          {chatWith?.name && (
            <header className="chat-header">{chatWith?.name}</header>
          )}

          <section ref={messagesRef} className="chat-messages">
            {(chatMessages &&
              chatMessages?.map((chat, index) => (
                <div key={index} className="chat-content">
                  <div className="chat-date">{chat.date}</div>
                  {chat?.messages?.map((message, messageIndex) => (
                    <div
                      key={messageIndex}
                      className={`message ${
                        message?.sender === "You" ? "sent" : "received"
                      }`}
                    >
                      <span className="message-text">{message?.text}</span>
                      <div className="message-details">
                        <div className="message-info">i</div>
                        <div className="message-time">
                          {message?.date
                            ? new Date(message.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))) || <h2 style={{ margin: "auto auto" }}>No chats there</h2>}
          </section>

          <footer className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="send-button">
              <img src={sendMessageIcon} alt="Send" />
            </button>
          </footer>
        </main>
      )}
    </div>
  );
};
