import { Link } from 'react-router-dom';

interface PlayCardProps {
  title: string;
  slug: string;
  completionDate?: string;
  cardImage?: {
    asset: {
      url: string;
    };
  };
}

function formatCompletionDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });
}

export function PlayCard({ title, slug, completionDate, cardImage }: PlayCardProps) {
  return (
    <Link
      to={`/play/${slug}`}
      className="block group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
    >
      <div className="w-full aspect-[3/1.9] flex items-center justify-center relative overflow-hidden bg-gray-100 dark:bg-gray-700">
        {cardImage?.asset?.url ? (
          <img
            src={cardImage.asset.url}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            Image
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        {completionDate && (
          <p className="text-gray-500 dark:text-gray-400 text-base">
            {formatCompletionDate(completionDate)}
          </p>
        )}
      </div>
    </Link>
  );
}
