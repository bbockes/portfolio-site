import type { SectionView } from './WorkSection';

export function Hero({ view }: { view: SectionView }) {
  const isPlayView = view === 'play';

  return (
    <section className="px-8 md:px-16 py-8 md:py-12">
      <div className="max-w-[960px] mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {isPlayView ? 'What-ifs made real' : 'Websites made better'}
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          {isPlayView
            ? 'Side quests, experiments, and riffs'
            : 'From content and design to visibility and performance.'}
        </p>
      </div>
    </section>
  );
}
