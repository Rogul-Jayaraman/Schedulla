"use server";

import db from "@/lib/prisma";
import { addDays, addMinutes, format, isBefore, parseISO, startOfDay } from "date-fns";

const getEventAvailability = async (eventId) => {
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      //from user table
      user: {
        include: {
          //include field from availability table
          availability: {
            select: {
              timeGap: true,
              Days: true,
            },
          },
          //include field from booking table
          bookings: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  });

  if (!event || !event.user.availability) {
    return [];
  }

  const { availability, bookings } = event.user;

  const startDate = startOfDay(new Date());
  const endDate = addDays(startDate, 30);

  const availabileDates = [];
  for (let date = startDate; date <= endDate; date=addDays(date, 1)) {
    //EEEE -> get day of the date
    const dayOfCurDate = format(date, "EEEE").toUpperCase();
    //filter the available days
    const availableDay = availability.Days.find((d) => {
      return d.day === dayOfCurDate;
    });
    
    if (availableDay) {
      const formatedDate = format(date, "yyyy-MM-dd");
      const availableSlots = generateAvailableSlots(
        availableDay.startTime,
        availableDay.endTime,
        event.duration,
        bookings,
        formatedDate,
        availability.timeGap
      );
      availabileDates.push({ date: formatedDate, availableSlots });
    }
  }
  return availabileDates;
};

export default getEventAvailability;

function generateAvailableSlots(
  startTime,
  endTime,
  duration,
  bookings,
  date,
  timeGap,
) {
  const slots = [];
  let slotStartTime = parseISO(`${date}T${startTime.toISOString().slice(11,16)}`);
  const slotEndTime = parseISO(`${date}T${endTime.toISOString().slice(11,16)}`);
  const today = new Date();

  if(date === format(today,"yyyy-MM-dd")){
    slotStartTime = isBefore(slotStartTime,today)?addMinutes(today,timeGap):slotStartTime;
  }

  while(slotStartTime < slotEndTime){
    const slotEnd = new Date(slotStartTime.getTime()+duration*60000);

    const isSlotAvail = bookings.some(booking => {
      const bookingStart=booking.startTime;
      const bookingEnd=booking.endTime; 
      return(
        (slotStartTime>=bookingStart && slotStartTime<bookingEnd) ||
        (slotEnd>bookingStart && slotEnd<=bookingEnd)||
        (slotStartTime<=bookingStart && slotEnd>=bookingEnd)
      )
    })

    if(!isSlotAvail){
      slots.push(format(slotStartTime,"HH:mm"));
    }
    slotStartTime = slotEnd;
  }
  return slots;
}
