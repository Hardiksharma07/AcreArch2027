import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { seoPages } from "../seoPages";
import "../about.css";
import aboutArchitecture from "../images/about-architecture.jpg";
import aboutOffice from "../images/about-office.jpg";
import philosophyRealEstate from "../images/philosophy-real-estate.jpg";

const commitments = [
  ["01", "fa-scale-balanced", "Transparent Practices", "Clear, ethical advice at every stage of your property journey."],
  ["02", "fa-house-user", "Personalized Solutions", "Recommendations shaped around your priorities—not a sales target."],
  ["03", "fa-chart-line", "Market Guidance", "Professional insights that help you make informed, confident decisions."],
  ["04", "fa-handshake", "Lasting Relationships", "A partnership built to continue well beyond a single transaction."],
  ["05", "fa-key", "End-to-End Support", "Dedicated assistance from the first consultation through completion."],
];

const leaders = [
  {
    initials: "VS",
    name: "Vipin Singh",
    role: "Founder",
    statement: "Trust and transparency must always come before transactions.",
    bio: "Vipin Singh founded AcreArch with the vision of creating a real estate consultancy where trust and transparency come before transactions. He believes in thoroughly understanding a client’s needs, investment objectives, and long-term plans before recommending any property. His honest and consultative approach has helped build lasting relationships with clients who value informed decision-making and professional guidance.",
  },
  {
    initials: "MA",
    name: "Mumshad Ahmed",
    role: "Co-Founder",
    statement: "Great service is defined by clarity, care, and attention to detail.",
    bio: "Mumshad Ahmed plays a key role in strengthening AcreArch’s client relationships and market presence. His commitment to service excellence, attention to detail, and deep understanding of market dynamics help clients navigate real estate opportunities with confidence.",
  },
];

export default function About() {
  return (
    <main className="about-page">
      <SEO {...seoPages.about} />
      <PageHero
        eyebrow="About AcreArch"
        title={<>Understanding People <em>Before Properties</em></>}
      >
        Honest guidance, strategic insight, and carefully selected real estate
        opportunities aligned with your ambitions.
      </PageHero>

      <section className="about-intro">
        <div className="about-intro-copy">
          <span className="eyebrow">Our Story</span>
          <h2>Real Estate Guidance,<br /><em>Built on Trust.</em></h2>
          <p className="about-lead">
            At AcreArch Pvt. Ltd., we believe successful real estate consulting
            begins with understanding people before properties.
          </p>
          <p>
            Our mission is to provide clients with honest guidance, strategic
            insights, and carefully selected opportunities that align with their
            goals. Founded by Vipin Singh and co-founded by Mumshad Ahmed,
            AcreArch has built its reputation on transparency, integrity, and a
            genuinely client-centric approach.
          </p>
          <div className="about-signature">
            <span />
            <p>Every recommendation begins with your requirements—not a sales target.</p>
          </div>
        </div>

        <div className="about-visual">
          <div className="about-image-primary">
            <img
              src={aboutArchitecture}
              alt="Contemporary city architecture"
            />
          </div>
          <div className="about-image-secondary">
            <img
              src={aboutOffice}
              alt="Professional real estate consultation space"
            />
          </div>
          <div className="about-visual-badge">
            <i className="fa-solid fa-shield-halved" />
            <span>Advice with<br /><strong>Integrity</strong></span>
          </div>
        </div>
      </section>

      <section className="about-expertise" aria-label="Our real estate expertise">
        {["Residential", "Commercial", "Leasing", "Investment"].map((item, index) => (
          <div key={item}>
            <span>0{index + 1}</span>
            <strong>{item}</strong>
            <small>Real Estate</small>
          </div>
        ))}
      </section>

      <section className="about-philosophy">
        <div className="about-philosophy-label">
          <span className="eyebrow">Our Philosophy</span>
          <div className="philosophy-rail">
            <span className="philosophy-line" />
            <div className="about-philosophy-visual">
              <img
                src={philosophyRealEstate}
                alt="AcreArch philosophy of trusted real estate guidance"
              />
            </div>
          </div>
        </div>
        <div>
          <h2>Every Client Is Unique.<br /><em>Every Strategy Should Be Too.</em></h2>
          <p>
            We take the time to understand our clients’ objectives, evaluate
            available opportunities, and provide professional advice that
            creates long-term value. Whether you are finding a home, expanding
            a business, leasing a space, or building an investment portfolio,
            our approach remains thoughtful and personal.
          </p>
        </div>
      </section>

      <section className="about-leadership">
        <header className="about-section-heading">
          <div>
            <span className="eyebrow">Leadership</span>
            <h2>Led by Vision.<br /><em>Grounded in Values.</em></h2>
          </div>
          <p>
            The people behind AcreArch bring market understanding, attentive
            service, and an unwavering commitment to every client relationship.
          </p>
        </header>

        <div className="leader-grid">
          {leaders.map(({ initials, name, role, statement, bio }, index) => (
            <article className="leader-card" key={name}>
              <div className="leader-identity">
                <span className="leader-index">0{index + 1}</span>
                <div className="leader-monogram" aria-hidden="true">{initials}</div>
                <div>
                  <span className="leader-role">{role}</span>
                  <h3>{name}</h3>
                </div>
              </div>
              <div className="leader-copy">
                <i className="fa-solid fa-quote-left" />
                <blockquote>{statement}</blockquote>
                <p>{bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-commitment">
        <header className="about-section-heading">
          <div>
            <span className="eyebrow">Our Commitment</span>
            <h2>What You Can<br /><em>Always Expect.</em></h2>
          </div>
          <p>Professional support and honest communication throughout every step.</p>
        </header>
        <div className="commitment-grid">
          {commitments.map(([number, icon, title, text]) => (
            <article key={title}>
              <span className="commitment-number">{number}</span>
              <i className={`fa-solid ${icon}`} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-closing">
        <i className="fa-solid fa-quote-left" />
        <p>
          We don’t measure success by the number of transactions we close—we
          measure it by the trust we earn and the value we create.
        </p>
        <span />
        <strong>Building Trust. Creating Value. Delivering Results.</strong>
      </section>
    </main>
  );
}
