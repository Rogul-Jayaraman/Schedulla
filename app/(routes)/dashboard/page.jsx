"use client";

import { usernameSchema } from "../../../assets/data/validators";
import { updateUserName } from "../../../assets/server/user/updateUserName";
import useFetch from "../../../assets/hooks/useFetch";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const page = () => {
  const { isLoaded, user } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  useEffect(() => {
    setValue("username", user?.username);
  }, [isLoaded]);

  const [origin, setOrigin] = useState("");
  
  useEffect(()=>{
    if(window){
      setOrigin(window.location.origin)
    }
  },[])

  const{loading,data,error,fn:fnUpdateUser} = useFetch(updateUserName);

  const onSubmit = async(data) => {
    fnUpdateUser(data.username)
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.fullName}</CardTitle>
        </CardHeader>
        {/* Latest Updates */}
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          {/* react-hook-form  zod->validation  */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span>{origin}</span>
                <Input {...register("username")} placeholder="username"></Input>
              </div>
              {errors.username && 
                <p className="text-red-800 tex-sm mt-1">
                  {errors.username.message}
                </p>
              }
              {error &&
              <p className="text-red-800 tex-sm mt-1">
                  {error.message}
                </p>
              }
            </div>
            {loading && <BarLoader width={"100%"} color="rgb(0, 137, 123)"     />}
            <Button variant={"default_1"}>Update username</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
