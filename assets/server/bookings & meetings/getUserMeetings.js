"use server";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const getUserMeetings = async(type="upcoming") => {
  
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
      //gte->greater than equal to || lt->later than
      startTime : type==="upcoming" ? {gte:now} : {lt:now} 
    },
    include : {
      event : {
        include :{
          user : { 
            select : {
              name : true,
              email : true
            }
          }
        }
      }
    },
    orderBy:{
      startTime : type ==="upcoming" ? "asc":"desc"
    }
  })
  return meetings;
}

export default getUserMeetings;