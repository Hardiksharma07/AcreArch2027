import { Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import About from './pages/About';
import Investment from './pages/Investment';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import PageTransition from './components/PageTransition';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminLogin from './pages/AdminLogin';

export default function App() {
  return <><PageTransition /><Routes>
    <Route element={<SiteLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/investment" element={<Investment />} />
      <Route path="/contact" element={<Contact />} />
    </Route>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes></>;
}
