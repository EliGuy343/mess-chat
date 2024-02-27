import { useState } from "react";


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
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div>ChatDetails</div>
  )
}

export default ChatDetails