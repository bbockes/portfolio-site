import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { sanityClient } from '../lib/sanityClient';
import { ContentBlocks } from './ContentBlocks';
import { PLAY_HOME_PATH } from '../shared/routes';
import { contentBlocksQuery, type ContentBlock } from '../shared/contentBlockTypes';

interface SideProject {
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

function PlayProjectBackLink() {
  return (
    <div className="px-8 md:px-16 pt-2 pb-4">
      <div className="max-w-[960px] mx-auto">
        <Link
          to={PLAY_HOME_PATH}
          className="inline-flex items-center gap-2.5 text-base font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2} />
          Back
        </Link>
      </div>
    </div>
  );
}

export function SideProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<SideProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setProject(null);

    const fetchProject = async () => {
      try {
        const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;

        if (!projectId || projectId === 'placeholder') {
          console.error('Sanity project ID not configured. Check environment variables.');
          setLoading(false);
          return;
        }

        const query = `*[_type == "sideProject" && slug.current == $slug][0] {
          title,
          "slug": slug.current,
          projectType,
          completionDate,
          ${contentBlocksQuery}
        }`;

        const data = await sanityClient.fetch<SideProject | null>(query, { slug });
        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching side project:', error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div>
        <PlayProjectBackLink />
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div>
        <PlayProjectBackLink />
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">Project not found</p>
        </div>
      </div>
    );
  }

  const metaItems = [
    project.projectType,
    project.completionDate ? formatCompletionDate(project.completionDate) : null,
  ].filter(Boolean);

  return (
    <div>
      <PlayProjectBackLink />

      <section className="px-8 md:px-16 pt-4 md:pt-0 pb-8 md:pb-10 text-center">
        <div className="max-w-[960px] mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {project.title}
          </h1>
          {metaItems.length > 0 && (
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400">
              {metaItems.join(' · ')}
            </p>
          )}
        </div>
      </section>

      <div className="px-8 md:px-16 pb-12 md:pb-16">
        <div className="max-w-[960px] mx-auto">
          <ContentBlocks blocks={project.contentBlocks} variant="play" />

          <footer className="mt-16">
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <div className="flex justify-between items-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Brendan Bockes · {new Date().getFullYear()}
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded hover:bg-blue-600 dark:hover:bg-blue-500 transition-all hover:-translate-y-1 text-sm font-medium"
                >
                  Back to Top
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
