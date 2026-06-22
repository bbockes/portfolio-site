import { PortableText } from '@portabletext/react';
import { ScrollReveal } from '../shared/ScrollReveal';
import { PlayAdaptiveText, portableTextComponents } from './PlayAdaptiveText';
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
  playProjectContentGapClass,
  playProjectImageClass,
  playProjectImageFrameClass,
  playProjectMediaSectionClass,
  playProjectTextWidthClass,
  playProjectVideoFrameClass,
} from '../shared/caseStudyLayout';
import type { ContentBlock } from '../shared/contentBlockTypes';
import { getEmbedUrl } from '../shared/getEmbedUrl';

export function ContentBlocks({
  blocks,
  contained = false,
  variant = 'default',
}: {
  blocks?: ContentBlock[];
  contained?: boolean;
  variant?: 'default' | 'play';
}) {
  if (!blocks?.length) return null;

  const isPlay = variant === 'play';
  const gapClass = isPlay
    ? playProjectContentGapClass
    : contained
      ? 'gap-8 md:gap-12'
      : contentBlockGapClass;
  const textWidthClass = isPlay
    ? playProjectTextWidthClass
    : contained
      ? 'w-full'
      : caseStudyTextWidthClass;
  const imageSectionClass = isPlay
    ? playProjectMediaSectionClass
    : contained
      ? 'm-0 w-full'
      : `${caseStudyImageSectionClass} m-0`;
  const imageFrameClass = isPlay ? playProjectImageFrameClass : caseStudyImageFrameClass;
  const imageClass = isPlay ? playProjectImageClass : caseStudyImageClass;
  const videoSectionClass = isPlay
    ? playProjectMediaSectionClass
    : contained
      ? 'm-0 w-full'
      : `${caseStudyVideoSectionClass} m-0`;
  const videoFrameClass = isPlay
    ? playProjectVideoFrameClass
    : contained
      ? 'relative mx-auto flex aspect-[1310/854] w-full items-center justify-center bg-black overflow-hidden'
      : caseStudyVideoFrameClass;
  const captionSlotClass = isPlay
    ? 'mt-3 md:mt-4 w-full max-w-[800px] mx-auto'
    : caseStudyCaptionSlotClass;
  const BlockWrapper = contained || isPlay ? 'div' : ScrollReveal;

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
              {block.text &&
                (isPlay ? (
                  <PlayAdaptiveText text={block.text} />
                ) : (
                  <div className="text-xl md:text-[1.375rem] lg:text-2xl text-gray-700 dark:text-gray-300 leading-[1.8] space-y-4">
                    <PortableText value={block.text} components={portableTextComponents} />
                  </div>
                ))}
            </div>
          )}

          {block._type === 'imageBlock' && block.image && (
            <figure className={imageSectionClass}>
              <div className={imageFrameClass}>
                <img
                  src={block.image.asset.url}
                  alt={block.caption || ''}
                  className={imageClass}
                  {...(block.image.asset.metadata?.dimensions
                    ? {
                        width: block.image.asset.metadata.dimensions.width,
                        height: block.image.asset.metadata.dimensions.height,
                      }
                    : {})}
                />
              </div>
              {block.caption && (
                <figcaption className={`${captionSlotClass} ${caseStudyCaptionClass}`}>
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
                <figcaption className={`${captionSlotClass} ${caseStudyCaptionClass}`}>
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
