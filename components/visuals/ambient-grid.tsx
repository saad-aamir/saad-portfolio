"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  brightness: number;
  targetBrightness: number;
  radius: number;
}

const NODE_COUNT = 40;
const GRID_COLOR = "rgba(167, 139, 250, 0.04)";
const NODE_BASE_COLOR = "rgba(167, 139, 250,";
const PROXIMITY_RADIUS = 140;

export default function AmbientGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initNodes(canvas.width, canvas.height);
    };

    const initNodes = (w: number, h: number) => {
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        brightness: 0.2 + Math.random() * 0.3,
        targetBrightness: 0.2 + Math.random() * 0.3,
        radius: 1.5 + Math.random() * 1.5,
      }));
    };

    const draw = () => {
      if (!activeRef.current) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const CELL = 60;
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += CELL) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += CELL) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      nodesRef.current.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < PROXIMITY_RADIUS) {
          node.targetBrightness = 0.9 - (dist / PROXIMITY_RADIUS) * 0.5;
        } else {
          node.targetBrightness = 0.15 + Math.random() * 0.05;
        }
        node.brightness += (node.targetBrightness - node.brightness) * 0.06;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${NODE_BASE_COLOR} ${node.brightness})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          animRef.current = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(animRef.current);
        }
      },
      { threshold: 0.01 }
    );
    observerRef.current.observe(canvas);

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    resize();

    return () => {
      cancelAnimationFrame(animRef.current);
      observerRef.current?.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
