import getUser from "@/assets/server/user/getUser";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";
import EventCard from "@/components/Event/EventCard";

const page = async ({ params }) => {
  const { user: userName } = await params;
  const user = await getUser(userName);
  if (!user) {
    return notFound();
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={user.imageURL} alt={user.name} />
          <AvatarFallback>{`${user.name.split(" ")[0].charAt(0)}${user.name
            .split(" ")[1]
            ?.charAt(0)}`}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-3">{user.name}</h1>
        <p className="text-gray-700 text-center mb-10">
          Welcome to my Schedulla Page. Please select the an event below to book
          a call with me...
        </p>
      </div>
      {user.events.length === 0 ? (
        <p>No public events available at the moment.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {user.events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              username={userName}
              isPrivate={event.isPrivate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;

//metadata -> data or the title appears at tab like->Schedulla
export async function generateMetadata({ params }) {
  const { user: userName } = await params;
  const user = await getUser(userName);

  if (!user) {
    return {
      title: "User Not Found | Schedulla",
      description: "The user you are looking for does not exist or may have been removed.",
    };
  }

  return {
    title: `${user.name} | Schedulla Profile`,
    description: `Explore and book events hosted by ${user.name}. Discover available public schedules and connect seamlessly.`,
  };
}
