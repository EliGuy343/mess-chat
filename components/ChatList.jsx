"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import Loader from "./Loader";
import ChatBox from "./ChatBox";

const ChatList = ({currentChatId}) => {
  const {data: sessions} = useSession();
  const currentUser = sessions?.user;

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const getChats = async () => {
    try {
      //TODO: Fix Search
      const res = await fetch(search !== "" 
        ?`/api/users/${currentUser._id}/searchChat/${search}` 
        :`/api/users/${currentUser._id}`
      );
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

  }, [currentUser, search]);
  return loading ? <Loader/> : (
    <div className="chat-list">
      <input
        placeholder="search chat..." 
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />
      {chats.map((chat, index) => (
        <ChatBox chat={chat} index={index} currentUser={currentUser} currentChatId={currentChatId}/>
      ))}
    </div>
  )
}

export default ChatList