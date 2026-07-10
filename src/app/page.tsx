"use client";

import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ViewRouter } from "@/components/site/view-router";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <main className="flex-1">
        <ViewRouter />
      </main>
      <Footer />
    </div>
  );
}
