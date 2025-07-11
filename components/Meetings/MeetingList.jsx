"use client";
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock, Trash, Video } from "lucide-react";
import { Button } from "../ui/button";
import useFetch from "@/assets/hooks/useFetch";
import deleteMeeting from "@/assets/server/bookings & meetings/deleteMeeting";
import { useRouter } from "next/navigation";

const MeetingList = ({ meetings, type }) => {
  const router = useRouter();
  const [cancelMeetId, setCancelMeetId] = useState(null);
  const { loading, data, fn: fnDeleteMeeting } = useFetch(deleteMeeting);

  const handleCancelMeeting = async (meetId) => {
    setCancelMeetId(meetId);
    if (window.confirm("Are sure you want to cancel this meeting ?")) {
      fnDeleteMeeting(meetId);
      router.refresh();
    }
  };

  if (meetings.length === 0) {
    return <p> No {type} meetings found</p>;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => (
        <Card key={meeting.id} className={"flex flex-col justify-between"}>
          <CardHeader>
            <CardTitle>{meeting.event.title}</CardTitle>
            <CardDescription>with {meeting.name}</CardDescription>
            <CardDescription>
              &quot;{meeting.additionalInfo}&quot;
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex text-gray-600 items-center mb-2">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="text-sm">
                {format(new Date(meeting.startTime), "MMMM d,yyyy")}
              </span>
            </div>
            <div className="flex text-gray-600 items-center mb-2">
              <Clock className="mr-2 h-4 w-4" />
              <span className="text-sm">
                {format(new Date(meeting.startTime), "h:mm a")} -{" "}
                {format(new Date(meeting.endTime), "h:mm a")}
              </span>
            </div>
            <div className="flex text-gray-600 items-center mb-2">
              {meeting.meetLink && (
                <div className="flex items-center">
                  <Video className="mr-2 h-4 w-4" />
                  <a
                    href={meeting.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 text-sm hover:underline"
                  >
                    Join Meeting
                  </a>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="destructive"
              disabled={cancelMeetId === meeting.id && loading}
              onClick={() => handleCancelMeeting(meeting.id)}
            >
              {cancelMeetId === meeting.id && loading
                ? "Cancelling..."
                : "Cancel"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MeetingList;
