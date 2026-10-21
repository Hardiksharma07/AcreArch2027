import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const links = [['/','Home'],['/about','About Us'],['/properties','Properties'],['/investment','Investment'],['/contact','Contact']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <nav className="navbar">
    <NavLink to="/" className="brand brand-image-link" aria-label="AcreArch home"><BrandLogo className="navbar-logo" /></NavLink>
    <div className={`nav-links ${open ? 'open' : ''}`}>{links.map(([to,label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>{label}</NavLink>)}<NavLink className="button outline mobile-cta" to="/contact">Book Consultation</NavLink></div>
    <NavLink className="button outline desktop-cta" to="/contact">Book Consultation</NavLink>
    <button className="menu-button" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}><i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`} /></button>
  </nav>;
}
