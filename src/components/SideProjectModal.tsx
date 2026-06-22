import { useEffect } from 'react';
import { X } from 'lucide-react';
import { ContentBlocks } from './ContentBlocks';
import type { ContentBlock } from '../shared/contentBlockTypes';

export interface SideProjectDetail {
  title: string;
  slug: string;
  projectType?: string;
  completionDate?: string;
  contentBlocks?: ContentBlock[];
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

  const metaItems = [
    project.projectType,
    project.completionDate ? formatCompletionDate(project.completionDate) : null,
  ].filter(Boolean);

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

          <div className="p-6 md:p-8">
            <header className="text-center mb-8 md:mb-10">
              <h2
                id="side-project-modal-title"
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-3"
              >
                {project.title}
              </h2>
              {metaItems.length > 0 && (
                <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
                  {metaItems.join(' · ')}
                </p>
              )}
            </header>

            <ContentBlocks blocks={project.contentBlocks} contained />
          </div>
        </div>
      </div>
    </div>
  );
}
