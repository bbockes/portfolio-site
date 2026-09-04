import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sanityClient } from '../lib/sanityClient';
import { ScrollReveal } from '../shared/ScrollReveal';
import { ContentBlocks } from './ContentBlocks';
import {
  caseStudyBreakoutClass,
  caseStudyContentWidthClass,
} from '../shared/caseStudyLayout';
import { contentBlocksQuery, type ContentBlock } from '../shared/contentBlockTypes';

const moreProjectCardImageClass =
  'mb-4 w-full aspect-[3/1.9] overflow-hidden rounded-lg shadow-md';
const moreProjectCardImageImgClass =
  'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105';

interface Project {
  title: string;
  slug: string;
  subtitle?: string;
  heroImage?: {
    asset: {
      url: string;
    };
  };
  logo?: {
    asset: {
      url: string;
    };
  };
  tags: string[];
  challenge?: string;
  solution?: string;
  results?: string;
  projectType?: string;
  role?: string;
  year?: string;
  contentBlocks: ContentBlock[];
}

// PLACEHOLDER DATA - DELETE THIS WHEN YOU HAVE REAL CONTENT IN SANITY
const placeholderProject: Project = {
  title: "Community Cookbook",
  slug: "placeholder",
  subtitle: "An eCommerce store for cookbooks.",
  heroImage: {
    asset: {
      url: "https://placehold.co/2560x1440/9ca3af/ffffff?text=Hero+Image+(2560x1440)"
    }
  },
  logo: {
    asset: {
      url: "https://placehold.co/400x400/f9e4bc/6b5b3e?text=Project+Logo+(400x400)"
    }
  },
  tags: ["UX/UI", "Design", "Research", "Prototyping"],
  challenge: "How can we create a great experience for users that helps the business sell more books?",
  solution: "Tools that enable users to find new cookbooks they'll love.",
  results: "LOTS of positive reviews.",
  projectType: "Personal Project",
  role: "UX/UI Designer",
  year: "2023",
  contentBlocks: [
    {
      _key: "1",
      _type: "textBlock",
      heading: "The Challenge",
      text: [
        {
          _type: 'block',
          _key: 'challenge1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'challenge1span',
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _key: "2",
      _type: "imageBlock",
      image: {
        asset: {
          url: "https://placehold.co/2560x1600/d1d5db/9ca3af?text=Project+Screenshot+(2560px+wide)"
        }
      },
      caption: "Example screenshot showing the main interface"
    },
    {
      _key: "3",
      _type: "textBlock",
      heading: "Research & Discovery",
      text: [
        {
          _type: 'block',
          _key: 'research1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'research1span',
              text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _key: "4",
      _type: "imageBlock",
      image: {
        asset: {
          url: "https://placehold.co/2560x1400/e5e7eb/9ca3af?text=User+Research+(2560px+wide)"
        }
      },
      caption: "User research findings and personas"
    },
    {
      _key: "5",
      _type: "textBlock",
      heading: "The Solution",
      text: [
        {
          _type: 'block',
          _key: 'solution1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'solution1span',
              text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.\n\nSimilique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _key: "6",
      _type: "imageBlock",
      image: {
        asset: {
          url: "https://placehold.co/2560x1500/d1d5db/9ca3af?text=Final+Design+(2560px+wide)"
        }
      },
      caption: "Final design implementation"
    },
    {
      _key: "7",
      _type: "textBlock",
      heading: "Results & Impact",
      text: [
        {
          _type: 'block',
          _key: 'results1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'results1span',
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.\n\nRisus commodo viverra maecenas accumsan lacus vel facilisis. Ut sem viverra aliquet eget sit amet tellus cras adipiscing.",
              marks: [],
            },
          ],
        },
      ],
    }
  ]
};
// END PLACEHOLDER DATA

export function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [moreProjects, setMoreProjects] = useState<Array<{
    title: string;
    subtitle?: string;
    slug: string;
    screenshot?: {
      asset: {
        url: string;
      };
    };
  }>>([]);
  useEffect(() => {
    setLoading(true);
    setProject(null);
    
    const fetchProject = async () => {
      // CHECK FOR PLACEHOLDER - DELETE THIS BLOCK WHEN YOU HAVE REAL SANITY CONTENT
      if (slug === 'placeholder') {
        setProject(placeholderProject);
        setLoading(false);
        return;
      }
      // END PLACEHOLDER CHECK

      try {
        const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
        const dataset = import.meta.env.VITE_SANITY_DATASET;
        
        if (!projectId || projectId === 'placeholder') {
          console.error('Sanity project ID not configured. Check environment variables.');
          setLoading(false);
          return;
        }
        
        console.log('Fetching project with slug:', slug);
        console.log('Sanity client config:', {
          projectId,
          dataset,
        });
        
        const query = `*[_type == "project" && slug.current == $slug][0] {
          title,
          "slug": slug.current,
          subtitle,
          heroImage {
            asset-> {
              url
            }
          },
          logo {
            asset-> {
              url
            }
          },
          tags,
          challenge,
          solution,
          results,
          projectType,
          role,
          year,
          ${contentBlocksQuery}
        }`;
        
        const data = await sanityClient.fetch(query, { slug });
        console.log('Fetched project data:', data);
        
        if (!data) {
          console.warn('No project found with slug:', slug);
        }
        
        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  useEffect(() => {
    const fetchMoreProjects = async () => {
      try {
        const query = `*[_type == "project" && slug.current != $currentSlug] | order(_createdAt desc) [0...3] {
          title,
          subtitle,
          "slug": slug.current,
          screenshot {
            asset-> {
              url
            }
          }
        }`;
        
        const data = await sanityClient.fetch(query, { currentSlug: slug });
        setMoreProjects(data || []);
      } catch (error) {
        console.error('Error fetching more projects:', error);
      }
    };

    if (slug) {
      fetchMoreProjects();
    }
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

  const hasTags = project.tags && project.tags.length > 0;
  const metadataFields = [
    { label: 'Project Type', value: project.projectType },
    { label: 'Role', value: project.role },
    { label: 'Year', value: project.year },
  ].filter((field) => field.value);

  return (
    <div>
      {/* Hero Section - Full Width */}
      {project.heroImage && (
        <div className="relative w-full mb-12 md:mb-16 lg:mb-20">
          <img 
            src={project.heroImage.asset.url}
            alt={project.title}
            className="block w-full h-auto"
          />
          <div className="absolute inset-0 flex flex-col justify-end items-center px-8 md:px-16 pb-12 lg:pb-16 bg-black bg-opacity-50">
            <div className="text-center max-w-[1200px]">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-hero-rise opacity-0">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-xl text-white animate-hero-rise opacity-0 [animation-delay:320ms]">
                  {project.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="pb-12 md:pb-16">
        <div className={caseStudyBreakoutClass}>
          <div className={`${caseStudyContentWidthClass} overflow-visible`}>

          {/* Logo + Challenge/Solution/Results — uses grid so col-2 left edge = text block left edge */}
          <div className="grid grid-cols-1 lg:grid-cols-[calc(50%-350px)_1fr] mb-16 md:mb-16 lg:mb-20">
            {project.logo ? (
              <div className="flex justify-center lg:justify-center lg:items-start animate-slide-in-left opacity-0 [animation-delay:0ms] [animation-duration:0.9s] mb-8 lg:mb-0">
                <img
                  src={project.logo.asset.url}
                  alt={`${project.title} logo`}
                  className="w-[150px] h-[150px] lg:w-[180px] lg:h-[180px] object-contain"
                />
              </div>
            ) : (
              <div className="hidden lg:block" />
            )}

            <div className="flex flex-col gap-8">
              {(project.challenge || project.solution || project.results) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-8 animate-slide-in-left opacity-0 [animation-delay:250ms] [animation-duration:0.9s]">
                    {project.challenge && (
                      <>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          Challenge
                        </h2>
                        <p className="text-lg leading-[1.6] text-gray-700 dark:text-gray-300">
                          {project.challenge}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-8 animate-slide-in-left opacity-0 [animation-delay:500ms] [animation-duration:0.9s]">
                    {project.solution && (
                      <>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          Solution
                        </h2>
                        <p className="text-lg leading-[1.6] text-gray-700 dark:text-gray-300">
                          {project.solution}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-8 animate-slide-in-left opacity-0 [animation-delay:750ms] [animation-duration:0.9s]">
                    {project.results && (
                      <>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          Results
                        </h2>
                        <p className="text-lg leading-[1.6] text-gray-700 dark:text-gray-300">
                          {project.results}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {(metadataFields.length > 0 || hasTags) && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 lg:pt-8">
                  <div className="flex flex-wrap items-start gap-x-10 lg:gap-x-12 gap-y-4">
                    {metadataFields.map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                          {label}
                        </p>
                        <p className="text-lg leading-[1.6] text-gray-700 dark:text-gray-300">
                          {value}
                        </p>
                      </div>
                    ))}
                    {hasTags && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                          Areas of Expertise
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md ring-1 ring-gray-300 dark:ring-gray-600 bg-white dark:bg-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Blocks */}
          <ContentBlocks blocks={project.contentBlocks} />

          {/* More Projects */}
          <ScrollReveal className="mt-24 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              More Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full md:w-[min(1440px,calc(100vw-8rem))]">
              {moreProjects.length > 0 ? (
                moreProjects.map((proj) => (
                  <Link
                    key={proj.slug}
                    to={`/work/${proj.slug}`}
                    className="group flex flex-col w-full"
                  >
                    <div className={moreProjectCardImageClass}>
                      {proj.screenshot?.asset?.url ? (
                        <img
                          src={proj.screenshot.asset.url}
                          alt={proj.title}
                          className={moreProjectCardImageImgClass}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No image</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 inline-block group-hover:underline">
                      {proj.title}
                    </h3>
                    {proj.subtitle && (
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        {proj.subtitle}
                      </p>
                    )}
                  </Link>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No other projects found.</p>
              )}
            </div>
          </ScrollReveal>

          {/* Footer */}
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
    </div>
  );
}
