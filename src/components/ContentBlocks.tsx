import { PortableText } from '@portabletext/react';
import { ScrollReveal } from '../shared/ScrollReveal';
import {
  caseStudyCaptionClass,
  caseStudyCaptionSlotClass,
  caseStudyImageClass,
  caseStudyImageFrameClass,
  caseStudyImageSectionClass,
  caseStudyTextWidthClass,
  caseStudyVideoClass,
  caseStudyVideoFrameClass,
  caseStudyVideoSectionClass,
  contentBlockGapClass,
} from '../shared/caseStudyLayout';
import type { ContentBlock } from '../shared/contentBlockTypes';
import { getEmbedUrl } from '../shared/getEmbedUrl';

export function ContentBlocks({
  blocks,
  contained = false,
}: {
  blocks?: ContentBlock[];
  contained?: boolean;
}) {
  if (!blocks?.length) return null;

  const gapClass = contained ? 'gap-8 md:gap-12' : contentBlockGapClass;
  const textWidthClass = contained ? 'w-full' : caseStudyTextWidthClass;
  const imageSectionClass = contained ? 'm-0 w-full' : `${caseStudyImageSectionClass} m-0`;
  const videoSectionClass = contained ? 'm-0 w-full' : `${caseStudyVideoSectionClass} m-0`;
  const videoFrameClass = contained
    ? 'relative mx-auto flex aspect-[1310/854] w-full items-center justify-center bg-black overflow-hidden'
    : caseStudyVideoFrameClass;
  const BlockWrapper = contained ? 'div' : ScrollReveal;

  return (
    <div className={`flex flex-col ${gapClass}`}>
      {blocks.map((block) => (
        <BlockWrapper key={block._key}>
          {block._type === 'textBlock' && (
            <div className={textWidthClass}>
              {block.heading && (
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {block.heading}
                </h2>
              )}
              {block.text && (
                <div className="text-xl md:text-[1.375rem] lg:text-2xl text-gray-700 dark:text-gray-300 leading-[1.8] space-y-4">
                  <PortableText
                    value={block.text}
                    components={{
                      block: {
                        normal: ({ children }) => <p>{children}</p>,
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-bold mt-6">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-bold mt-4">{children}</h3>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-bold">{children}</strong>
                        ),
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
                      list: {
                        bullet: ({ children }) => (
                          <ul className="list-disc list-inside space-y-2">{children}</ul>
                        ),
                        number: ({ children }) => (
                          <ol className="list-decimal list-inside space-y-2">{children}</ol>
                        ),
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
            <figure className={imageSectionClass}>
              <div className={caseStudyImageFrameClass}>
                <img
                  src={block.image.asset.url}
                  alt={block.caption || ''}
                  className={caseStudyImageClass}
                  {...(block.image.asset.metadata?.dimensions
                    ? {
                        width: block.image.asset.metadata.dimensions.width,
                        height: block.image.asset.metadata.dimensions.height,
                      }
                    : {})}
                />
              </div>
              {block.caption && (
                <figcaption className={`${caseStudyCaptionSlotClass} ${caseStudyCaptionClass}`}>
                  {block.caption}
                </figcaption>
              )}
            </figure>
          )}

          {block._type === 'videoBlock' && (
            <figure className={videoSectionClass}>
              {block.videoType === 'upload' && block.videoFile?.asset?.url ? (
                <div className={videoFrameClass}>
                  <video src={block.videoFile.asset.url} controls className={caseStudyVideoClass}>
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : block.videoType === 'embed' && block.embedUrl ? (
                <div className={`${videoFrameClass} overflow-hidden`}>
                  <iframe
                    src={getEmbedUrl(block.embedUrl)}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Video player"
                  />
                </div>
              ) : null}
              {block.caption && (
                <figcaption className={`${caseStudyCaptionSlotClass} ${caseStudyCaptionClass}`}>
                  {block.caption}
                </figcaption>
              )}
            </figure>
          )}
        </BlockWrapper>
      ))}
    </div>
  );
}
