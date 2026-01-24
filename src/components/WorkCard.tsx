import React from 'react';

interface WorkCardProps {
  title: string;
  tags: string[];
  bgColor: string;
  image?: string;
  link?: string;
}

export function WorkCard({ title, tags, bgColor, image, link = '#' }: WorkCardProps) {
  return (
    <a 
      href={link}
      className="block group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
    >
      {/* Image container with colored background */}
      <div 
        className="w-full aspect-[5/3] flex items-center justify-center p-6 md:p-8"
        style={{ backgroundColor: bgColor }}
      >
        {image && (
          <div className="w-full h-full bg-white rounded shadow-lg flex items-center justify-center text-gray-400 text-xs">
            {/* Placeholder for screenshot - you'll add real images later */}
            Screenshot
          </div>
        )}
      </div>
      
      {/* Content area */}
      <div className="p-5">
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-base">
          {tags.join(' · ')}
        </p>
      </div>
    </a>
  );
}
