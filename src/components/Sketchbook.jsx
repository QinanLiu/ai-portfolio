import MotionSection from "./MotionSection.jsx";
import { copy } from "../data/i18n.js";

export default function Sketchbook({ language }) {
  const content = copy[language].sketchbook;

  return (
    <MotionSection
      id="sketchbook"
      className="border-y border-ink/10 bg-ash py-24 text-ink sm:py-32"
    >
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-rust">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">
            {content.title}
          </h2>
        </div>

        <div className="horizontal-scroll mt-12 flex gap-5 overflow-x-auto pb-5">
          {content.slots.map((item) => (
            <article
              key={item.title}
              className="w-[78vw] max-w-[430px] shrink-0 overflow-hidden rounded-[8px] border border-ink/12 bg-paper"
            >
              <div className="grid aspect-[5/4] place-items-center bg-ink text-paper">
                <div className="h-20 w-20 rounded-full border border-paper/20 bg-paper/5" />
              </div>
              <div className="min-h-[188px] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-rust">
                  {item.type}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-none">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-ink/62">
                  {item.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
