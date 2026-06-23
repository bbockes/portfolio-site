import { ViewToggle, type SectionView } from './ViewToggle';

export function Hero({
  view,
  onViewChange,
}: {
  view: SectionView;
  onViewChange: (view: SectionView) => void;
}) {
  const isPlayView = view === 'play';

  return (
    <section className="px-8 md:px-16 py-8 md:py-12">
      <div className="max-w-[960px] mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6 mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-tight">
            {isPlayView ? (
              <>
                <span className="text-blue-600">What-ifs</span>{' '}
                <span className="text-gray-800 dark:text-gray-400">made real</span>
              </>
            ) : (
              <>
                <span className="text-red-500">Websites</span>{' '}
                <span className="text-gray-800 dark:text-gray-400">made better</span>
              </>
            )}
          </h1>
          <div className="hidden md:block flex-shrink-0">
            <ViewToggle view={view} onViewChange={onViewChange} />
          </div>
        </div>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          {isPlayView
            ? 'Side projects, explorations, sketches, and riffs.'
            : 'From content and design to visibility and performance.'}
        </p>
        <div className="mt-6 md:hidden">
          <ViewToggle view={view} onViewChange={onViewChange} />
        </div>
      </div>
    </section>
  );
}
