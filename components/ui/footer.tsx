"use client";

import { useEffect, useState } from "react";
import Container from "./container";

function RawalpindiClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-text-mute" style={{ fontSize: "12px" }}>
      Rawalpindi {time}
    </span>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <Container>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-text-mute" style={{ fontSize: "12px" }}>
            © {year} Saad Aamir
          </p>
          <RawalpindiClock />
        </div>
      </Container>
    </footer>
  );
}
