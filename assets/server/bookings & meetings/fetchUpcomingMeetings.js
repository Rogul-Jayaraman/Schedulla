"use server"
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const fetchUpcomingMeetings = async() => {
const {userId} = await auth();
  if(!userId){
    throw new Error("Unauthorized");
  }
  const user = await db.user.findUnique({
    where : {
      clerkUserId : userId
    }
  });
  if(!user){
    throw new Error("User not found");
  }
  const now = new Date();
  const meetings = await db.booking.findMany({
    where : {
      userId : user.id,
      startTime : {gte:now}
    },
    include : {
      event : {
        select :{title:true}
      }
    },
    orderBy:{
      startTime : "asc"
    },take:3,
  })
  return meetings;
}

export default fetchUpcomingMeetings