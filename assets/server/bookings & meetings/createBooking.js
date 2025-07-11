"use server"
import db from "@/lib/prisma";
import { getUserOauthAccessToken } from "@clerk/backend";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { google } from "googleapis";
const createBooking = async (bookingData) => {
  try {
    const event = await db.event.findUnique({
      where: {
        id: bookingData.eventId,
      },
      include: {
        user: true,
      },
    });
    if (!event) {
      throw new Error("Event Not Found");
    }

    //google calender api
    const tokens = await clerkClient.users.getUserOauthAccessToken(
      event.user.clerkUserId,
      "oauth_google"
    );
    const token = tokens[0]?.token;
    if (!token) {
      throw new Error("Event creator has not connected Google Calendar");
    }
    //Set up Google OAuth client
    const oauthClient = new google.auth.OAuth2();
    oauthClient.setCredentials({ access_token: token });
    //get calendar api & insert meet details into the calendar api
    const cal = google.calendar({ version: "v3", auth: oauthClient });
    const meet = await cal.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `${bookingData.name} - ${event.title}`,
        description: bookingData.additionalInfo,
        start: { dateTime: bookingData.startTime },
        end: { dateTime: bookingData.endTime },
        attendees: [{ email: bookingData.email }, { email: event.user.email }],
        conferenceData: {
          createRequest: { requestId: `${event.id}-${Date.now()}` },
        },
      },
    });
    const meetLink = meet.data.hangoutLink;
    const googleEventId = meet.data.id;

    const booking = await db.booking.create({
      data: {
        eventId: event.id,
        userId: event.user.id,
        name: bookingData.name,
        email: bookingData.email,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        additionalInfo: bookingData.additionalInfo,
        meetLink,
        googleEventId,
      },
    });
    return { success: true,meetLink };
  } catch (err) {
    console.error("Error while creating Booking : ", err);
    return { success: false, error: err.message };
  }
};

export default createBooking;
