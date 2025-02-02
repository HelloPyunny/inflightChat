const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // 로컬 네트워크 내 어디서든 접속 가능하도록 설정
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.static("public")); // 정적 파일 제공 (React 클라이언트 연동 시 필요)

io.on("connection", (socket) => {
  console.log("새로운 사용자 연결:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("메시지 수신:", msg);
    io.emit("chat message", msg); // 모든 클라이언트에게 메시지 전달
  });

  socket.on("disconnect", () => {
    console.log("사용자 연결 해제:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
