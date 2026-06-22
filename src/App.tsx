import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { WorkSection, type SectionView } from './components/WorkSection';
import { ContactSection } from './components/ContactSection';
import { AboutPage } from './components/AboutPage';
import { ProjectDetail } from './components/ProjectDetail';
import { SideProjectDetail } from './components/SideProjectDetail';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Instant jump to top, no animation
  }, [pathname]);

  return null;
}

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get('view');
  const [view, setView] = useState<SectionView>(viewParam === 'play' ? 'play' : 'work');

  useEffect(() => {
    setView(viewParam === 'play' ? 'play' : 'work');
  }, [viewParam]);

  const handleViewChange = (nextView: SectionView) => {
    setView(nextView);
    if (nextView === 'play') {
      setSearchParams({ view: 'play' }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  return (
    <>
      <Hero view={view} onViewChange={handleViewChange} />
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
          <Route path="/play/:slug" element={<SideProjectDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
