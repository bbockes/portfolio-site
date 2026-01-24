import { WorkCard } from './WorkCard';

const projects = [
  {
    title: "Website updates to an online lighting store",
    tags: ["SEO", "CRO", "IA", "Copywriting"],
    bgColor: "#B8DED4", // Mint green
    image: true,
  },
  {
    title: "SEO for a local painting company",
    tags: ["SEO", "Content Strategy", "IA"],
    bgColor: "#F7E5A1", // Yellow
    image: true,
  },
  {
    title: "A form redesign for a home services company",
    tags: ["UX/UI", "CRO", "UX Writing"],
    bgColor: "#F4C6C6", // Pink/coral
    image: true,
  },
  {
    title: "An eCommerce store for cookbooks",
    tags: ["UX/UI", "Prototyping", "UX Writing"],
    bgColor: "#E8DCC5", // Beige
    image: true,
  },
  {
    title: "A webpage redesign for PETA",
    tags: ["UX/UI", "Content Design", "UX Writing"],
    bgColor: "#C8E0F0", // Light blue
    image: true,
  },
];

export function WorkSection() {
  return (
    <section className="pt-0 pb-12 md:pt-0 md:pb-16 px-8 md:px-16" id="work">
      <div className="max-w-[960px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <WorkCard key={idx} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
