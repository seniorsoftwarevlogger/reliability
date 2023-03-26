"use client";

import { Card } from "flowbite-react";
import { Suspense, useEffect, useState } from "react";
const URL = `http://${
  process.env.NODE_ENV == "development"
    ? "localhost:3001"
    : "host.minikube.internal"
}`;

export default function Home() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`http://${URL}/api/tickets/my`)
      .then((response) => response.json())
      .then((data) => setTickets(data.rows));
  }, []);

  return (
    <>
      <header>
        <h1 className="mb-6 text-3xl font-extrabold text-white">БИЛЕТЫ</h1>
      </header>
      <section className="grid grid-cols-3 gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          {tickets?.map((ticket) => (
            <Ticket key={ticket._id} ticket={ticket} />
          ))}
        </Suspense>
      </section>
    </>
  );
}

function Ticket({ ticket }) {
  return (
    <Card
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={ticket.logo}
    >
      <h5 className="text-2xl font-bold tracking-tight text-white">
        {ticket.slug} : {ticket.timestamp}
      </h5>
      <p className="font-normal text-gray-400">{ticket.description}</p>
    </Card>
  );
}
