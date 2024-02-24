"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import Loader from "./Loader";
import ChatBox from "./ChatBox";

const ChatList = () => {
  const {data: sessions} = useSession();
  const currentUser = sessions?.user;

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    try {
      const res = await fetch(`/api/users/${currentUser._id}`);
    const data = await res.json();
    setChats(data);
    setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(currentUser) {
      getChats()
    }

  }, [currentUser]);
  return loading ? <Loader/> : (
    <div className="chat-list">
      <input placeholder="search chat..." className="input-search" />
      {chats.map((chat, index) => (
        <ChatBox chat={chat} index={index} currentUser={currentUser}/>
      ))}
    </div>
  )
}

export default ChatList