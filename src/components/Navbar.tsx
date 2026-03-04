"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Resources", href: "#resources" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-16 transition-all duration-200 ${
          scrolled
            ? "border-b border-border bg-white/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-2 text-[20px] font-bold tracking-tight text-dark-text"
          >
            <ShieldCheck className="h-6 w-6 shrink-0 text-accent" />
            <span className="flex flex-col">
              <span>FundingWatch</span>
              <span className="hidden text-[13px] font-normal text-muted sm:block">
                Free MCA Contract Intelligence
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ label, href }) => (
              <button
                key={href}
                type="button"
                onClick={() => scrollTo(href)}
                className="cursor-pointer text-[15px] font-medium text-muted transition-colors duration-200 hover:text-dark-text"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollToUpload}
              className="hidden cursor-pointer items-center rounded-button bg-accent px-5 py-2.5 text-small font-semibold text-white shadow-button-accent transition-all duration-200 hover:scale-[1.02] hover:shadow-button-accent-hover md:flex md:bg-transparent md:text-accent md:shadow-none md:hover:bg-accent/5"
            >
              Analyze Contract
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex cursor-pointer items-center justify-center rounded-button p-2 text-dark-text md:hidden"
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-opacity duration-200 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ top: "64px" }}
      >
        <nav className="flex flex-col gap-1 px-4 pt-8 pb-6">
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              type="button"
              onClick={() => scrollTo(href)}
              className="cursor-pointer rounded-button py-4 text-left text-[15px] font-medium text-dark-text transition-colors hover:bg-secondary-bg"
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={scrollToUpload}
            className="mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-button bg-accent py-4 text-body font-semibold text-white"
          >
            Analyze Contract
            <ArrowRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </>
  );
}
