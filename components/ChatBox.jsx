import {format} from 'date-fns';
const ChatBox = ({chat, currentUser}) => {
  const otherMembers = chat?.members?.filter(
    (member) => member._id !== currentUser._id
  );
  const lastMessage = chat?.messages?.length > 0
    && chat?.messages[chat?.messages.length - 1];
  return (
    <div className="chat-box">
      <div className="chat-info">
        {chat?.isGroup ? (
          <img 
            src={chat?.groupPhoto || "/assets/group.jpg"}
            alt="group-pic"
            className="profilePhoto"
          />
        ) : (
          <img
            src={otherMembers[0].profilePhoto||"/assets/person.jpg"}
            alt=""
            className="profilePhoto"
          />
        )}
        <div className="flex flex-col gap-1">
          {chat?.isGroup ? (
            <p className="text-base-bold">{chat?.name}</p>
          ) : (
            <p className="text-base-bold">{otherMembers[0]?.username}</p>
          )}
        </div>
        <p className="text-base-light text-gray-3">
          {!lastMessage && format(new Date(chat?.createdAt), "p")}
        </p>
      </div>
    </div>
  )
}
export default ChatBox