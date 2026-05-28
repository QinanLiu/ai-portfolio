import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MotionSection from "./MotionSection.jsx";
import { text } from "../data/i18n.js";
import { profile } from "../data/profile.js";

const labels = {
  zh: {
    eyebrow: "学习经历 / 公开项目",
    title: "从课堂、工作坊到真实项目",
    education: "学习经历",
    awards: "个人荣誉",
    activities: "过往实习&项目",
    scores: "成绩",
    scrollLeft: "向左滑动",
    scrollRight: "向右滑动",
  },
  en: {
    eyebrow: "Learning Experience / Public Projects",
    title: "From Classrooms, Workshops, to Real Projects",
    education: "Learning Experience",
    awards: "Awards",
    activities: "Internships & Projects",
    scores: "Scores",
    scrollLeft: "Scroll left",
    scrollRight: "Scroll right",
  },
};

export default function Experience({ language }) {
  const content = labels[language];

  return (
    <MotionSection
      id="experience"
      className="experience-light-section relative overflow-hidden border-t border-[#171717]/[0.08] bg-[#F7F3EC] py-24 text-[#171717] sm:py-32"
    >
      <div className="experience-light-field" aria-hidden="true" />

      <div className="section-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#5F5A54]">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-none text-[#171717] sm:text-6xl">
              {content.title}
            </h2>
          </div>

          <div className="space-y-10">
            <ExperienceBlock title={content.education}>
              <div className="grid gap-3">
                {profile.education.map((item) => {
                  const localized = item[language];
                  return (
                    <article
                      key={localized.title}
                      className="rounded-[8px] border border-[#171717]/[0.08] bg-[#FCFBF7]/85 p-5 shadow-[0_18px_50px_rgba(95,90,84,0.08)] backdrop-blur"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <h3 className="font-display text-2xl font-semibold leading-tight text-[#171717]">
                          {localized.title}
                        </h3>
                        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#5F5A54]">
                          {localized.meta}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[#5F5A54]">
                        {localized.text}
                      </p>
                    </article>
                  );
                })}
              </div>
            </ExperienceBlock>

            <ExperienceBlock title={content.scores}>
              <div className="flex flex-wrap gap-2">
                {profile.highlights.map((item) => (
                  <span
                    key={text(item, "en")}
                    className="rounded-[999px] border border-[#171717]/[0.08] bg-[#E5EDF2]/70 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[#171717]"
                  >
                    {text(item, language)}
                  </span>
                ))}
              </div>
            </ExperienceBlock>
          </div>
        </div>

        <HorizontalRail
          className="mt-16"
          title={content.awards}
          leftLabel={content.scrollLeft}
          rightLabel={content.scrollRight}
        >
          {profile.awards.map((award, index) => (
            <article
              key={text(award, "en")}
              className="w-[82vw] max-w-[410px] shrink-0 rounded-[8px] border border-[#171717]/[0.08] bg-[#FCFBF7]/88 p-6 shadow-[0_18px_50px_rgba(95,90,84,0.08)]"
            >
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#A97872]">
                Award 0{index + 1}
              </p>
              <p className="mt-5 text-base font-medium leading-8 text-[#171717]">
                {text(award, language)}
              </p>
            </article>
          ))}
        </HorizontalRail>

        <HorizontalRail
          className="mt-12"
          title={content.activities}
          leftLabel={content.scrollLeft}
          rightLabel={content.scrollRight}
        >
          {profile.activities.map((item) => {
            const localized = item[language];
            return (
              <article
                key={localized.title}
                className="w-[84vw] max-w-[420px] shrink-0 rounded-[8px] border border-[#171717]/[0.08] bg-[#FCFBF7]/88 p-6 shadow-[0_18px_50px_rgba(95,90,84,0.08)]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#A97872]">
                  {localized.role}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-[#171717]">
                  {localized.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-[#5F5A54]">
                  {localized.text}
                </p>
              </article>
            );
          })}
        </HorizontalRail>
      </div>
    </MotionSection>
  );
}

function ExperienceBlock({ title, children }) {
  return (
    <section>
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-[#5F5A54]/80">
        {title}
      </h3>
      {children}
    </section>
  );
}

function HorizontalRail({ title, leftLabel, rightLabel, className = "", children }) {
  const railRef = useRef(null);

  const scroll = (direction) => {
    railRef.current?.scrollBy({
      left: direction * 440,
      behavior: "smooth",
    });
  };

  return (
    <section className={className}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
          {title}
        </h3>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#171717]/[0.1] bg-[#FCFBF7]/70 text-[#171717] transition hover:bg-white"
            aria-label={leftLabel}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#171717]/[0.1] bg-[#FCFBF7]/70 text-[#171717] transition hover:bg-white"
            aria-label={rightLabel}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div
        ref={railRef}
        className="horizontal-scroll flex gap-5 overflow-x-auto pb-4"
      >
        {children}
      </div>
    </section>
  );
}
