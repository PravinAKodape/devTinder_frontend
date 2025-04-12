import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import createSocketConnection from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { toUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [newMessage, setNewMessage] = useState();
  const [message, setMessage] = useState([]);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, toUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessage(message =>[...message, { name : firstName, text : text }]);
    });

    return () => {
      socket.disconnect(); // when component unmount
    };
  }, [userId, toUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      toUserId,
      text: newMessage,
    });
    setNewMessage("")
  };

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

useEffect(() => {
  // Scroll to bottom on new message
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [message]); // Runs every time a new message is added

  return (
    <div className="w-full max-w-lg m-auto border border-gray-300 rounded-lg shadow-lg h-[62vh] mt-4">
      <h1 className="text-center font-bold text-3xl py-4 border-b border-gray-300">
        Chat
      </h1>

      <div className="pt-8 px-2  h-full">
        <div className="overflow-auto h-80">
          {message.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                msg.name === user?.firstName ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src={
                      msg.name === user?.firstName
                        ? user.photoUrl
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg.name}
                <time className="text-xs opacity-50 ml-2">{currentTime}</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">
                {msg.name === user?.firstName ? "Delivered" : "Seen"}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center p-6 ">
          <input
            type="text"
            className="w-full p-2 rounded-xl border border-gray-300"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
