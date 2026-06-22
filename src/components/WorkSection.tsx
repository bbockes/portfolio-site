import { useState, useEffect, useMemo } from 'react';
import { WorkCard } from './WorkCard';
import { PlayCard } from './PlayCard';
import { SideProjectModal, type SideProjectDetail } from './SideProjectModal';
import type { SectionView } from './ViewToggle';
import { sanityClient } from '../lib/sanityClient';
import { contentBlocksQuery } from '../shared/contentBlockTypes';

export type { SectionView };

interface Project {
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

interface SideProject extends SideProjectDetail {
  cardImage?: {
    asset: {
      url: string;
    };
  };
}

export function WorkSection({ view }: { view: SectionView }) {
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
            projectType,
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
            projectType,
            "slug": slug.current,
            completionDate,
            cardImage {
              asset-> {
                url
              }
            },
            ${contentBlocksQuery}
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
                    projectType={project.projectType}
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
