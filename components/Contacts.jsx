"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Contacts = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [chatName, setChatName] = useState("");

  const router = useRouter(); 

  const {data: session} = useSession();
  const currentUser = session?.user;

  const isGroup = selectedContacts.length > 1;

  const handleSelect = (contact) => {
    if(selectedContacts.includes(contact)) {
      setSelectedContacts(
        prevSelectedContacts => prevSelectedContacts.filter(
          item => item !== contact
      ));
    } else {
      setSelectedContacts(
        prevSelectedContacts => [...prevSelectedContacts, contact]
      );
    }
  }

  const getContacts = async () => {
    try {
      const res = await fetch(search !== "" ? `/api/users/searchContacts/${search}` : '/api/users');
      const data = await res.json();
      console.log(data);
      setContacts(data.filter((contact) => contact._id !== currentUser._id));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const createChat = async () => {
    const res = await fetch("/api/chats",{
      method:"POST",
      body: JSON.stringify({
        currentUserId: currentUser._id,
        members: selectedContacts.map((contact) => contact._id),
        isGroup,
        name:chatName
      })
    });
    const chat = await res.json();
    if(res.ok) {
      router.push(`/chats/${chat._id}`);
    }
  }
  
  useEffect(() => {
    if(currentUser) {
      getContacts();
    }
  }, [currentUser, search]);


  return loading ? <Loader/> : (
    <div className="create-chat-container">
      <input
        placeholder="Search contact..."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="contact-bar">
        <div className="contact-list">
          <p className="text-body-bold">
            Select Or Deselect
          </p>
          {/*TODO: FIX THIS MESS LATER */}
          {/*TODO: Don't display all contacts. Imagine if you have 5000 users on this thing
           are you going to display all of them? that's stupid. */}
          {contacts.map((user, index) =>(
            <div className="contact" key={index} onClick={() => handleSelect(user)}>
              {selectedContacts.find(item => item === user) ? (
                <CheckCircle sx={{color: "red"}}/>
              ) : (
                <RadioButtonUnchecked/>
              )}
              <img src={user.profileImage || "/assets/person.jpg"} className="profilePhoto"/>
              <p className="text-bold-bold">
                {user.username}
              </p>
            </div>
          ))}
        </div>
        <div className="create-chat">
          {isGroup && (
            <>
              <div className="flex flex-col gap-3">
                <p className="text body-hold">Group Chat Name</p>
                <input
                  placeholder="Enter group chat name..."
                  className="input-group-name"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Members</p>
                <div className="flex flex-wrap">
                  {selectedContacts.map((contact,index) =>(
                    <p className="selected-contact" key={index}>
                      {contact.username}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
          <button className="btn" onClick={createChat}>
            Start A New Chat
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contacts