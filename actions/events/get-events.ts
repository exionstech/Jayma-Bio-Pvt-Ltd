"use server";

import prismadb from "@/lib/prismadb";


export interface Event  {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    type: string;
    link: string;
    images: string[];
}


export const getAllEvents = async () => {
  const events = await prismadb.event.findMany();

  return events.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.venue,
    type: event.eventType,
    link: event.link,
    images: event.image,
  }));
};
