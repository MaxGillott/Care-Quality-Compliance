"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, MapPin } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const path = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [path]);
  useEffect(() => {
    const dismiss = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node))
        setServicesOpen(false);
    };
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const els =
          panelRef.current?.querySelectorAll<HTMLElement>("a, button");
        if (!els?.length) return;
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    const mq = window.matchMedia("(min-width: 901px)");
    const resize = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", resize);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <>
      <div className={`topbar ${path === "/" ? "topbar-home" : ""}`}>
        <div className="container topbar-inner">
          <span>
            Professional expertise. Independent advice. Practical solutions.
          </span>
          <span>
            <MapPin size={12} aria-hidden="true" /> Supporting care across
            England
          </span>
        </div>
      </div>
      <header
        className={`site-header ${path === "/" ? "site-header-cinema" : ""}`}
      >
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link
              href="/"
              className={path === "/" ? "active" : ""}
              aria-current={path === "/" ? "page" : undefined}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={path === "/about" ? "active" : ""}
              aria-current={path === "/about" ? "page" : undefined}
            >
              About us
            </Link>
            <div
              className="nav-dropdown"
              ref={dropdownRef}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setServicesOpen(false);
                  dropdownRef.current?.querySelector("button")?.focus();
                }
              }}
            >
              <button
                type="button"
                className={path.startsWith("/services") ? "active" : ""}
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                How we can help{" "}
                <ChevronDown
                  size={14}
                  className={servicesOpen ? "rotated" : ""}
                />
              </button>
              {servicesOpen && (
                <div id="services-menu" className="services-menu">
                  <span className="eyebrow">Support built around you</span>
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={() => setServicesOpen(false)}
                    >
                      {s.title}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="view-all"
                    onClick={() => setServicesOpen(false)}
                  >
                    Explore all services
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/contact"
              className={path === "/contact" ? "active" : ""}
              aria-current={path === "/contact" ? "page" : undefined}
            >
              Contact
            </Link>
          </nav>
          <Button asChild size="small" className="header-cta">
            <Link href="/contact">Let’s talk</Link>
          </Button>
          <button
            className="mobile-toggle"
            ref={toggleRef}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <Menu size={25} />
          </button>
        </div>
      </header>
      {open && (
        <div
          className="mobile-scrim"
          onClick={() => {
            setOpen(false);
            toggleRef.current?.focus();
          }}
        >
          <div
            id="mobile-navigation"
            className="mobile-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-head">
              <span>Explore</span>
              <button
                className="icon-button"
                aria-label="Close navigation"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
              >
                <X />
              </button>
            </div>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/about">About us</Link>
              <Link href="/services">How we can help</Link>
              <div className="mobile-services">
                {services.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`}>
                    {s.title}
                  </Link>
                ))}
              </div>
              <Link href="/contact">Contact</Link>
            </nav>
            <Button asChild>
              <Link href="/contact">Start a conversation</Link>
            </Button>
            <p className="mobile-note">People first. Always.</p>
          </div>
        </div>
      )}
    </>
  );
}
