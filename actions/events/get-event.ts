"use server";

import prismadb from "@/lib/prismadb";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  link: string;
  images: string[];
}

export const getEvent = async (eventId: string) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }

  const event = await prismadb.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new Error(`Event with id ${eventId} not found`);
  }

  return {
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.venue,
    type: event.eventType,
    link: event.link,
    images: event.image,
  };
};
