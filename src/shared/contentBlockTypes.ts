export interface ContentBlock {
  _key: string;
  _type: 'textBlock' | 'imageBlock' | 'videoBlock' | 'fileBlock';
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
  file?: {
    asset: {
      url: string;
    };
  };
  linkText?: string;
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
  embedUrl,
  file {
    asset-> {
      url
    }
  },
  linkText
}`;
