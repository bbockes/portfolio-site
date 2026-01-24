import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { ContactSection } from './components/ContactSection';
import { AboutPage } from './components/AboutPage';

function HomePage() {
  return (
    <>
      <Hero />
      <WorkSection />
      <ContactSection />
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
