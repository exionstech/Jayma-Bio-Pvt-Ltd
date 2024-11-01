import { getEvent } from "@/actions/events/get-event";

interface EventPageProps {
  params: {
    eventId: string;
  };
}

const EventsDetailsPage = async ({ params }: EventPageProps) => {
  const event = await getEvent(params.eventId);

  return (
    <div className="min-h-screen mt-20">
      <h1>Event: {event.title}</h1>
    </div>
  );
};

export default EventsDetailsPage;
