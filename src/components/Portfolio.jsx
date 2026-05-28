import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import MotionSection from "./MotionSection.jsx";
import { copy, text } from "../data/i18n.js";
import { works } from "../data/works.js";

export default function Portfolio({ language }) {
  const content = copy[language].portfolio;
  const [activeMedium, setActiveMedium] = useState("all");
  const [selectedWork, setSelectedWork] = useState(null);

  const allMediums = useMemo(() => {
    const mediumMap = new Map();

    works.forEach((work) => {
      if (!mediumMap.has(work.mediumKey)) {
        mediumMap.set(work.mediumKey, {
          key: work.mediumKey,
          label: text(work.medium, language),
        });
      }
    });

    return [{ key: "all", label: content.all }, ...mediumMap.values()];
  }, [content.all, language]);

  const visibleWorks = useMemo(() => {
    if (activeMedium === "all") return works;
    return works.filter((work) => work.mediumKey === activeMedium);
  }, [activeMedium]);

  return (
    <MotionSection id="works" className="bg-paper py-24 text-ink sm:py-32">
      <div className="section-shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-rust">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">
              {content.title}
            </h2>
          </div>

          <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
            {allMediums.map((medium) => (
              <button
                key={medium.key}
                type="button"
                onClick={() => setActiveMedium(medium.key)}
                className={`min-h-10 shrink-0 rounded-[6px] border px-3 text-xs uppercase tracking-[0.16em] transition ${
                  activeMedium === medium.key
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/15 bg-transparent text-ink/64 hover:border-ink/38 hover:text-ink"
                }`}
              >
                {medium.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleWorks.map((work) => (
            <motion.button
              layout
              key={work.id}
              type="button"
              className="group overflow-hidden rounded-[6px] border border-ink/10 bg-ink text-left text-paper shadow-sm"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setSelectedWork(work)}
            >
              <div className="image-grain soft-vignette aspect-[16/10]">
                <img
                  src={work.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 opacity-100 transition duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.18em] text-paper/62">
                      {text(work.medium, language)}
                    </span>
                    <Maximize2 size={16} className="text-paper/70" />
                  </div>
                  <h3 className="mt-3 font-display text-3xl leading-none">
                    {text(work.title, language)}
                  </h3>
                </div>
              </div>
              <div className="min-h-[156px] p-5">
                <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-paper/52">
                  <span>{work.year}</span>
                  <span>{text(work.mood[0], language)}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-paper/70">
                  {text(work.description, language)}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedWork && (
          <WorkModal
            work={selectedWork}
            language={language}
            onClose={() => setSelectedWork(null)}
          />
        )}
      </AnimatePresence>
    </MotionSection>
  );
}

function WorkModal({ work, language, onClose }) {
  const content = copy[language].portfolio.modal;
  const title = text(work.title, language);
  const detailImages = work.detailImages?.length ? work.detailImages : [work.image];

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/82 p-4 text-paper backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[8px] border border-paper/12 bg-[#121212] shadow-soft"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="image-grain min-h-[360px] bg-ink">
            <img
              src={detailImages[0]}
              alt={title}
              className="h-full min-h-[360px] w-full object-contain"
            />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-rust">
                  {text(work.medium, language)} / {work.year}
                </p>
                <h3 className="mt-3 font-display text-4xl leading-none sm:text-5xl">
                  {title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border border-paper/14 bg-paper/6 transition hover:bg-paper/12"
                aria-label={content.close}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-8 space-y-7">
              <DetailBlock
                label={content.description}
                value={text(work.description, language)}
              />
              <DetailBlock
                label={content.statement}
                value={text(work.statement, language)}
              />

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-paper/42">
                  {content.tools}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {work.tools.map((tool) => (
                    <span
                      key={text(tool, "en")}
                      className="rounded-[6px] border border-paper/12 px-3 py-2 text-xs text-paper/70"
                    >
                      {text(tool, language)}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-paper/42">
                  {content.mood}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {work.mood.map((tag) => (
                    <span
                      key={text(tag, "en")}
                      className="rounded-[6px] bg-paper px-3 py-2 text-xs text-ink"
                    >
                      {text(tag, language)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {detailImages.length > 1 && (
          <div className="border-t border-paper/10 p-4 sm:p-6">
            <div className="grid gap-4">
              {detailImages.map((image, index) => (
                <figure
                  key={image}
                  className="overflow-hidden rounded-[6px] border border-paper/10 bg-ink"
                >
                  <img
                    src={image}
                    alt={`${title} portfolio page ${index + 1}`}
                    className="h-auto w-full"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </div>
        )}
      </motion.article>
    </motion.div>
  );
}

function DetailBlock({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-paper/42">
        {label}
      </p>
      <p className="mt-3 text-sm leading-7 text-paper/70">{value}</p>
    </div>
  );
}
