import { Mail, Linkedin } from 'lucide-react';

export function ContactSectionDetailed() {
  return (
    <section className="py-16 md:py-20 px-8 md:px-16 bg-gray-800 dark:bg-gray-800">
      <div className="max-w-[960px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left side - Heading */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white dark:text-white">
              Like to get in touch?
            </h2>
            <p className="text-xl text-gray-300">
              Reach out today and I'll get back to you soon!
            </p>
          </div>

          {/* Right side - Contact links */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-white flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold mb-1">Email</p>
                <a
                  href="mailto:brendanbockes@gmail.com"
                  className="text-gray-300 hover:text-blue-400 underline transition-colors"
                >
                  brendanbockes@gmail.com
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-start gap-3">
              <Linkedin className="w-5 h-5 text-white flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold mb-1">Linkedin</p>
                <a
                  href="https://www.linkedin.com/in/brendanbockes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 underline transition-colors break-all"
                >
                  https://www.linkedin.com/in/brendanbockes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
