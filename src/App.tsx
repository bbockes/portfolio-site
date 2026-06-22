import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { WorkSection, type SectionView } from './components/WorkSection';
import { ContactSection } from './components/ContactSection';
import { AboutPage } from './components/AboutPage';
import { ProjectDetail } from './components/ProjectDetail';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Instant jump to top, no animation
  }, [pathname]);

  return null;
}

function HomePage() {
  const [view, setView] = useState<SectionView>('work');

  return (
    <>
      <Hero view={view} onViewChange={setView} />
      <WorkSection view={view} />
      <ContactSection />
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
