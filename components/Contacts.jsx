"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { RadioButtonUnchecked } from "@mui/icons-material";

const Contacts = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const {data: session} = useSession();
  const currentUser = session?.user;

  const getContacts = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      console.log(data);
      setContacts(data.filter((contact) => contact._id !== currentUser._id));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    if(currentUser) {
      getContacts();
    }
  }, [currentUser]);


  return loading ? <Loader/> : (
    <div className="create-chat-container">
      <input placeholder="Search contact..." className="input-search"/>
      <div className="contact-bar">
        <div className="contact-list">
          <p className="text-body-bold">
            Select Or Deselect
          </p>
          {contacts.map((user, index) =>(
            <div className="contact" key={index}>
              <RadioButtonUnchecked/>
              <img src={user.profileImage || "/assets/person.jpg"} className="profilePhoto"/>
              <p className="text-bold-bold">
                {user.username}
              </p>
            </div>
          ))}
        </div>
        <div className="create-chat">
          <button className="btn">
            Start A New Chat
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contacts