import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Contacts = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const {data: session} = useSession();
  const currentUser = session?.user;

  const getContacts = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
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


  return (
    <div className="create-chat-container">
      <input placeholder="Search contact..." className="input-search"/>
    </div>
  )
}

export default Contacts