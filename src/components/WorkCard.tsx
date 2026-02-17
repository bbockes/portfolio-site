import { Link } from 'react-router-dom';

interface WorkCardProps {
  title: string;
  tags: string[];
  bgColor: string;
  slug: string;
  screenshot?: {
    asset: {
      url: string;
    };
  };
}

export function WorkCard({ title, tags, bgColor, slug, screenshot }: WorkCardProps) {
  return (
    <Link 
      to={`/work/${slug}`}
      className="block group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
    >
      {/* Image container - image fills card edge to edge */}
      <div 
        className="w-full aspect-[3/1.9] flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {screenshot?.asset?.url ? (
          <img 
            src={screenshot.asset.url}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white flex items-center justify-center text-gray-400 text-xs">
            Screenshot
          </div>
        )}
      </div>
      
      {/* Content area */}
      <div className="p-5">
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-base">
          {tags?.join(' · ') || ''}
        </p>
      </div>
    </Link>
  );
}
