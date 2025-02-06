import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { SERVER_URL } from "./config"; // 서버 URL 가져오기

const socket = io(SERVER_URL);

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <div>
      <h2>실시간 채팅</h2>
      <div style={{ height: "200px", overflowY: "scroll", border: "1px solid black" }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>보내기</button>
    </div>
  );
}

export default Chat;
