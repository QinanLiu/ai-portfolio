import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HERO_NAME = "Jessie Liu";
const HERO_STATEMENT =
  "在家、图像与明天之间，带着问题与流动的归属感，奔赴下一段创作旅程。";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#FCFBF7] px-0 py-24"
    >
      <div className="hero-ambient-shell" aria-hidden="true">
        <div className="hero-ambient-card">
          <span className="hero-ambient-label">LIGHT / AIRY / QUIET</span>
          <span className="hero-ambient-blob" />
        </div>
      </div>

      <div className="section-shell relative z-10">
        <motion.div
          className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="sr-only">{HERO_NAME}</h1>
          <ParticleTitle text={HERO_NAME} />
          <motion.p
            className="hero-statement mt-8 max-w-3xl text-base leading-8 text-[#5F5A54] sm:text-lg sm:leading-9"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {HERO_STATEMENT}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function ParticleTitle({ text }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    active: false,
    lastMove: 0,
  });
  const audioRef = useRef({
    context: null,
    delay: null,
    feedback: null,
    wet: null,
    lastTone: 0,
    noteIndex: 0,
  });

  const triggerTone = useCallback((ratio = 0.5) => {
    const audio = audioRef.current;
    const currentTime =
      typeof performance !== "undefined" ? performance.now() : Date.now();

    if (currentTime - audio.lastTone < 620) {
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      return;
    }

    if (!audio.context) {
      const context = new AudioContext();
      const delay = context.createDelay(2);
      const feedback = context.createGain();
      const wet = context.createGain();

      delay.delayTime.value = 0.34;
      feedback.gain.value = 0.18;
      wet.gain.value = 0.014;

      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(wet);
      wet.connect(context.destination);

      audio.context = context;
      audio.delay = delay;
      audio.feedback = feedback;
      audio.wet = wet;
    }

    const context = audio.context;
    if (context.state === "suspended") {
      context.resume();
    }

    const palette = [659.25, 739.99, 830.61, 987.77, 1108.73, 987.77, 880, 739.99];
    const harmonic = [1, 1.125, 1.25, 1.5];
    const base =
      palette[(audio.noteIndex + Math.round(ratio * 3)) % palette.length];
    const shimmer = harmonic[audio.noteIndex % harmonic.length];
    const now = context.currentTime;

    playMusicBoxPartial(context, audio.delay, base, now, 0.028, 1.45);
    playMusicBoxPartial(context, audio.delay, base * shimmer, now + 0.025, 0.012, 1.15);

    audio.noteIndex = (audio.noteIndex + 1) % palette.length;
    audio.lastTone = currentTime;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) {
      return undefined;
    }

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")
      .matches;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const buildParticles = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(320, rect.width);
      height = Math.max(150, rect.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const mask = document.createElement("canvas");
      const maskContext = mask.getContext("2d", { willReadFrequently: true });
      mask.width = Math.round(width);
      mask.height = Math.round(height);

      const fontSize = Math.min(width / 5.18, height * 0.72);
      maskContext.clearRect(0, 0, width, height);
      maskContext.fillStyle = "#ffffff";
      maskContext.font = `800 ${fontSize}px "Space Grotesk", Inter, "Noto Sans SC", sans-serif`;
      maskContext.textAlign = "center";
      maskContext.textBaseline = "middle";
      maskContext.fillText(text, width / 2, height / 2 + fontSize * 0.035);

      const imageData = maskContext.getImageData(0, 0, width, height);
      const nextTargets = [];
      const step = width < 540 ? 4 : 5;
      const maxParticles = width < 540 ? 1850 : 3100;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = imageData.data[(Math.floor(y) * mask.width + Math.floor(x)) * 4 + 3];
          if (alpha > 80) {
            nextTargets.push({ x, y });
          }
        }
      }

      const keepChance = Math.min(1, maxParticles / Math.max(1, nextTargets.length));
      const previous = particlesRef.current;
      let particleIndex = 0;

      particlesRef.current = nextTargets.reduce((particles, target) => {
        if (Math.random() > keepChance) {
          return particles;
        }

        const existing = previous[particleIndex];
        const drift = 80 + Math.random() * 140;
        particles.push({
          x: existing?.x ?? target.x + (Math.random() - 0.5) * drift,
          y: existing?.y ?? target.y + (Math.random() - 0.5) * drift,
          tx: target.x,
          ty: target.y,
          vx: existing?.vx ?? 0,
          vy: existing?.vy ?? 0,
          size: 0.75 + Math.random() * 1.05,
          glow: 0.35 + Math.random() * 0.65,
          tone: Math.random(),
        });
        particleIndex += 1;
        return particles;
      }, []);
    };

    const paint = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const now = typeof performance !== "undefined" ? performance.now() : Date.now();

      if (mouse.active && now - mouse.lastMove > 520) {
        mouse.active = false;
      }

      for (const particle of particles) {
        let targetX = particle.tx;
        let targetY = particle.ty;

        if (!reducedMotion && mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);
          const radius = Math.min(width * 0.16, 160);

          if (distance < radius) {
            const force = (1 - distance / radius) ** 2;
            const angle = Math.atan2(dy, dx);
            targetX += Math.cos(angle) * force * 132;
            targetY += Math.sin(angle) * force * 108;
            targetX += -Math.sin(angle) * force * 20;
            targetY += Math.cos(angle) * force * 14;
          }
        }

        if (reducedMotion) {
          particle.x = targetX;
          particle.y = targetY;
        } else {
          particle.vx += (targetX - particle.x) * 0.018;
          particle.vy += (targetY - particle.y) * 0.018;
          particle.vx *= 0.87;
          particle.vy *= 0.87;
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        const pulse = reducedMotion
          ? 1
          : 0.72 + Math.sin(now * 0.0011 + particle.tone * 7) * 0.2;
        const alpha = Math.max(0.32, particle.glow * pulse);
        const color =
          particle.tone > 0.72
            ? `rgba(169, 120, 114, ${alpha * 0.78})`
            : particle.tone > 0.44
              ? `rgba(82, 104, 115, ${alpha * 0.72})`
              : `rgba(23, 23, 23, ${alpha})`;

        context.beginPath();
        context.fillStyle = color;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      context.globalCompositeOperation = "source-over";
      if (!reducedMotion) {
        frameRef.current = requestAnimationFrame(paint);
      }
    };

    buildParticles();
    paint();

    const resizeObserver = new ResizeObserver(() => {
      buildParticles();
      if (reducedMotion) {
        paint();
      }
    });
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      const audio = audioRef.current;
      audio.context?.close();
      audio.context = null;
    };
  }, [text]);

  const handlePointerMove = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
      lastMove: typeof performance !== "undefined" ? performance.now() : Date.now(),
    };

    triggerTone(Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)));
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div
      className="particle-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerMove}
      aria-label={`${text} particle title`}
      role="img"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

function playMusicBoxPartial(context, delay, frequency, start, peak, duration) {
  const oscillator = context.createOscillator();
  const overtone = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  oscillator.type = "sine";
  overtone.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, start);
  overtone.frequency.setValueAtTime(frequency * 2.01, start);

  filter.type = "highpass";
  filter.frequency.setValueAtTime(420, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  overtone.connect(gain);
  gain.connect(filter);
  filter.connect(context.destination);
  filter.connect(delay);

  oscillator.start(start);
  overtone.start(start);
  oscillator.stop(start + duration + 0.08);
  overtone.stop(start + duration + 0.08);
}
