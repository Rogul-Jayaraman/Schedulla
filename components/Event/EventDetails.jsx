import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";

const EventDetails = ({ event }) => {
  const { user } = event;
  return (
    <div className="px-20 py-10 h-full bg-white">
      <div className="flex items-center gap-3 mb-5">
        <Avatar className="w-12 h-12 mt-1">
          <AvatarImage src={user.imageURL} alt={user.name} />
          <AvatarFallback>{`${user.name.split(" ")[0].charAt(0)}${user.name
            .split(" ")[1]
            ?.charAt(0)}`}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm font-bold text-gray-500">@{user.userName}</p>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-1 text-gray-700">{event.title}</h1>
      <div className="flex items-center mb-1">
        <Clock size={15} className="mr-1 text-sm" />
        <span className="text-sm">{event.duration} minutes</span>
      </div>
      <div className="flex items-center mb-3">
        <Calendar size={15} className="mr-1 " />
        <span className="text-sm">Google Meet</span>
      </div>
      <p className="font-semibold text-gray-700">{event.description}</p>
    </div>
  );
};

export default EventDetails;
