"use client"

import { useEffect, useState } from "react";
import Loader from "./Loader";
import Link from "next/link";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useSession } from "next-auth/react";

const ChatDetails = ({chatId}) => {
  const {data: session} = useSession();
  const currentUser = session?.user;

  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});
  const [otherMembers, setOtherMembers] = useState([]);
  const [text, setText] = useState("");

  const getChatDetails = async () => {
    try {
      const res = await fetch(
        `/api/chats/${chatId}`,
        {
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          }
      });
      const data = await res.json();
      setChat(data);
      setOtherMembers(data?.members?.filter(member => member._id !== currentUser._id));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(currentUser && chatId) {
      getChatDetails();
    }
  }, [currentUser, chatId])
  return loading ? <Loader/> : (
    <div className="chat-details">
      <div className="chat-header">
        {chat?.isGroup ? (
          <>
            <Link href={`/chats/${chatId}/group-info`}>
              <img
                src={chat?.groupPhoto || "/assets/group.png"}
                alt=""
                className="profilePhoto"
              />
            </Link>
            <div className="text">
              <p>
                {chat?.name} &#160; &#183; &#160; {chat?.members?.length} members
              </p>
            </div>
          </>
        ) : (
          <>
            <img
              src={otherMembers[0].profileImage || "/assets/person.jpg"}
              alt=""
              className="profilePhoto"
            />
            <div className="text">
              <p>{otherMembers[0].username}</p>
            </div>
          </>
        )}
      </div>

      <div className="chat-body"></div>

      <div className="send-message">
        <div className="prepare-message">
          <AddPhotoAlternate 
            sx={{
              fontSize:"35px",
              color:"#737373",
              cursor:"pointer",
              "&.hover":{
                color:"red"
              }
            }}
          />
          <input
            type="text"
            placeholder="type a message..."
            value={text}
            className="input-field"
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <img src="/assets/send.jpg" alt="send" className="send-icon"/>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails