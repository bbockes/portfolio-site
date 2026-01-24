import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sanityClient } from '../lib/sanityClient';

interface ContentBlock {
  _key: string;
  _type: 'textBlock' | 'imageBlock';
  heading?: string;
  text?: string;
  image?: {
    asset: {
      url: string;
    };
  };
  caption?: string;
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
  description: string;
  additionalInfo?: string;
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
  description: "Community Cookbook is an eCommerce store that sells cookbooks, and that provides resources to help users make informed choices about the cookbooks they buy. This personal project was born out of my passion for food, cooking, and cookbooks in general.",
  additionalInfo: "I started by conducting user interviews and a survey, which provided key insights into the needs and frustrations of cookbook enthusiasts—people who regularly cook and use cookbooks at home and take pride in creating meals for themselves or for friends.",
  contentBlocks: [
    {
      _key: "1",
      _type: "textBlock",
      heading: "The Challenge",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      _key: "2",
      _type: "imageBlock",
      image: {
        asset: {
          url: "https://placehold.co/1800x1000/d1d5db/9ca3af?text=Project+Screenshot+(900x500)"
        }
      },
      caption: "Example screenshot showing the main interface"
    },
    {
      _key: "3",
      _type: "textBlock",
      heading: "Research & Discovery",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
      _key: "4",
      _type: "imageBlock",
      image: {
        asset: {
          url: "https://placehold.co/1800x1000/e5e7eb/9ca3af?text=User+Research+(900x500)"
        }
      },
      caption: "User research findings and personas"
    },
    {
      _key: "5",
      _type: "textBlock",
      heading: "The Solution",
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.\n\nSimilique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio."
    },
    {
      _key: "6",
      _type: "imageBlock",
      image: {
        asset: {
          url: "https://placehold.co/1800x1000/d1d5db/9ca3af?text=Final+Design+(900x500)"
        }
      },
      caption: "Final design implementation"
    },
    {
      _key: "7",
      _type: "textBlock",
      heading: "Results & Impact",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.\n\nRisus commodo viverra maecenas accumsan lacus vel facilisis. Ut sem viverra aliquet eget sit amet tellus cras adipiscing."
    }
  ]
};
// END PLACEHOLDER DATA

// More projects data - matches WorkSection projects
const moreProjects = [
  {
    title: "Community Cookbook",
    subtitle: "An eCommerce store",
    slug: "cookbook-ecommerce",
    image: "https://placehold.co/810x540/e8dcc5/9ca3af?text=Community+Cookbook+(405x270)",
  },
  {
    title: "Project No-Kill",
    subtitle: "A webpage redesign",
    slug: "peta-webpage-redesign",
    image: "https://placehold.co/810x540/c8e0f0/9ca3af?text=Project+No-Kill+(405x270)",
  },
  {
    title: "Illuminaries",
    subtitle: "Website improvements",
    slug: "online-lighting-store",
    image: "https://placehold.co/810x540/b8ded4/9ca3af?text=Illuminaries+(405x270)",
  },
];

export function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      // CHECK FOR PLACEHOLDER - DELETE THIS BLOCK WHEN YOU HAVE REAL SANITY CONTENT
      if (slug === 'placeholder') {
        setProject(placeholderProject);
        setLoading(false);
        return;
      }
      // END PLACEHOLDER CHECK

      try {
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
          description,
          additionalInfo,
          contentBlocks[] {
            _key,
            _type,
            heading,
            text,
            image {
              asset-> {
                url
              }
            },
            caption
          }
        }`;
        
        const data = await sanityClient.fetch(query, { slug });
        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
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
      {/* Hero Section - Full Width */}
      {project.heroImage && (
        <div className="relative w-full h-[400px] lg:h-[534px] mb-16">
          <img 
            src={project.heroImage.asset.url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end items-center px-8 md:px-16 pb-12 lg:pb-16 bg-black bg-opacity-20">
            <div className="text-center max-w-[1200px]">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-lg sm:text-xl text-white">
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
            {/* Project Logo */}
            {project.logo && (
              <div className="lg:col-span-1">
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
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Challenge
                  </h2>
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.solution && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Solution
                  </h2>
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {project.solution}
                  </p>
                </div>
              )}
              {project.results && (
                <div>
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
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}
              {project.additionalInfo && (
                <div className="lg:col-span-1">
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.additionalInfo}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Content Blocks */}
          <div className="space-y-16">
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
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {block.text}
                      </p>
                    )}
                  </div>
                )}

                {block._type === 'imageBlock' && block.image && (
                  <div className="max-w-full md:max-w-[700px] lg:max-w-[900px] mx-auto">
                    <img 
                      src={block.image.asset.url}
                      alt={block.caption || ''}
                      className="w-full rounded-lg shadow-md"
                    />
                    {block.caption && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
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
              {moreProjects
                .filter(p => p.slug !== slug)
                .slice(0, 3)
                .map((proj, idx) => (
                  <Link 
                    key={idx}
                    to={`/work/${proj.slug}`}
                    className="group"
                  >
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={proj.image}
                        alt={proj.title}
                        className="w-full max-w-full md:max-w-[350px] lg:max-w-[405px] h-auto transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 inline-block group-hover:underline">
                      {proj.title}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      {proj.subtitle}
                    </p>
                  </Link>
                ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="py-8 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              Brendan Bockes · {new Date().getFullYear()}
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              Back to Top
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
