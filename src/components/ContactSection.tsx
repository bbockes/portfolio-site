import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

export function ContactSection() {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
          Like to get in touch?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Find me on LinkedIn or send an email.
        </p>
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/brendan-bockes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
          <a
            href="mailto:contact@brendanbockes.com"
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-colors font-semibold"
          >
            <Mail className="w-5 h-5" />
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
