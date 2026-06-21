import { useState, useEffect, useMemo } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { WorkCard } from './WorkCard';
import { PlayCard } from './PlayCard';
import { SideProjectModal, type SideProjectDetail } from './SideProjectModal';
import { sanityClient } from '../lib/sanityClient';

export type SectionView = 'work' | 'play';

interface Project {
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

interface SideProject extends SideProjectDetail {
  cardImage?: {
    asset: {
      url: string;
    };
  };
}

function WorkSectionHeader({
  view,
  onToggleView,
}: {
  view: SectionView;
  onToggleView: () => void;
}) {
  return (
    <div className="flex items-center mb-8 gap-2.5">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white capitalize">
        {view}
      </h2>
      <button
        type="button"
        onClick={onToggleView}
        aria-label={view === 'work' ? 'Show play projects' : 'Show work projects'}
        className="group relative flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-transparent text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-xl bg-transparent group-hover:bg-[#e8eaed] dark:group-hover:bg-[#333842] transition-colors pointer-events-none"
        />
        <ArrowLeftRight className="relative w-[18px] h-[18px]" strokeWidth={1.75} />
      </button>
    </div>
  );
}

export function WorkSection({
  view,
  onToggleView,
}: {
  view: SectionView;
  onToggleView: () => void;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sideProjects, setSideProjects] = useState<SideProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSideProject, setSelectedSideProject] = useState<SideProjectDetail | null>(
    null
  );

  const sortedProjects = useMemo(
    () =>
      projects
        .slice()
        .sort((a, b) =>
          a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
        ),
    [projects]
  );

  const sortedSideProjects = useMemo(
    () =>
      sideProjects.slice().sort((a, b) => {
        const aTime = a.completionDate ? Date.parse(a.completionDate) : 0;
        const bTime = b.completionDate ? Date.parse(b.completionDate) : 0;
        return bTime - aTime;
      }),
    [sideProjects]
  );

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;

        if (!projectId || projectId === 'placeholder') {
          console.error('Sanity project ID not configured. Check environment variables.');
          setLoading(false);
          return;
        }

        const [workData, playData] = await Promise.all([
          sanityClient.fetch<Project[]>(`*[_type == "project"] | order(_createdAt desc) {
            title,
            tags,
            bgColor,
            "slug": slug.current,
            screenshot {
              asset-> {
                url
              }
            }
          }`),
          sanityClient.fetch<SideProject[]>(`*[_type == "sideProject"] | order(_createdAt desc) {
            title,
            "slug": slug.current,
            completionDate,
            cardImage {
              asset-> {
                url
              }
            },
            heroImage {
              asset-> {
                url
              }
            },
            content[]
          }`),
        ]);

        setProjects(workData || []);
        setSideProjects(playData || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <section className="pt-0 pb-12 md:pt-0 md:pb-16 px-8 md:px-16" id="work">
        <div className="max-w-[960px] mx-auto">
          <WorkSectionHeader view={view} onToggleView={onToggleView} />
          <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
        </div>
      </section>
    );
  }

  const isWorkView = view === 'work';
  const items = isWorkView ? sortedProjects : sortedSideProjects;
  const emptyMessage = isWorkView ? 'No projects found.' : 'No side projects found.';

  return (
    <>
      <section className="pt-0 pb-12 md:pt-0 md:pb-16 px-8 md:px-16" id="work">
        <div className="max-w-[960px] mx-auto">
          <WorkSectionHeader view={view} onToggleView={onToggleView} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.length > 0 ? (
              isWorkView ? (
                sortedProjects.map((project, idx) => (
                  <WorkCard key={project.slug || idx} {...project} />
                ))
              ) : (
                sortedSideProjects.map((project, idx) => (
                  <PlayCard
                    key={project.slug || idx}
                    title={project.title}
                    completionDate={project.completionDate}
                    cardImage={project.cardImage}
                    onClick={() => setSelectedSideProject(project)}
                  />
                ))
              )
            ) : (
              <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
            )}
          </div>
        </div>
      </section>

      {selectedSideProject && (
        <SideProjectModal
          project={selectedSideProject}
          onClose={() => setSelectedSideProject(null)}
        />
      )}
    </>
  );
}
