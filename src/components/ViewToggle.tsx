export type SectionView = 'work' | 'play';

const OPTIONS: { value: SectionView; label: string }[] = [
  { value: 'work', label: 'Work' },
  { value: 'play', label: 'Play' },
];

export function ViewToggle({
  view,
  onViewChange,
}: {
  view: SectionView;
  onViewChange: (view: SectionView) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Project type"
      className="relative inline-grid grid-cols-2 rounded-full bg-gray-900 dark:bg-white p-1"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-white dark:bg-gray-900 transition-[left] duration-300 ease-out"
        style={{
          width: 'calc(50% - 4px)',
          left: view === 'work' ? '4px' : 'calc(50%)',
        }}
      />
      {OPTIONS.map(({ value, label }) => {
        const isSelected = view === value;

        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onViewChange(value)}
            className={`relative z-10 min-w-[4.75rem] px-5 py-1.5 text-sm font-medium capitalize transition-colors duration-300 ${
              isSelected
                ? 'text-gray-900 dark:text-white'
                : 'text-white dark:text-gray-900'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
