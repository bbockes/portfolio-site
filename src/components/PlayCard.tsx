import {
  CARD_BODY_CLASS,
  CARD_IMAGE_CLASS,
  CARD_META_CLASS,
  CARD_SHELL_CLASS,
  CARD_TITLE_CLASS,
} from './cardLayout';

interface PlayCardProps {
  title: string;
  projectType?: string;
  completionDate?: string;
  cardImage?: {
    asset: {
      url: string;
    };
  };
  onClick: () => void;
}

function formatCompletionYear(date: string) {
  return new Date(`${date}T00:00:00`).getFullYear().toString();
}

export function PlayCard({
  title,
  projectType,
  completionDate,
  cardImage,
  onClick,
}: PlayCardProps) {
  const year = completionDate ? formatCompletionYear(completionDate) : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${CARD_SHELL_CLASS} cursor-pointer text-left`}
    >
      <div className={`${CARD_IMAGE_CLASS} bg-gray-100 dark:bg-gray-700`}>
        {cardImage?.asset?.url ? (
          <img
            src={cardImage.asset.url}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            Image
          </div>
        )}
      </div>

      <div className={CARD_BODY_CLASS}>
        <h3 className={CARD_TITLE_CLASS}>{title}</h3>
        <div className={`${CARD_META_CLASS} flex items-center justify-between gap-4`}>
          <span>{projectType || '\u00A0'}</span>
          {year && <span className="shrink-0">{year}</span>}
        </div>
      </div>
    </button>
  );
}
