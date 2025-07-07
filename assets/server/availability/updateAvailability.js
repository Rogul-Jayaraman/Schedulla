"use server";

import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const updateAvailability = async (data) => {
  const { userId } = await auth();

  const user = await db.user.findFirst({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const availabilityData = Object.entries(data).flatMap(
    ([day, { isAvailable, startTime, endTime }]) => {
      if (isAvailable) {
        const baseDate = new Date().toISOString().split("T")[0];
        return [
          {
            day: day.toUpperCase(),
            isAvailable: isAvailable,
            startTime: new Date(`${baseDate}T${startTime}:00Z`),
            endTime: new Date(`${baseDate}T${endTime}:00Z`),
          },
        ];
      }
      return [];
    }
  );
  
  const existingAvailability = await db.availability.findUnique({
    where: { userId: user.id },
  });

  if (existingAvailability) {
    //user availability exists
    await db.availability.update({
      where: {
        id: existingAvailability.id,
      },
      data: {
        timeGap: data.timeGap,
        Days: {
          deleteMany: {}, //delete all days
          create: availabilityData,
        },
      },
    });
  } else {
    //no availability for the current user
    await db.availability.create({
      data: {
        userId: user.id,
        timeGap: data.timeGap,
        Days: {
          create: availabilityData,
        },
      },
    });
  }

  return { success: true };
};
export default updateAvailability;
