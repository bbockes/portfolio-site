import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import { sanityClient } from '../lib/sanityClient';
import { Maximize2, X } from 'lucide-react';

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
  description: any[]; // Portable text block content
  additionalInfo?: any[]; // Portable text block content
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
  description: [
    {
      _type: 'block',
      _key: 'desc1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'desc1span',
          text: "Community Cookbook is an eCommerce store that sells cookbooks, and that provides resources to help users make informed choices about the cookbooks they buy. This personal project was born out of my passion for food, cooking, and cookbooks in general.",
          marks: [],
        },
      ],
    },
  ],
  additionalInfo: [
    {
      _type: 'block',
      _key: 'add1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'add1span',
          text: "I started by conducting user interviews and a survey, which provided key insights into the needs and frustrations of cookbook enthusiasts—people who regularly cook and use cookbooks at home and take pride in creating meals for themselves or for friends.",
          marks: [],
        },
      ],
    },
  ],
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
  const [fullscreenContent, setFullscreenContent] = useState<{
    type: 'image' | 'video';
    url: string;
    caption?: string;
  } | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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
          description[],
          additionalInfo[],
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

  const openFullscreen = (type: 'image' | 'video', url: string, caption?: string) => {
    if (typeof window !== 'undefined') {
      setScrollPosition(window.scrollY);
    }
    setFullscreenContent({ type, url, caption });
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeFullscreen = () => {
    const savedPosition = scrollPosition;
    setFullscreenContent(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    if (typeof window !== 'undefined') {
      window.scrollTo(0, savedPosition);
    }
  };

  useEffect(() => {
    if (!fullscreenContent || typeof window === 'undefined') return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeFullscreen();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullscreenContent]);

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
    <>
      {fullscreenContent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close fullscreen"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-[95vw] max-h-[95vh] flex items-center justify-center">
            {fullscreenContent.type === 'image' ? (
              <img
                src={fullscreenContent.url}
                alt={fullscreenContent.caption || 'Fullscreen image'}
                className="max-w-full max-h-[95vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <video
                src={fullscreenContent.url}
                controls
                autoPlay
                className="max-w-full max-h-[95vh]"
                onClick={(e) => e.stopPropagation()}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          {fullscreenContent.caption && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded">
              {fullscreenContent.caption}
            </p>
          )}
        </div>
      )}
    <div>
      {/* Hero Section - Full Width */}
      {project.heroImage && (
        <div className="relative w-full h-[400px] lg:h-[534px] mb-16">
          <img 
            src={project.heroImage.asset.url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end items-center px-8 md:px-16 pb-12 lg:pb-16 bg-black bg-opacity-50">
            <div className="text-center max-w-[1200px]">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-xl text-white">
                  {project.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="px-8 md:px-16 pb-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Logo + Challenge/Solution/Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* Project Logo */}
            {project.logo && (
              <div className="lg:col-span-1 flex justify-center lg:justify-start">
                <img 
                  src={project.logo.asset.url}
                  alt={`${project.title} logo`}
                  className="w-full max-w-[200px] lg:max-w-[240px] h-auto object-cover rounded-lg"
                />
              </div>
            )}
            
            {/* Three text columns */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.challenge && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Challenge
                  </h2>
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Solution
                  </h2>
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {project.solution}
                  </p>
                </div>
              )}
              {project.results && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Results
                  </h2>
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {project.results}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Description + Additional Info Grid */}
          {(project.description || project.additionalInfo) && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {project.description && (
                <div className="lg:col-span-2">
                  <div className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    <PortableText
                      value={project.description}
                      components={{
                        block: {
                          normal: ({ children }) => <p className="mb-4">{children}</p>,
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
                      }}
                    />
                  </div>
                </div>
              )}
              {project.additionalInfo && (
                <div className="lg:col-span-1">
                  <div className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    <PortableText
                      value={project.additionalInfo}
                      components={{
                        block: {
                          normal: ({ children }) => <p className="mb-4">{children}</p>,
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
                      }}
                    />
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Content Blocks */}
          <div className="space-y-8 md:space-y-12 lg:space-y-16">
            {project.contentBlocks?.map((block) => (
              <div key={block._key}>
                {block._type === 'textBlock' && (
                  <div className="max-w-3xl mx-auto">
                    {block.heading && (
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {block.heading}
                      </h2>
                    )}
                    {block.text && (
                      <div className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
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
                  <div className="w-full md:max-w-[700px] lg:max-w-[900px] mx-auto relative group">
                    <div 
                      className="cursor-pointer"
                      onClick={() => openFullscreen('image', block.image!.asset.url, block.caption)}
                    >
                      <img 
                        src={block.image.asset.url}
                        alt={block.caption || ''}
                        className="w-full"
                      />
                      <div className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded transition-all opacity-0 group-hover:opacity-100">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                    {block.caption && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                        {block.caption}
                      </p>
                    )}
                  </div>
                )}

                {block._type === 'videoBlock' && (
                  <div className="w-full md:max-w-[700px] lg:max-w-[900px] mx-auto relative group">
                    {block.videoType === 'upload' && block.videoFile?.asset?.url ? (
                      <div className="relative group" style={{ paddingBottom: '64.22%' }}>
                        <video 
                          src={block.videoFile.asset.url}
                          controls
                          className="absolute top-0 left-0 w-full h-full object-contain bg-black"
                        >
                          Your browser does not support the video tag.
                        </video>
                        <div 
                          className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-10"
                          onClick={() => openFullscreen('video', block.videoFile!.asset.url, block.caption)}
                        >
                          <Maximize2 className="w-5 h-5" />
                        </div>
                      </div>
                    ) : block.videoType === 'embed' && block.embedUrl ? (
                      <div className="relative w-full" style={{ paddingBottom: '64.22%' }}>
                        <iframe
                          src={getEmbedUrl(block.embedUrl)}
                          className="absolute top-0 left-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="Video player"
                        />
                      </div>
                    ) : null}
                    {block.caption && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                        {block.caption}
                      </p>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* More Projects */}
          <div className="mt-24 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              More Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {moreProjects.length > 0 ? (
                moreProjects.map((proj) => (
                  <Link 
                    key={proj.slug}
                    to={`/work/${proj.slug}`}
                    className="group"
                  >
                    <div className="mb-4 overflow-hidden rounded-lg shadow-md">
                      {proj.screenshot?.asset?.url ? (
                        <img 
                          src={proj.screenshot.asset.url}
                          alt={proj.title}
                          className="w-full max-w-full md:max-w-[350px] lg:max-w-[405px] h-auto transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full max-w-full md:max-w-[350px] lg:max-w-[405px] aspect-[3/2] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
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
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 pt-8">
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
          </footer>

        </div>
      </div>
    </div>
    </>
  );
}
