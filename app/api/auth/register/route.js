import User from "@models/User";
import { connectToDB } from "@mongodb";
import { hash } from "bcryptjs";

export const POST = async (req, res) => {
  try {
    await connectToDB();

    const body = await req.json();
    const {username, email, password} = body;
    const existingUser = await User.findOne({email});
    
    if(existingUser) {
      return Response("User Already Exists", {
        status:400,
      })
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();
    return new Response(JSON.stringify(newUser), {status:201});
    
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", {
      status:500,
    });
  }
}