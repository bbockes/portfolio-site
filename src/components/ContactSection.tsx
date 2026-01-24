export function ContactSection() {
  return (
    <section className="py-16 md:py-20 px-8 md:px-16 bg-gray-800 dark:bg-gray-800">
      <div className="max-w-[960px] mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          Like to get in touch?
        </h2>
        <p className="text-base md:text-lg text-gray-300 dark:text-gray-200">
          Find me on{' '}
          <a
            href="https://www.linkedin.com/in/brendan-bockes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
          >
            Linkedin
          </a>
          {' '}or send an{' '}
          <a
            href="mailto:brendanbockes@gmail.com"
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
          >
            email
          </a>
          .
        </p>
      </div>
    </section>
  );
}
