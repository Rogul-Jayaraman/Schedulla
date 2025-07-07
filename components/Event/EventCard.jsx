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
import { Button } from "../ui/button";
import { Link, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useFetch from "@/assets/hooks/useFetch";
import deleteEvent from "@/assets/server/eventsHandler/deleteEvent";

const EventCard = ({ event, username, isPrivate = true }) => {

    const [isCopied, setIsCopied] = useState(false);
    const router = useRouter();

    const handleCopy = async() =>{
        try{
            await navigator.clipboard.writeText(`${window.location.origin}/${username}/${event.id}`)
            setIsCopied(true);
            setTimeout(()=>{
                setIsCopied(false)
            },2000);
        }
        catch(err){
            console.error("Failed to copy : ",err);
        }
    }
    
    const {loading, data, error, fn:fnDeleteEvent} = useFetch(deleteEvent);
    const handleDelete = async() =>{
        if(window.confirm("Are you sure you want to delete this event ?")){
            fnDeleteEvent({eventId : event.id});
            router.refresh();
        }
    }
    
    const handleCardClick = (e) =>{
      if(e.target.tagName !== "BUTTON" && e.target.tagName!=="SVG"){
        window.open(`${window?.location.origin}/${username}/${event.id}`,"_blank");
      }
    }

  return (
    <Card className="flex flex-col justify-between cursor-pointer" onClick={handleCardClick}>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription className="flex justify-between">
          <span>
            {event.duration} minutes | {event.isPrivate ? "Private" : "Public"}
          </span>
          <span>Bookings : {event._count.bookings}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{event.description}</p>
      </CardContent>

      {isPrivate && (
        <CardFooter className="flex gap-4">
          <Button variant={"outline"} className="flex items-center" onClick = {handleCopy}>
            <Link className="mr-1 h-4 w-4" />
            {isCopied ? "Copied" : "CopyLink"}
          </Button>
          <Button variant={"destructive"} className="flex items-center" onClick ={handleDelete}>
            <Trash2 className="mr-1 h-4 w-4" />
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EventCard;
