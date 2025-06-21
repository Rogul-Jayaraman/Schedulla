"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { eventSchema } from "@/assets/data/validators";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/assets/hooks/useFetch";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import createEvent from "../../assets/server/eventsHandler/createNewEvent";

const EventForm = ({ onSubmitForm }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: 30,
      isPrivate: true,
    },
  });

  const { loading, data, error, fn: fnCreateEvent } = useFetch(createEvent);

  const onSubmit = async (data) => {
    const eventDuration = parseInt(data.eventDuration);
    data.eventDuration = eventDuration;
    await fnCreateEvent(data);
    if (!loading && !error) onSubmitForm();
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-5 flex flex-col gap-4"
    >
      {/* title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Event Title
        </label>
        <Input id="title" {...register("title")} className="mt-2" />
        {errors.title && (
          <p className="text-red-800 tex-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <Input id="description" {...register("description")} className="mt-2" />
        {errors.description && (
          <p className="text-red-800 tex-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Event Duration */}
      <div>
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700"
        >
          Event Duration (minutes)
        </label>
        <Input
          id="duration"
          {...register("duration", { valueAsNumber: true })}
          className="mt-2"
        />
        {errors.duration && (
          <p className="text-red-800 tex-sm mt-1">{errors.duration.message}</p>
        )}
      </div>

      {/* Private */}
      <div>
        <label
          htmlFor="isPrivate"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Event Privacy
        </label>
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => {
            const { value, onChange } = field;
            return (
              <Select
                value={value ? "true" : "false"}
                onValueChange={(value) => onChange(value === "true")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Privacy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">Private</SelectItem>
                    <SelectItem value="false">Public</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }}
        />
        {errors.isPrivate && (
          <p className="text-red-800 tex-sm mt-1">{errors.isPrivate.message}</p>
        )}
        {error && <p className="text-red-800 tex-sm mt-1">{error.message}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting" : "Create Event"}
      </Button>
    </form>
  );
};

export default EventForm;
