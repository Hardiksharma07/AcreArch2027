import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SiteLayout() {
  const { pathname } = useLocation();
  return <><Navbar /><main key={pathname}><Outlet /></main><Footer /></>;
}
