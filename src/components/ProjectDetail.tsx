import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import { sanityClient } from '../lib/sanityClient';
import { ScrollReveal } from '../shared/ScrollReveal';

const caseStudyMediaFrameClass =
  'relative w-full max-w-[1310px] aspect-[1310/854] overflow-hidden';
const caseStudyVideoFrameClass =
  'relative mx-auto flex items-center justify-center bg-black aspect-[1310/854] w-[min(100%,1310px,calc((100dvh-4rem)*1310/854))]';
const caseStudyMediaClass = 'w-full h-full object-cover';
const caseStudyVideoClass = 'max-h-full max-w-full object-contain';
const caseStudyMediaSectionClass =
  'relative w-screen left-1/2 -translate-x-1/2 flex flex-col items-center px-8 md:px-16';
const caseStudyBreakoutClass =
  'relative w-screen left-1/2 -translate-x-1/2 px-8 md:px-16';
const caseStudyContentWidthClass = 'mx-auto w-full max-w-[1310px]';
const caseStudyCaptionClass =
  'text-base leading-[1.6] text-gray-500 dark:text-gray-400 text-center w-full';
const caseStudyCaptionSlotClass =
  'flex w-full max-w-[736px] items-start justify-center mx-auto min-h-[2.5rem] pt-4 md:pt-6 lg:pt-8';
const contentBlockGapClass =
  'mb-[3rem] md:mb-[4.5rem] lg:mb-[6rem] last:mb-0';

// ~457×295 — ~10% larger than prior 415×268; same 3/1.9 ratio as WorkCard
const moreProjectCardImageClass =
  'mb-4 w-full aspect-[3/1.9] overflow-hidden rounded-lg shadow-md';
const moreProjectCardImageImgClass =
  'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105';

type ImageSize = 'large' | 'small' | 'wide';

function getCaseStudyImageSectionClass(size?: ImageSize) {
  switch (size) {
    case 'small':
      return 'flex flex-col items-center px-8 md:px-16';
    case 'wide':
      return 'relative w-screen left-1/2 -translate-x-1/2 flex flex-col items-center';
    default:
      return caseStudyMediaSectionClass;
  }
}

function getCaseStudyImageFrameClass(size?: ImageSize) {
  switch (size) {
    case 'small':
      return 'relative w-full max-w-[655px] aspect-[1310/854] overflow-hidden';
    case 'wide':
      return 'relative w-full overflow-hidden h-[min(calc(100vw*854/1310),calc(100dvh-6.5rem))]';
    default:
      return caseStudyMediaFrameClass;
  }
}

function getCaseStudyCaptionSlotClass(size?: ImageSize) {
  switch (size) {
    case 'small':
      return 'flex w-full max-w-[368px] items-start justify-center mx-auto min-h-[2.5rem] pt-4 md:pt-6 lg:pt-8';
    case 'wide':
      return `${caseStudyCaptionSlotClass} px-8 md:px-16`;
    default:
      return caseStudyCaptionSlotClass;
  }
}

interface ContentBlock {
  _key: string;
  _type: 'textBlock' | 'imageBlock' | 'videoBlock';
  heading?: string;
  text?: any[]; // Portable text block content
  image?: {
    asset: {
      url: string;
    };
  };
  caption?: string;
  imageSize?: ImageSize;
  videoType?: 'upload' | 'embed';
  videoFile?: {
    asset: {
      url: string;
    };
  };
  embedUrl?: string;
}

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
      url: "https://placehold.co/3650x1068/9ca3af/ffffff?text=Hero+Image+(1825x534)"
    }
  },
  logo: {
    asset: {
      url: "https://placehold.co/480x400/f9e4bc/6b5b3e?text=Project+Logo+(240x200)"
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
          url: "https://placehold.co/1800x1200/d1d5db/9ca3af?text=Project+Screenshot+(900x600)"
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
          url: "https://placehold.co/1800x1200/e5e7eb/9ca3af?text=User+Research+(900x600)"
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
          url: "https://placehold.co/1800x1200/d1d5db/9ca3af?text=Final+Design+(900x600)"
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

function getEmbedUrl(url: string): string {
  if (!url) return '';
  
  // Check if already an embed URL
  if (url.includes('/embed/')) return url;
  
  // YouTube URL conversion
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  
  // Vimeo URL conversion
  const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  
  // Return as-is if it's already an embed URL or other format
  return url;
}



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
          contentBlocks[] {
            _key,
            _type,
            heading,
            text[],
            image {
              asset-> {
                url
              }
            },
            caption,
            imageSize,
            videoType,
            videoFile {
              asset-> {
                url
              }
            },
            embedUrl
          }
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

          {/* Logo + Challenge/Solution/Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12 md:mb-16 lg:mb-20">
            {project.logo && (
              <div className="lg:col-span-1 flex justify-center lg:justify-start animate-slide-in-left opacity-0 [animation-delay:0ms] [animation-duration:0.9s]">
                <img 
                  src={project.logo.asset.url}
                  alt={`${project.title} logo`}
                  className="w-full max-w-[200px] lg:max-w-[240px] h-auto max-h-[280px] object-contain"
                />
              </div>
            )}
            
            <div className="lg:col-span-3 flex flex-col gap-8">
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
                        <div className="flex flex-nowrap gap-3">
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="shrink-0 whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md ring-1 ring-gray-300 dark:ring-gray-600 bg-white dark:bg-gray-800"
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
          <div>
            {project.contentBlocks?.map((block) => (
              <ScrollReveal key={block._key} className={contentBlockGapClass}>
                {block._type === 'textBlock' && (
                  <div className="max-w-3xl mx-auto">
                    {block.heading && (
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {block.heading}
                      </h2>
                    )}
                    {block.text && (
                      <div className="text-xl md:text-[1.375rem] lg:text-2xl text-gray-700 dark:text-gray-300 leading-[1.8]">
                        <PortableText
                          value={block.text}
                          components={{
                            block: {
                              normal: ({ children }) => <p className="mb-4">{children}</p>,
                              h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-6">{children}</h2>,
                              h3: ({ children }) => <h3 className="text-xl font-bold mb-3 mt-4">{children}</h3>,
                            },
                            marks: {
                              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                              em: ({ children }) => <em className="italic">{children}</em>,
                              link: ({ value, children }) => (
                                <a href={value?.href} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                                  {children}
                                </a>
                              ),
                            },
                            list: {
                              bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                              number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
                            },
                            listItem: {
                              bullet: ({ children }) => <li>{children}</li>,
                              number: ({ children }) => <li>{children}</li>,
                            },
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {block._type === 'imageBlock' && block.image && (
                  <figure className={getCaseStudyImageSectionClass(block.imageSize)}>
                    <div className={getCaseStudyImageFrameClass(block.imageSize)}>
                      <img
                        src={block.image.asset.url}
                        alt={block.caption || ''}
                        className={caseStudyMediaClass}
                      />
                    </div>
                    <div className={getCaseStudyCaptionSlotClass(block.imageSize)}>
                      {block.caption && (
                        <figcaption className={caseStudyCaptionClass}>
                          {block.caption}
                        </figcaption>
                      )}
                    </div>
                  </figure>
                )}

                {block._type === 'videoBlock' && (
                  <figure className={caseStudyMediaSectionClass}>
                    {block.videoType === 'upload' && block.videoFile?.asset?.url ? (
                      <div className={caseStudyVideoFrameClass}>
                        <video
                          src={block.videoFile.asset.url}
                          controls
                          className={caseStudyVideoClass}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : block.videoType === 'embed' && block.embedUrl ? (
                      <div className={`${caseStudyVideoFrameClass} overflow-hidden`}>
                        <iframe
                          src={getEmbedUrl(block.embedUrl)}
                          className="absolute inset-0 h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="Video player"
                        />
                      </div>
                    ) : null}
                    <div className={caseStudyCaptionSlotClass}>
                      {block.caption && (
                        <figcaption className={caseStudyCaptionClass}>
                          {block.caption}
                        </figcaption>
                      )}
                    </div>
                  </figure>
                )}
              </ScrollReveal>
            ))}
          </div>

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
