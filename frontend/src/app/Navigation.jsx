"use client";

import { Navbar } from "flowbite-react";

export default function Navigation() {
  return (
    <Navbar fluid rounded className="mb-5">
      <Navbar.Brand href="/">
        <img src="./logo.svg" className="mr-3 h-6 sm:h-9" alt="Jug Ru" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/">Календарь конференций</Navbar.Link>
        <Navbar.Link href="/">Услуги</Navbar.Link>
        <Navbar.Link href="/">Контакты</Navbar.Link>
        <Navbar.Link href="/my">Билеты</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
