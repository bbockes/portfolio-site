import { useLayoutEffect, useRef, useState } from 'react';
import { PortableText } from '@portabletext/react';

const bodyTextClass =
  'text-xl md:text-[1.375rem] lg:text-2xl text-gray-700 dark:text-gray-300 leading-[1.8] space-y-4';

export const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>,
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mt-6">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold mt-4">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
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
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  },
};

function shouldForceLeftAlign(text: any[]) {
  return text.some(
    (block) =>
      typeof block === 'object' &&
      block !== null &&
      ('listItem' in block ||
        ('style' in block && (block as { style?: string }).style !== 'normal'))
  );
}

function measureSingleParagraphLines(container: HTMLElement) {
  const paragraph = container.querySelector('p');
  if (!paragraph) return 1;

  const style = window.getComputedStyle(paragraph);
  const lineHeight = parseFloat(style.lineHeight);
  if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
    return paragraph.getClientRects().length;
  }

  return Math.max(1, Math.round(paragraph.getBoundingClientRect().height / lineHeight));
}

export function PlayAdaptiveText({ text }: { text: any[] }) {
  const textRef = useRef<HTMLDivElement>(null);
  const [align, setAlign] = useState<'center' | 'left'>('left');

  useLayoutEffect(() => {
    const updateAlignment = () => {
      if (text.length > 1 || shouldForceLeftAlign(text)) {
        setAlign('left');
        return;
      }

      const container = textRef.current;
      if (!container) return;

      setAlign(measureSingleParagraphLines(container) <= 1 ? 'center' : 'left');
    };

    updateAlignment();

    const container = textRef.current;
    if (!container || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateAlignment);
      return () => window.removeEventListener('resize', updateAlignment);
    }

    const observer = new ResizeObserver(updateAlignment);
    observer.observe(container);
    window.addEventListener('resize', updateAlignment);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateAlignment);
    };
  }, [text]);

  return (
    <div
      ref={textRef}
      className={`${bodyTextClass} ${align === 'center' ? 'text-center' : ''}`}
    >
      <PortableText value={text} components={portableTextComponents} />
    </div>
  );
}
