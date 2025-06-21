"use server";

import { eventSchema } from "@/assets/data/validators";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

const createEvent = async(data) => {
    const{userId} = await auth(); //data from clerk

    if(!userId){
        throw new Error("Unauthorized");
    }

    const validatedDate =  eventSchema.parse (data)  //extra optional - check data is correct formatt

    const user = await db.user.findUnique({
        where : {clerkUserId : userId}
    })

    if(!user){
        throw new Error("User not found");
    }
    const event  = await db.event.create({
        data: {

            ...validatedDate,

            userId : user.id  // -> where the userId - event modal & user.id -> usermodal unique id
        }
    });
    return event;
}

export default createEvent