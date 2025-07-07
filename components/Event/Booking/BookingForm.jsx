"use client";
import "react-day-picker/style.css";
import { bookingSchema } from "@/assets/data/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const BookingForm = ({ event, availability }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(bookingSchema),
  });
  const availableDays = availability.map((avail) => new Date(avail.date));

  const selectedFormatted = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;
  const selectedDayAvailability = availability.find(
    (day) => day.date === selectedFormatted
  );

  const timeSlots = selectedDayAvailability?.availableSlots || [];

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
              <h2 className="mb-5 mt-2 font-semibold text-teal-900">Available Time Slots</h2>
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
      <div></div>
    </div>
  );
};

export default BookingForm;
