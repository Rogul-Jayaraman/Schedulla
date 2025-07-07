"use server"

const { default: db } = require("@/lib/prisma");
const { auth } = require("@clerk/nextjs/server")

const getAvailability = async() => {
    const {userId} = await auth();
    if(!userId){
        throw new Error("Unauthorized");
    }

    const user = await db.user.findFirst({
        where : {
            clerkUserId : userId
        },
        include : {
            availability :{
                include : {
                    Days : true
                }
            }
        }
    });
    if(!user || !user.availability){
        return null;
    }

    const availabilityData = {
        timeGap :user.availability.timeGap,
    };
    
    [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
    ].forEach((day)=>{
        const daysAvailability = user.availability.Days.find((d)=>{
            return d.day === day.toUpperCase()
        })

        availabilityData[day] = {
            isAvailable : !!daysAvailability,
            startTime : daysAvailability ? daysAvailability.startTime.toISOString().slice(11,16) : "09:00",
            endTime : daysAvailability ? daysAvailability.startTime.toISOString().slice(11,16) : "17:00" 
        }
    })
    return availabilityData;
}

export default getAvailability;