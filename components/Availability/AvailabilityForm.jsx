"use client";

import { daysOfWeek, timeSlots } from "@/assets/data/availability";
import { availabilitySchema } from "@/assets/data/validators";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm, useWatch } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useFetch from "@/assets/hooks/useFetch";
import updateAvailability from "@/assets/server/availability/updateAvailability";

const AvailabilityForm = ({ initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: initialData,
    shouldUnregister: false,
  });

  const{loading,data,error,fn:fnUpdateAvailability } = useFetch(updateAvailability)

  const submit = async(data) =>{
    await fnUpdateAvailability(data);
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      {daysOfWeek.map((day) => {
        const isAvail = useWatch({
          control,
          name: `${day}.isAvailable`,
        });

        return (
          <div
            key={day}
            className="flex items-center gap-2 md:gap-5 lg:gap-7 mb-4"
          >
            <Controller
              name={`${day}.isAvailable`}
              control={control}
              render={(field) => {
                return (
                  <Checkbox
                    className="bg-teal-900"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      const isChecked = checked === true;
                      if (isChecked) {
                        setValue(`${day}.startTime`, "09:00");
                        setValue(`${day}.endTime`, "17:00");
                      }
                      setValue(`${day}.isAvailable`, isChecked);
                    }}
                  />
                );
              }}
            />
            <span className="capitalize w-24">{day}</span>
            <div className="flex gap-2 md:gap-5 lg:gap-6 lg:ml-10 items-center my-1">
              {isAvail && (
                <Controller
                  name={`${day}.startTime`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-23 ">
                          <SelectValue placeholder="Start Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => {
                            return (
                              <SelectItem value={slot} key={slot}>
                                {slot}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                        {errors[day]?.startTime && (
                          <span className="text-red-800 tex-sm mt-1">
                            {errors[day].startTime.message}
                          </span>
                        )}
                      </Select>
                    );
                  }}
                />
              )}
              {isAvail && <span>to</span>}
              {isAvail && (
                <Controller
                  name={`${day}.endTime`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-23">
                          <SelectValue placeholder="End Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => {
                            return (
                              <SelectItem value={slot} key={slot}>
                                {slot}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              )}
              {errors[day]?.endTime && (
                <span className="text-red-800 tex-sm mt-1">
                  {errors[day].endTime.message}
                </span>
              )}
            </div>
          </div>
        );
      })}
      <div className="flex items-center space-x-4">
        <span className="w-48 mt-3">
          Minimum gap before booking (minutes) :{" "}
        </span>
        <Input
          type="number"
          {...register("timeGap", { valueAsNumber: true })}
          className="w-15"
        />
      </div>
      {errors.timeGap && (
        <span className="text-red-800 tex-sm mt-1">
          {errors.timeGap.message}
        </span>
      )}
      <Button type="submit" className="mt-5 cursor-pointer" disabled={loading}>
        {loading ? "Updating . . ." : "Update Availability"}
      </Button>
    </form>
  );
};

export default AvailabilityForm;
