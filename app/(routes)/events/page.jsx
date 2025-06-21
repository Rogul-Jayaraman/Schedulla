import EventCard from '@/components/Event/EventCard';
import fetchEvent from '@/assets/server/eventsHandler/fetchEvent';
import React from 'react'

const EventsPage = async() => {

  const {events, userName} = await fetchEvent();

  if(events.length == 0){
    return <p className='h-full w-full flex items-center justify-center mt-[-10em] text-xl font-semibold tracking-wide text-gray-700'>You haven't created any event yet...</p>
  }

  return (
    <div className='grid gap-4 grid-cols-1 lg:grid-cols-2 mt-10'>
      {
        events.map((event) => {
          return(
            <EventCard key={event.id} event={event} username={userName}></EventCard>
          )
        })
      }
    </div>
  )
}

export default EventsPage;