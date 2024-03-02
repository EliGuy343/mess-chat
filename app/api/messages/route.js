import { connectToDB } from "@mongodb";

export const POST = async () => {
  try {
    await connectToDB();
    const body = req.json()
    const {chatId, currentUserId, text, photo} = body;
  
  } catch (error) {
    
  }
}