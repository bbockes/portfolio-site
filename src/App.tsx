import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';

export function App() {
  return (
    <Layout>
      <Hero />
      <WorkSection />
      <AboutSection />
      <ContactSection />
    </Layout>
  );
}
