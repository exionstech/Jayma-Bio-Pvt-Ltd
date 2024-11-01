
import { Event } from '@/actions/events/get-events';
import React from 'react'
interface EventsDetailsProps {
    event:Event;
}
const EventsDetails = ({event}:EventsDetailsProps) => {
  return (
    <div className='bg-black'>
        {event.title}
    </div>
  )
}

export default EventsDetails