import { Link } from "react-router-dom";
import useProperties from "../hooks/useProperties";
import PropertyGrid from "../components/PropertyGrid";
import MortgageCalculator from "../components/MortgageCalculator";
import SEO from "../components/SEO";
import { seoPages } from "../seoPages";
import propertyOrigins from "../images/property-origins.jpg";
import sobhaLogo from "../images/partners/sobha.svg";
import prestigeLogo from "../images/partners/prestige.svg";
import godrejLogo from "../images/partners/godrej-properties.svg";
import brigadeLogo from "../images/partners/brigade.webp";
import dlfLogo from "../images/partners/dlf.svg";
import shapoorjiLogo from "../images/partners/shapoorji-pallonji.svg";
import ltRealtyLogo from "../images/partners/lt-realty.webp";
// import tataRealtyLogo from "../images/partners/tata-realty.png";
import nccLogo from "../images/partners/ncc.png";
import hiranandaniLogo from "../images/partners/hiranandani.png";
import birlaEstatesLogo from "../images/partners/birla-estates.png";

export default function Home() {
  const listings = useProperties({ status: "live", featured: true });
  const partners = [
    { name: "Sobha", logo: sobhaLogo, light: true },
    { name: "Prestige", logo: prestigeLogo },
    { name: "Godrej Properties", logo: godrejLogo },
    { name: "Brigade", logo: brigadeLogo },
    { name: "L&T Realty", logo: ltRealtyLogo },
    { name: "DLF", logo: dlfLogo },
    { name: "Shapoorji Pallonji", logo: shapoorjiLogo },
    // { name: "Tata Realty", logo: tataRealtyLogo, light: true },
    { name: "NCC Limited", logo: nccLogo },
    { name: "Hiranandani", logo: hiranandaniLogo },
    { name: "Birla Estates", logo: birlaEstatesLogo },
  ];
  const visiblePartners = partners.filter((partner) => partner.logo);

  return (
    <>
      <SEO {...seoPages.home} />
      <section className="home-hero">
        <div className="hero-content">
          <span className="eyebrow badge">The Pinnacle of Real Estate</span>
          <h1>
            Find Your Dream
            <br />
            <em>Property With AcreArch</em>
          </h1>
          <p>
            Premium Properties · Smart Investments · Lasting Value. Find 
            spaces that elevate your lifestyle and strengthen your Future.
          </p>
          <div className="actions">
            <Link className="button gold-button" to="/properties">
              Explore Properties <i className="fa-solid fa-arrow-right" />
            </Link>
            <Link className="button outline" to="/contact">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
      <section className="partners-section">
        <div className="section-heading partner-heading">
          <div>
            <span className="eyebrow">Associated Builders</span>
            <h2>Development Partners</h2>
          </div>
        </div>
        <div className="partner-marquee" aria-label="Associated builders">
          <div className="partner-track">
            {[...visiblePartners, ...visiblePartners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className={`partner-logo${partner.light ? " partner-logo--light" : ""}`}
                aria-hidden={index >= visiblePartners.length}
              >
                <img
                  src={partner.logo}
                  alt={index < visiblePartners.length ? partner.name : ""}
                  onError={(event) => {
                    event.currentTarget.parentElement.hidden = true;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="split-section">
        <div className="framed-image">
          <img
            src={propertyOrigins}
            alt="Luxury architecture"
          />
        </div>
        <div>
          <span className="eyebrow">Our Philosophy</span>
          <h2>Crafting Legacies, Securing Generational Wealth</h2>
          <p>
            AcreArch is your trusted partner in discovering verified real estate opportunities and making smarter property decisions. 
            We bring together carefully evaluated properties, transparent insights, and strategic investment guidance to help you invest with greater confidence. 
            From identifying the right opportunity to understanding its potential, AcreArch helps you move forward with clarity.
          </p>
          <div className="feature-pair">
            <span>
              <i className="fa-solid fa-shield-halved" />
              <b>VERIFIED OPPORTUNITIES</b>
            </span>
            <span>
              <i className="fa-solid fa-wand-magic-sparkles" />
              <b>SMART INVESTMENT</b>
            </span>
          </div>
        </div>
      </section>
      <section className="section pale">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Curated Marketplace</span>
            <h2>Featured Masterpieces</h2>
          </div>
          <Link className="text-link" to="/properties">
            View all assets →
          </Link>
        </div>
        <PropertyGrid {...listings} />
      </section>
      <section className="dark-section">
        <div>
          <span className="eyebrow">Financial Analytics</span>
          <h2>Structured Wealth Deployment Calculator</h2>
          <p>
            Evaluate premium real estate financing and fine-tune capital
            allocation instantly.
          </p>
        </div>
        <MortgageCalculator />
      </section>
      <section className="section">
        <div className="section-title">
          <span className="eyebrow">End-to-End Support</span>
          <h2>Our Dedicated Advisory Capabilities</h2>
        </div>
        <div className="cards-three services">
          {[
            [
              "fa-building-columns",
              "Portfolio Acquisition",
              "Private access to rigorously vetted residences and off-market architectural assets.",
            ],
            [
              "fa-chart-pie",
              "Investment Consulting",
              "Scenario modeling and disciplined acquisition strategy for globally diversified portfolios.",
            ],
            [
              "fa-scale-balanced",
              "Legal & Regulatory Escrow",
              "Coordinated due diligence and cross-border transaction support through trusted specialists.",
            ],
          ].map(([icon, title, text]) => (
            <article key={title}>
              <span className="icon-square">
                <i className={`fa-solid ${icon}`} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section center">
        <span className="eyebrow">Private Access</span>
        <h2>Begin a Discreet Conversation</h2>
        <p>
          Connect with an AcreArch investment concierge for a confidential asset
          consultation.
        </p>
        <Link className="button navy" to="/contact">
          Contact Us
        </Link>
      </section>
      
    </>
  );
}
