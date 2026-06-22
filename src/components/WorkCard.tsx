import { Link } from 'react-router-dom';
import {
  CARD_BODY_CLASS,
  CARD_IMAGE_CLASS,
  CARD_META_CLASS,
  CARD_SHELL_CLASS,
  CARD_TITLE_CLASS,
} from './cardLayout';

interface WorkCardProps {
  title: string;
  projectType?: string;
  bgColor: string;
  slug: string;
  screenshot?: {
    asset: {
      url: string;
    };
  };
}

export function WorkCard({ title, projectType, bgColor, slug, screenshot }: WorkCardProps) {
  return (
    <Link
      to={`/work/${slug}`}
      className={CARD_SHELL_CLASS}
    >
      <div
        className={CARD_IMAGE_CLASS}
        style={{ backgroundColor: bgColor }}
      >
        {screenshot?.asset?.url ? (
          <img
            src={screenshot.asset.url}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white text-xs text-gray-400">
            Screenshot
          </div>
        )}
      </div>

      <div className={CARD_BODY_CLASS}>
        <h3 className={CARD_TITLE_CLASS}>{title}</h3>
        <p className={CARD_META_CLASS}>{projectType || '\u00A0'}</p>
      </div>
    </Link>
  );
}
