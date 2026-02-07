import { useState, useEffect } from 'react';
import { WorkCard } from './WorkCard';
import { sanityClient } from '../lib/sanityClient';

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

export function WorkSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
        
        if (!projectId || projectId === 'placeholder') {
          console.error('Sanity project ID not configured. Check environment variables.');
          setLoading(false);
          return;
        }
        
        const query = `*[_type == "project"] | order(_createdAt desc) {
          title,
          tags,
          bgColor,
          "slug": slug.current,
          screenshot {
            asset-> {
              url
            }
          }
        }`;
        
        const data = await sanityClient.fetch<Project[]>(query);
        console.log('Fetched projects:', data);
        setProjects(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="pt-0 pb-12 md:pt-0 md:pb-16 px-8 md:px-16" id="work">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Work
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-0 pb-12 md:pt-0 md:pb-16 px-8 md:px-16" id="work">
      <div className="max-w-[960px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.length > 0 ? (
            projects.map((project, idx) => (
              <WorkCard key={project.slug || idx} {...project} />
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No projects found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
