import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const fetchEvent = async () => {
  const { userId } = await auth();

  if (!userId) {
    //user not logged in
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const events = await db.event.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });
  return {events, userName : user.userName};
};

export default fetchEvent;
