import { BrowserRouter, Routes, Route } from 'react-router';
import { AppProvider } from './store/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Opportunities from './pages/Opportunities';
import DesignLanguage from './pages/DesignLanguage';
import Moodboards from './pages/Moodboards';
import Finance from './pages/Finance';
import Learning from './pages/Learning';
import Agents from './pages/Agents';

// Strip trailing slash so React Router gets a clean basename.
// BASE_URL is "/" for dev/desktop and "/AccountsAndTransactionsView/" on Pages.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={basename}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/design-language" element={<DesignLanguage />} />
            <Route path="/moodboards" element={<Moodboards />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/agents" element={<Agents />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}