"use server";

const { default: db } = require("@/lib/prisma");

const fetchEventDetail = async (userName, id) => {
  const event = db.event.findUnique({
    where: {
      id,
      user: {
        userName,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          userName:true,
          email: true,
          imageURL: true,
        },
      },
    },
  });
  return event;
};
export default fetchEventDetail;
