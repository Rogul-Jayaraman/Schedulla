// "use server";

// import { auth } from "@clerk/nextjs/server";

// const deleteMeetings = async(id) => {
//     const {userId} = await auth();
//     if(!userId){
//         throw new Error("Unauthorized");
//     }
    
//     const user = await db.user.findUnique({
//         where : {
//             clerkUserId : userId
//         }
//     })
//     if(!user){
//         throw new Error("User not Found");
//     }
//     return {success : true}
// }

// export default deleteMeetings;