export interface ContentBlock {
  _key: string;
  _type: 'textBlock' | 'imageBlock' | 'videoBlock';
  heading?: string;
  text?: any[];
  image?: {
    asset: {
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
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

export const contentBlocksQuery = `contentBlocks[] {
  _key,
  _type,
  heading,
  text[],
  image {
    asset-> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
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
}`;
