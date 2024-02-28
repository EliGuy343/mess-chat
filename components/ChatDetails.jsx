import { useEffect, useState } from "react";
import Loader from "./Loader";
import Link from "next/link";


const ChatDetails = ({chatId}) => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});
  const [otherMembers, setOtherMembers] = useState([]);

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
          <Link>
            <img
              src={chat?.groupPhoto || "/assets/group.png"}
              alt=""
              className="profilePhoto"
            />
            <div className="text">
              <p>
                {chat?.name} &#160; &#183; &#160; {chat?.members?.length}
              </p>
            </div>
          </Link>
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
    </div>
  );
};

export default ChatDetails