import { useEffect, useState, useRef } from "react";
import Conversation from "../Components/Conversation";
import FreindProfileChatBar from "../Components/FreindProfileChatBar";
import Messages from "../Components/Messages";
import SendMessage from "../Components/SendMessage";
import { useSelector } from "react-redux";
import { getData } from "../APICALLS";
import { io } from "socket.io-client";

const ChatPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState(null);
  const [messages, setMessages] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [freindDp, setFreindDp] = useState("");
  const [arrivalMessage,setArrivalMessage]=useState(null)
  const socket = useRef();
  const scrollRef = useRef();
  const socketURL = import.meta.env.VITE_APP_SOCKET_API_URL;

  useEffect(() => {
    socket.current = io(socketURL);

    socket.current.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
    });

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const freindId =
      currentChat &&
      currentChat.members.find((m) => m !== currentUser.user._id);
    arrivalMessage &&
      currentChat &&
      currentChat.members.find((user) => user === freindId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat, currentUser.user._id]);

  useEffect(() => {
    socket.current.on("getUsers", (data) => {
      setOnlineUsers(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser.user._id);
  }, [currentUser.user._id]);

  useEffect(() => {
    getData("chat/conversation/" + currentUser.user._id).then((data) => {
      setConversations(data.conversation);
    });
  }, []);

  useEffect(() => {
    currentChat &&
      getData("chat/messages/" + currentChat._id).then((data) => {
        setMessages(data.messageList);
      });
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-60px)]">
      <div
        className={`${
          currentChat ? " hidden sm:block" : "sm:w-1/3 w-full mx-auto sm:mx-0"
        }
      flex flex-col w-1/3  gap-2 pt-2 bg-[#FFFFFF]`}
      >
        {conversations?.map((conversation) => (
          <div
            onClick={() => setCurrentChat(conversation)}
            key={conversation._id}
          >
            <Conversation
              conversation={conversation}
              userId={currentUser.user._id}
              setFreindDp={setFreindDp}
              onlineUsers={onlineUsers}
            />
          </div>
        ))}
      </div>
      <div
        className={`${currentChat ? "sm:w-2/3 w-full" : "hidden sm:flex w-2/3"}
        flex flex-col  overflow-hidden bg-mobileImg sm:bg-desktopImg`}
      >
        <div className="flex-grow overflow-auto ">
          {currentChat && <FreindProfileChatBar onlineUsers={onlineUsers}
          currentChat={currentChat} 
          userId={currentUser.user._id}/>}
          {messages &&
            messages.map((m) => (
              <div className="pt-[60px]"
               ref={scrollRef} key={m._id}>
                <Messages
                  own={m.sender === currentUser.user._id}
                  message={m}
                  userDp={currentUser.user.profilePicture}
                  freindDp={freindDp}
                />
              </div>
            ))}
          {!currentChat && (
            <p className="p-5 text-dark-grey lg:text-3xl md:text-2xl sm:text-xl">
              Open Conversation to Start a Chat
            </p>
          )}
        </div>
        {currentChat && (
          <SendMessage currentChat={currentChat} setMessages={setMessages} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
