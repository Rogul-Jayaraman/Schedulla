import db from "../../../lib/prisma";
import { currentUser, clerkClient } from "@clerk/nextjs/server";

export const checkUser = async() =>{
    const user = await currentUser();
    if(!user){
        return null;
    } 
    // db -> will imported from prisma.js
    try{
        // user already logged in return the user 
        const loggedInUser = await db?.user.findUnique({
            where : {
                clerkUserId : user.id
            }
        });
        if(loggedInUser){
            return loggedInUser;
        }

        //if not create a new user
        const name = `${user.firstName} ${user.lastName}`;

        //clerkClient -> User management (get, update, delete users, etc.)
        await clerkClient  //get user(client) instance
            .users?.updateUser  //CURD operation - any -> here update 
            (user.id,{         //retrive the required user by using 
            username : name.split(" ").join("-")+user.id.slice(-4) // last 4 digit of user id 
        })

        //creating a newUser
        const newUser = await db.user.create({  //Adding a new user to database - prisma
            data:{
                clerkUserId : user.id,
                name : name,
                imageURL : user.imageUrl,
                email : user.emailAddresses[0].emailAddress, //for user - clerk allow many emails
                userName : name.split(" ").join("-")+user.id.slice(-4)
            }
        })
        console.log(newUser);
        return newUser;
    }
    catch(err){
        console.log(err);
        return ("User creation or lookup failed.");
    }
}