import getEventAvailability from "@/assets/server/eventsHandler/getEventAvailability";
import fetchEventDetail from "@/assets/server/eventsHandler/getEventDetail";
import BookingForm from "@/components/Event/Booking/BookingForm";
import EventDetails from "@/components/Event/EventDetails";
import Loading from "@/components/Loading";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const page = async ({ params }) => {
  const { user: userName, event: id } = await params;
  const event = await fetchEventDetail(userName, id);
  const availability=await getEventAvailability(id);
  if(!event){
    return notFound()
  }
  return (
    <div className="flex flex-col items-center md:items-start justify-center md:flex-row ">
      <EventDetails event={event}/>
      <Suspense fallback={<Loading />}>
        <BookingForm event={event} availability={availability}/>
      </Suspense>
    </div>
  );
};

export default page;

export async function generateMetadata({ params }) {
  const { user: userName, event: id } = await params;
  const event = await fetchEventDetail(userName, id); 

  if (!event) {
    return {
      title: "Event Not Found | Schedulla",
      description:
        "The event you're looking for doesn't exist, may have been removed, or is currently unavailable.",
    };
  }

  return {
    title: `${event.title} | Schedulla Event`,
    description: `Discover details and reserve your spot for the event "${event.title}". Stay connected and explore exciting opportunities.`,
  };
}
