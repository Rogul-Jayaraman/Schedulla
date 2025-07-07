"use server";
const { default: db } = require("@/lib/prisma");

const getUser = async(userName) => {
    const user = await db.user.findFirst({
        where :{userName},
        select :{
            id:true,
            name:true,
            email:true,
            imageURL:true,
            events:{
                where:{
                    isPrivate:false,
                },
                orderBy:{
                    createdAt:"desc"
                },
                select:{
                    id:true,
                    title:true,
                    description:true,
                    duration:true,
                    isPrivate:true,
                    _count:{
                        select:{bookings:true},
                    }
                }
            },

        }
    })
    return user;
}
export default getUser;