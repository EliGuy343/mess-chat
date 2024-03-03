import Chat from "@models/Chat";
import Message from "@models/Message";
import { connectToDB } from "@mongodb";

export const POST = async () => {
  try {
    await connectToDB();
    const body = req.json()
    const {chatId, currentUserId, text, photo} = body;
    
    const newMessage = await Message.create({
      chat:chatId,
      sender: currentUserId,
      text,
      photo,
      seenBy: currentUserId
    });

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {Message: newMessage._id},
        $set: {lastMessageAt: newMessage.createdAt},
      },
      {new: true}
    ).populate({
      path: "messages",
      model: Message,
      populate: {path: "sender seenBy", model: "User"}
    })
    .populate({
      path: "members",
      model: "User"
    })
    .exec();
    return new Response(JSON.stringify(newMessage), {status:200});
  } catch (err) {
    return new Response("Internal Server Error", {status: 500});
  }
}