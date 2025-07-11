import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import getUserMeetings from "@/assets/server/bookings & meetings/getUserMeetings";
import MeetingList from "@/components/Meetings/MeetingList";

const Page = async () => {
  const upcomingMeetings = await getUserMeetings("upcoming");
  const pastMeetings = await getUserMeetings("past");

  return (
    <div>
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <MeetingList meetings={upcomingMeetings} type="upcoming" />
        </TabsContent>

        <TabsContent value="past">
          <MeetingList meetings={pastMeetings} type="past" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
