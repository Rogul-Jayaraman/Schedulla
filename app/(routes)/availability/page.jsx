"use client";

import { defaultAvailability } from "@/assets/data/availability";
import getAvailability from "@/assets/server/availability/getAvailability";
import AvailabilityForm from "@/components/Availability/AvailabilityForm";
import { Description } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

const AvailabilityPage = () => {
  const [availability,setAvailability] = useState()
  useEffect(()=>{
    const fetchAvailability = async() =>{
      setAvailability(await getAvailability())
    }
    fetchAvailability();
  },[])
  return (
    <AvailabilityForm initialData = {availability || defaultAvailability}/>
  )
}

export default AvailabilityPage;