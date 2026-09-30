"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { clsx } from "clsx";
import type { Project } from "@/lib/projects";

const statusLabel: Record<string, string> = {
  shipped: "shipped",
  "in-progress": "in progress",
  archived: "archived",
};

const statusColor: Record<string, string> = {
  shipped: "text-green border-green/30",
  "in-progress": "text-warm border-warm/30",
  archived: "text-text-mute border-border",
};

interface ProjectLink {
  label: string;
  href: string;
  accent: boolean;
}

/** Card and modal render the same link set, so it is derived once. */
function projectLinks(project: Project): ProjectLink[] {
  const links: ProjectLink[] = [];
  if (project.caseStudy) {
    links.push({ label: "Case study", href: `/work/${project.caseStudy}`, accent: true });
  }
  if (project.links.arxiv) links.push({ label: "Preprint", href: project.links.arxiv, accent: true });
  if (project.links.live) links.push({ label: "Live demo", href: project.links.live, accent: true });
  if (project.links.github) links.push({ label: "GitHub", href: project.links.github, accent: false });
  if (project.links.weights) links.push({ label: "Weights", href: project.links.weights, accent: false });
  if (project.links.substack) {
    links.push({ label: "Substack", href: project.links.substack, accent: false });
  }
  return links;
}

function LinkRow({ links }: { links: ProjectLink[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {links.map((link) => {
        const external = link.href.startsWith("http");
        return (
          <a
            key={link.label}
            href={link.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            // The card behind this is also a click target; don't open the modal.
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              "inline-flex items-center gap-1 transition-colors",
              link.accent ? "text-accent hover:text-accent-2" : "text-text-mute hover:text-text"
            )}
            style={{ fontSize: "13px" }}
          >
            {link.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

function StackPills({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tool) => (
        <span
          key={tool}
          className="font-mono text-text-mute border border-border rounded-full px-2.5 py-0.5"
          style={{ fontSize: "11px" }}
        >
          {tool}
        </span>
      ))}
    </div>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function ProjectModal({
  project,
  visual,
  titleId,
  onClose,
}: {
  project: Project;
  visual: React.ReactNode;
  titleId: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const links = projectLinks(project);

  // Escape closes; Tab cycles within the panel.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock background scroll, compensating for the scrollbar so nothing shifts.
  useEffect(() => {
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, []);

  // Move focus into the dialog once mounted.
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" aria-hidden="true" />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.2, 0.9, 0.3, 1] }}
        className="relative my-auto w-full max-w-3xl rounded-[24px] border border-border-2 bg-bg-card shadow-2xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-1/90 text-text-dim backdrop-blur-sm transition-colors hover:border-border-2 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Visual, larger than on the card. Each diagram paints its own #14161A
            ground, so bg-card here makes the letterboxed edges seamless. */}
        {visual && (
          <div className="h-56 w-full overflow-hidden rounded-t-[24px] bg-bg-card sm:h-72">
            {visual}
          </div>
        )}

        <div className="p-7 sm:p-10">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h2
              id={titleId}
              className="font-semibold tracking-[-0.02em] text-text"
              style={{ fontSize: "28px" }}
            >
              {project.title}
            </h2>
            <span
              className={clsx(
                "font-mono rounded-full border px-2 py-0.5",
                statusColor[project.status]
              )}
              style={{ fontSize: "11px" }}
            >
              {statusLabel[project.status]}
            </span>
          </div>

          <p className="font-mono text-text-mute mb-5" style={{ fontSize: "12px" }}>
            {project.year} · {project.role}
          </p>

          <p className="text-accent mb-5" style={{ fontSize: "16px" }}>
            {project.tagline}
          </p>

          <p className="text-text-dim leading-relaxed mb-7" style={{ fontSize: "15.5px" }}>
            {project.description}
          </p>

          <div className="mb-7">
            <StackPills stack={project.stack} />
          </div>

          <LinkRow links={links} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WorkCard({
  project,
  visual,
}: {
  project: Project;
  visual: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  // Flips on first open so the portal (and its exit animation) can stay mounted.
  // Guarding on it also keeps createPortal from running during SSR.
  const [everOpened, setEverOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const links = projectLinks(project);

  const openModal = useCallback(() => {
    setEverOpened(true);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Return focus to the control that opened the dialog.
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <div
        onClick={openModal}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[16px] border border-border bg-bg-card transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-accent-dim"
      >
        {/* Visual — fixed height on all cards */}
        <div className="h-52 w-full shrink-0 overflow-hidden bg-bg-2">{visual}</div>

        <div className="flex flex-1 flex-col p-7">
          {/* Header row */}
          <div className="mb-2 flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-text" style={{ fontSize: "20px" }}>
                <button
                  ref={triggerRef}
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal();
                  }}
                  className="text-left transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {project.title}
                </button>
              </h3>
              <span
                className={clsx(
                  "font-mono rounded-full border px-2 py-0.5",
                  statusColor[project.status]
                )}
                style={{ fontSize: "11px" }}
              >
                {statusLabel[project.status]}
              </span>
            </div>
            <span className="font-mono shrink-0 text-text-mute" style={{ fontSize: "12px" }}>
              {project.year}
            </span>
          </div>

          {/* Tagline */}
          <p className="text-accent mb-4" style={{ fontSize: "15px" }}>
            {project.tagline}
          </p>

          {/* Description — clamped to exactly 3 lines so no partial line is cut */}
          <p
            className="line-clamp-3 text-text-dim"
            style={{ fontSize: "14.5px", lineHeight: 1.6, height: "4.8em" }}
          >
            {project.description}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
            aria-haspopup="dialog"
            className="mb-5 mt-2 self-start font-mono text-text-mute transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            style={{ fontSize: "12px" }}
          >
            Read more
          </button>

          {/* Stack pills and links pinned to the bottom so rows align */}
          <div className="mt-auto">
            <div className="mb-5">
              <StackPills stack={project.stack} />
            </div>
            <LinkRow links={links} />
          </div>
        </div>
      </div>

      {everOpened &&
        createPortal(
          <AnimatePresence>
            {open && (
              <ProjectModal
                project={project}
                visual={visual}
                titleId={titleId}
                onClose={close}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
