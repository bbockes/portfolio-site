import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import { sanityClient } from '../lib/sanityClient';

interface SideProject {
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
          completionDate,
          heroImage {
            asset-> {
              url
            }
          },
          content[]
        }`;

        const data = await sanityClient.fetch(query, { slug });
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Project not found</p>
      </div>
    );
  }

  return (
    <div>
      {project.heroImage && (
        <div className="relative w-full min-h-[calc(100dvh-6.5rem)] mb-12 md:mb-16 lg:mb-20 overflow-hidden">
          <img
            src={project.heroImage.asset.url}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end items-center px-8 md:px-16 pb-12 lg:pb-16 bg-black bg-opacity-50">
            <div className="text-center max-w-[1200px]">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-hero-rise opacity-0">
                {project.title}
              </h1>
              {project.completionDate && (
                <p className="text-xl text-white animate-hero-rise opacity-0 [animation-delay:320ms]">
                  {formatCompletionDate(project.completionDate)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {project.content && project.content.length > 0 && (
        <div className="px-8 md:px-16 pb-12 md:pb-16">
          <div className="max-w-[700px] mx-auto text-xl md:text-[1.375rem] lg:text-2xl text-gray-700 dark:text-gray-300 leading-[1.8] space-y-4">
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
        </div>
      )}
    </div>
  );
}
