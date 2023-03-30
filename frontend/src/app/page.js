"use client";

import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";

const URL = `http://${
  process.env.NODE_ENV == "development"
    ? "localhost:3001"
    : "host.minikube.internal"
}`;

export default function Home() {
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    const serializedErrors = localStorage.getItem("chaosErrors");
    if (!serializedErrors) {
      localStorage.setItem(
        "chaosErrors",
        "dbTicketsDelay=3000&dbErrorRate=0.5&ticketsErrorRate=0"
      );
    }
  }, []);

  useEffect(() => {
    const serializedErrors = localStorage.getItem("chaosErrors");
    fetch(`${URL}/api/conferences/list?${serializedErrors}`)
      .then((response) => response.json())
      .then((data) => setConferences(data.rows));
  }, []);

  return (
    <>
      <header>
        <h1 className="mb-6 text-3xl font-extrabold text-white">ВЕСНА 2023</h1>
      </header>
      <section className="grid grid-cols-3 gap-8">
        {conferences.length === 0 && (
          <div className="text-white">Загружаю...</div>
        )}
        {conferences?.map((conf) => (
          <Conference key={conf._id} conf={conf} />
        ))}
      </section>
    </>
  );
}

function buyTicket(slug) {
  const serializedErrors = localStorage.getItem("chaosErrors");

  return fetch(`${URL}/api/tickets/buy?${serializedErrors}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "idempotency-key":
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    },
    method: "POST",
    body: JSON.stringify({ slug }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("🥸");
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      alert("Ошибка, покупка билета не увенчалась успехом.");
    });
}

function Conference({ conf }) {
  const [buying, set] = useState(false);

  return (
    <Card
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={conf.logo}
    >
      <h5 className="text-2xl font-bold tracking-tight text-white">
        {conf.title}
      </h5>
      <p className="font-normal text-gray-400">{conf.description}</p>
      {conf.tickets && (
        <p className="text-sm text-white">Осталось билетов: {conf.tickets}</p>
      )}
      {buying ? (
        <Button disabled className={`mt-4 bg-gray-400`}>
          Покупаем...
        </Button>
      ) : (
        <Button
          onClick={() => {
            set(true);
            buyTicket(conf.slug).finally(() => set(false));
          }}
          className={`mt-4 bg-green-500`}
        >
          Купить билет
        </Button>
      )}
    </Card>
  );
}
