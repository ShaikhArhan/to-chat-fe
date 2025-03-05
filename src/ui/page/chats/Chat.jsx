import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import sendMessageIcon from "../../assets/image/send-message_icon.png";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "../../redux/thunk/user/user";
import useToast from "../../hooks/toastHook";
import { generateUniqueId } from "../../utils/generateUniqueId";

const ENDPOINT = "http://localhost:3001";
// const ENDPOINT = "https://to-chat-be.up.railway.app";
let socket;

export const Chat = () => {
  const { userDataFetch } = useSelector((state) => state.userFetchSlice);
  const [chatMessages, setChatMessages] = useState();
  const [input, setInput] = useState("");
  const [chatWith, setChatWith] = useState();
  // console.log("chatWith: ", chatWith);
  const [peoples, setPeoples] = useState();
  // console.log("peoples: ", peoples);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
  const dispatch = useDispatch();
  const messagesRef = useRef(null);
  const showToast = useToast();

  useEffect(() => {
    // socket connect
    socket = io(ENDPOINT);
    socket.emit("setup", user);

    socket.on("connected", () => {
      console.log("---Socket connected to server---");
    });
    console.log('chatWith?._id: ', chatWith?._id);

    // socket receive message
    socket.on("receive message", ({ senderId, chatId, newMessage }) => {
      try {
        console.log("receive message");
        fetchingChats(user?._id, chatId);

        console.log("user?._id , chatWith?._id , senderId: ", user?._id, chatWith?._id, senderId);
        if (user?._id && chatWith?._id == senderId) {
          console.log("messageSeen", user?._id, chatWith?._id);
          socket.emit("messageSeen", {
            senderId: chatWith?._id,
            chatId: user?._id + chatWith?._id,
          });
        }
      } catch (error) {
        console.log("error: receive message");
      }
    });

    socket.on("messageNotification", ({ newMessage, sender }) => {
      // work not completed
      showToast(
        <div className="message-notification">
          <div className="message-notification-name">
            {sender.name || "Unknown"}
          </div>
          <hr />
          <div>{newMessage.text}</div>
        </div>,
        "none",
        "top-center",
        6000
      );
    });

    socket.on("messageStatusChanged", ({ userId, chatId }) => {
      fetchingChats(userId, chatId);
    });

    // socket disconnect
    const handleDisconnect = () => {
      socket.emit("offline", user?._id);
      socket.disconnect();
    };

    // Listen for tab close or refresh
    window.addEventListener("beforeunload", handleDisconnect);

    return () => {
      handleDisconnect(); // Cleanup on component unmount
      window.removeEventListener("beforeunload", handleDisconnect);
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
    if (user?._id && chatWith?._id) {
      socket.emit("messageSeen", {
        senderId: chatWith?._id,
        chatId: user?._id + chatWith?._id,
      });
    }
  }, [chatWith]);

  // Effect to scroll to the bottom of chat messages
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const messageId = generateUniqueId();
      const newMessage = {
        messageId: messageId,
        text: input,
        sender: "You",
        date: new Date(),
        messageDelivered: { status: "panding", date: null },
        messageSeen: { status: "unseen", date: null },
        seenBy: [],
      };

      // socket send message
      socket.emit(
        "send message",
        {
          chatId: chatWith._id,
          user: user,
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
                if (data) {
                  setChatWith(data);
                }
              }}
              className="focused-li"
              tabIndex="0"
            >
              <div>{data.name}</div>
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
                        {message?.sender === "You" && (
                          <div className="message-info-container">
                            <div className="message-info">i</div>
                            <div className="message-info-status">
                              <div className="message-info-status-data">
                                <span>deliver</span>
                                <span>{message.messageDelivered.status}</span>
                              </div>
                              <hr />
                              <div className="message-info-status-data">
                                <span>seen</span>
                                <span>{message.messageSeen.status}</span>
                              </div>
                            </div>
                          </div>
                        )}
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
              ))) || <h2 className="no-chat-diplay">No chats there</h2>}
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
