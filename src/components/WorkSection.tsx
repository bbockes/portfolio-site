import React from 'react';
import { WorkCard } from './WorkCard';

const projects = [
  {
    title: "Website updates to an online lighting store",
    tags: ["SEO", "CRO", "UX", "Writing"],
  },
  {
    title: "SEO for a local painting company",
    tags: ["SEO", "Content Strategy", "IA"],
  },
  {
    title: "A form redesign for a home services company",
    tags: ["UX/UI", "CRO", "UX Writing"],
  },
  {
    title: "An eCommerce store for cookbooks",
    tags: ["UX/UI", "Prototyping", "UX Writing"],
  },
  {
    title: "A webpage redesign for PETA",
    tags: ["UX/UI", "Content Design", "UX Writing"],
  },
  {
    title: "Our brand redesigned",
    tags: ["Branding", "Design"],
  },
];

export function WorkSection() {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50" id="work">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900 dark:text-white">
          Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <WorkCard key={idx} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
