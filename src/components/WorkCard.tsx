import React from 'react';

interface WorkCardProps {
  title: string;
  tags: string[];
  link?: string;
}

export function WorkCard({ title, tags, link = '#' }: WorkCardProps) {
  return (
    <a 
      href={link}
      className="block p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg transition-all group bg-white dark:bg-gray-800"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span 
            key={idx}
            className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
