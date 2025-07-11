"use server";
import db from "@/lib/prisma";
import clerkClient from "@clerk/clerk-sdk-node";
import { auth } from "@clerk/nextjs/server";
import { google } from "googleapis";

const deleteMeeting = async (meetId) => {
  const meeting = await db.booking.findUnique({
    where : {
        id:meetId
    },
    include : {
        user:true,
        event:true
    }
  });
  if(!meeting){
    throw new Error("Meeting not found");
  }

  //getting google api token from clerk                            //clerk user id          //which api      
  const tokens = await clerkClient.users.getUserOauthAccessToken(meeting.user.clerkUserId,"oauth_google");
  const token = tokens[0]?.token;
  if(!token){
    throw new Error("Organizeer not connected with Google Calendar");
  }

  const OAuth2Client = new google.auth.OAuth2();
  OAuth2Client.setCredentials({
    access_token : token
  });
  const cal = google.calendar({
    version:"v3",
    auth:OAuth2Client
  })
  try{
    cal.events.delete({
        calendarId:"primary",
        eventId:meeting.gooleEventId,
        sendNotifications:"all"
    });
  }
  catch(err){
    console.log("Unable to delete meeting from google calendar");
    return{success:false,error:err.message};
  }
  try{
    await db.booking.delete({
        where:{
            id:meeting.id
        }
    })
  }
  catch(err){
    console.log("Unable to delete meeting from database");
    return{success:false,error:err.message};
  }
  return {success:true}
};

export default deleteMeeting;
