import Loading from "@/components/Loading";
import React, { Suspense } from "react";

const layout = ({children}) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default layout;


export async function generateMetadata(){
  return{
    title:"Generate Availability | Schedulla",
    description:"Book Your availability"
  }
}