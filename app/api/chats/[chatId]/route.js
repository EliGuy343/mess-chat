import Chat from "@models/Chat";
import Message from "@models/Message";
import User from "@models/User";
import { connectToDB } from "@mongodb";

export const GET = async (req, {params}) => {
  const {chatId} = params;
  try {
    await connectToDB();
    const chat = await Chat.findById(chatId)
      .populate({
        path:"members",
        model: User,
      })
      .populate({
        path:"messages",
        model:Message,
        populate: {
          path: "sender seenby",
          model: User
        }
      })
      .exec();

    return new Response(JSON.stringify(chat), {status: 200});
  } catch (err) {
    console.log(err);
    return new Response("Failed to get chat details", {status: 500});
  }
}