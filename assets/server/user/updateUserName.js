"use server";

import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
 
export async function updateUserName(username) {
    const{ userId } = await auth();
    const imageURL = await userId.image_url;
    console.log(imageURL)

    if(!userId){  //user not logged in
        throw new Error("Unauthorized");
    }

    const existingUserName = await db.user.findFirst({ //
        where : {userName : username}
    });

    if(existingUserName && existingUserName.id != userId){
        throw new Error("Username Already Taken");
    }

    await db.user.update({
        where : {
            clerkUserId : userId
        },
        data : {
            userName : username,
            imageURL
        }
    })

    return {success : true}
}
