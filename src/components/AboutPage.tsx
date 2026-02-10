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
              <div className="transform -rotate-3 w-full max-w-[358px]" style={{ transform: 'rotate(-3deg) translateX(20px)' }}>
                <img 
                  src="/images/work.png" 
                  alt="Work"
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Right: Content */}
            <div className="mb-5">
              <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-6">
                Work
              </h2>
              <div className="space-y-4 text-xl text-gray-700 dark:text-gray-300">
                <p>
                  I've spent half a decade helping businesses market themselves online, and, before that, assisting customers on retail floors and behind counters.
                </p>
                <p>
                  From talking to people to building digital products, I've learned how empathy and the right questions can change everything.
                </p>
                <p>
                  That's how I build sites and apps that are a joy to use and genuinely add value. It's no secret—great digital experiences start with care.
                </p>
                <p>
                  View resume
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fun Section */}
        <section className="relative" style={{ minHeight: '600px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Content */}
            <div className="mb-5">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
                Fun
              </h2>
              <div className="space-y-4 text-xl text-gray-700 dark:text-gray-300">
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
            <div className="flex items-start justify-center md:justify-end md:absolute" style={{ top: '-75px', right: '-100px' }}>
              <div className="transform rotate-3" style={{ width: '636px', maxWidth: '100%' }}>
                <img 
                  src="/images/fun.png" 
                  alt="Fun"
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
