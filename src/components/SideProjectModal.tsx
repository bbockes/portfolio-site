import { useEffect } from 'react';
import { X } from 'lucide-react';
import { PortableText } from '@portabletext/react';

export interface SideProjectDetail {
  title: string;
  slug: string;
  completionDate?: string;
  heroImage?: {
    asset: {
      url: string;
    };
  };
  content?: any[];
}

function formatCompletionDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });
}

export function SideProjectModal({
  project,
  onClose,
}: {
  project: SideProjectDetail;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const bodyStyle = body.style;

    bodyStyle.overflow = 'hidden';
    bodyStyle.position = 'fixed';
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.left = '0';
    bodyStyle.right = '0';
    bodyStyle.width = '100%';
    documentElement.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      bodyStyle.overflow = '';
      bodyStyle.position = '';
      bodyStyle.top = '';
      bodyStyle.left = '';
      bodyStyle.right = '';
      bodyStyle.width = '';
      documentElement.style.overflow = '';
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="side-project-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close project"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 pointer-events-none">
        <div className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-xl bg-white dark:bg-gray-900 shadow-2xl pointer-events-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {project.heroImage?.asset?.url && (
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl">
            <img
              src={project.heroImage.asset.url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          <h2
            id="side-project-modal-title"
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {project.title}
          </h2>
          {project.completionDate && (
            <p className="text-gray-500 dark:text-gray-400 text-base mb-6">
              {formatCompletionDate(project.completionDate)}
            </p>
          )}

          {project.content && project.content.length > 0 && (
            <div className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-[1.8] space-y-4">
              <PortableText
                value={project.content}
                components={{
                  block: {
                    normal: ({ children }) => <p>{children}</p>,
                  },
                  marks: {
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    link: ({ value, children }) => (
                      <a
                        href={value?.href}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
