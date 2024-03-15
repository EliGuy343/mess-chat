import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

console.log(process.env.PUSHER_KEY)
console.log(process.env.PUSHER_APP_ID)
console.log(process.env.PUSHER_SECRET)
export const pusherServer = new PusherServer({
  appId: "1772073",
  key: "b5508f08586e2e2c8068",
  secret: "506ea5c36455c69d84f4",
  cluster: "us2",
  useTLS: true
})

export const pusherClient = new PusherClient(
  "b5508f08586e2e2c8068",
  {
    cluster: "us2"
  }
);