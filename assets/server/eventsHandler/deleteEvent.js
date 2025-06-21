"use server"

import { auth } from '@clerk/nextjs/server'
import db from '@/lib/prisma';

const deleteEvent = async({eventId}) => {
    const {userId} = await auth();
    if(!userId){
        throw new Error("Unauthorized");
    }
    
    const user = await db.user.findUnique({
        where : {
            clerkUserId : userId
        }
    })
    if(!user){
        throw new Error("User not Found");
    }

    const event = await db.event.findUnique({
        where : {id : eventId}
    })
    if(!event || event.userId !== user.id){
        throw new Error("Event not Found or Unauthorized");
    }

    await db.event.delete({
        where : {
            id : eventId
        }
    })
    return {success : true}
}

export default deleteEvent