"use client";
import "react-day-picker/style.css";
import { bookingSchema } from "@/assets/data/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import useFetch from "@/assets/hooks/useFetch";
import createBooking from "@/assets/server/bookings & meetings/createBooking";

const BookingForm = ({ event, availability }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

  const availableDays = availability.map((avail) => new Date(avail.date));

  const selectedFormatted = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;
  const selectedDayAvailability = availability.find(
    (day) => day.date === selectedFormatted
  );

  const timeSlots = selectedDayAvailability?.availableSlots || [];
  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate]);
  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime]);

  const submitForm = async (data) => {
    if (!selectedDate || !selectedTime) {
      console.error("Date or Time is not selected");
      return;
    }
    const startTime = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
    );
    const endTime = new Date(startTime.getTime() + event.duration * 60000);
    const bookingData = {
      eventId: event.id,
      name: data.name,
      email: data.email,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: data.additionalInfo,
    };

    await fnCreateBooking(bookingData);
  };
  
  if (data?.success) {
    console.log(data);
    return (
      <div className=" text-center p-10 border bg-white">
        <h2 className="text-2xl font-bold mb-4">Booking Sucessfull! </h2>
        {data.meetLink && (
          <p>
            Join the meeting : <a
            href={data.meetLink}
            target="_blank"
            className="text-teal-500 hover-underline">{data.meetLink}</a>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-8 border bg-white">
      <div className="lg:h-96 flex items-center md:items-start flex-col lg:flex-row gap-10">
        <div>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{
              available: availableDays,
            }}
            modifiersStyles={{
              available: {
                background: "#14B8A633",
                borderRadius: 100,
              },
            }}
          />
        </div>
        <div className="w-full h-full md:overflow-scroll no-scrollbar">
          {selectedDate && timeSlots.length > 0 ? (
            <div>
              <h2 className="mb-5 mt-2 font-semibold text-teal-900">
                Available Time Slots
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    onClick={() => {
                      setSelectedTime(slot);
                    }}
                    variant={selectedTime === slot ? "default_1" : "outline"}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center px-10 lg:px-0 md:px-5 lg:mt-5 ">
              <h1 className="text-md text-teal-700 font-semibold">
                No time slots are available on the selected date. Please explore
                other dates for availability.
              </h1>
            </div>
          )}
        </div>
      </div>
      {selectedTime && (
        <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
          <div>
            <Input {...register("name")} placeholder="Your Name" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Textarea
              {...register("additionalInfo")}
              placeholder="Additional Information"
            />
            {errors.additionalInfo && (
              <p className="text-red-500 text-sm">
                {errors.additionalInfo.message}
              </p>
            )}
          </div>
          <Button>{loading?"Schedulling":"Schedulle Event" }</Button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
