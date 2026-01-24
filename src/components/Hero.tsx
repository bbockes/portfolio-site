import React from 'react';

export function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
          Websites made <span className="italic">better</span>.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mt-8">
          From content and design to visibility and performance.
        </p>
      </div>
    </section>
  );
}
