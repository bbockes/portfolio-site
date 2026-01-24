import React from 'react';
import { ContactSectionDetailed } from './ContactSectionDetailed';

export function AboutPage() {
  return (
    <>
    <div className="px-8 md:px-16 py-12 md:py-16">
      <div className="max-w-[960px] mx-auto">
        
        {/* Work Section */}
        <section className="mb-20 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Image */}
            <div className="flex items-start justify-center md:justify-start">
              <div className="bg-white p-3 shadow-lg transform -rotate-3 w-full max-w-md">
                <img 
                  src="/images/brendan-photo.jpg" 
                  alt="Brendan Bockes"
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Right: Content */}
            <div className="mb-5">
              <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-6">
                Work
              </h2>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 dark:text-gray-300">
                <p>
                  I've spent half a decade helping businesses market themselves online, and, before that, assisting customers on retail floors and behind counters.
                </p>
                <p>
                  Along the way, I've learned countless lessons about what it means to be a curious and empathetic human and a collaborative team player. And I've seen first-hand how asking the right questions can make a world of difference.
                </p>
                <p>
                  With the right approach, I believe we can create sites and apps that are a joy to use and that genuinely add value to those who use them—and I love getting the chance everyday to make it happen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fun Section */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Content */}
            <div className="mb-5">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
                Fun
              </h2>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 dark:text-gray-300">
                <p>
                  I'm a Northern Virginia native who likes to read, cook, and make things.
                </p>
                <p>
                  On the weekends, I'll take long walks in nearby parks, or roam around DC in search of friends and food.
                </p>
                <p>
                  I also{' '}
                  <a 
                    href="https://blog.brendanbockes.com"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors"
                  >
                    blog
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Right: Photo Collage */}
            <div className="flex items-start justify-center md:justify-end">
              <div className="bg-white p-3 shadow-lg transform rotate-3 w-full max-w-md">
                <img 
                  src="/images/collage.jpg" 
                  alt="Photo collage"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
    <ContactSectionDetailed />
    </>
  );
}
