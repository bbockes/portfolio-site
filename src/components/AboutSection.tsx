export function AboutSection() {
  return (
    <section className="py-20 px-6" id="about">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
          About
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            I'm a web strategist focused on making websites better through content, design, 
            visibility, and performance optimization. With expertise spanning UX/UI design, 
            SEO, conversion rate optimization, and UX writing, I help businesses create 
            digital experiences that both users and search engines love.
          </p>
        </div>
      </div>
    </section>
  );
}
