import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-about">
          <Link
            to="/"
            className="brand brand-image-link"
            aria-label="AcreArch home"
          >
            <BrandLogo className="footer-logo" />
          </Link>
          <p>
            Trusted real estate consultancy connecting clients with residential,
            commercial and investment opportunities through transparent and
            informed property solutions.
          </p>
        </div>
        <div className="footer-column">
          <h4>REAL ESTATE SOLUTIONS</h4>
          <Link to="/properties">Residential Properties</Link>
          <Link to="/properties">Commercial Properties</Link>
          <Link to="/properties">Property Leasing</Link>
          <Link to="/investment">Investment Advisory</Link>
        </div>
        <div className="footer-column">
          <h4>MARKET PRESENCE</h4>
          <span>Delhi NCR</span>
          <span>Noida</span>
          <span>Gurugram</span>
          <span>Uttarakhand</span>
        </div>
        <div className="footer-column">
          <h4>Secure Communications</h4>
          <p>Transmission pathways configured over encrypted layers.</p>
          <a className="footer-email" href="mailto:info@acrearch.com">
            info@acrearch.com
          </a>
          <div className="footer-phones">
            <a href="tel:+919599275077">+91 95992 75077</a>
            <a href="tel:+917704044447">+91 77040 44447</a>
          </div>
          <Link className="footer-cta" to="/contact">
            Book Consultation <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2026 AcreArch. All Rights Reserved. Private Non-Disclosure Protocols
          Enabled.
        </p>
        <div>
          <a href="#terms">Regulatory Terms</a>
          <a href="#privacy">Discretionary Framework</a>
        </div>
      </div>
    </footer>
  );
}
