import PageHero from '../components/PageHero';
import MortgageCalculator from '../components/MortgageCalculator';
import SEO from '../components/SEO';
import { seoPages } from '../seoPages';

export default function Investment() {
  return (
    <>
      <SEO {...seoPages.investment} />
      <PageHero eyebrow="Structured Wealth Deployment" title="Investment Analytics">
        Model a residential or commercial acquisition with an India-focused financing strategy.
      </PageHero>
      <section className="investment-layout">
        <div>
          <span className="eyebrow">Acquisition Matrix</span>
          <h2>Configure Capital Deployment</h2>
          <p>
            Adjust the variables to understand equity contribution, home-loan EMI, registration costs,
            and monthly commitment based on current Indian market assumptions. Figures are illustrative and not financial advice.
          </p>
          <ul>
            <li>Instant scenario modeling</li>
            <li>Flexible financing terms</li>
            <li>Transparent India market breakdown</li>
          </ul>
        </div>
        <MortgageCalculator detailed />
      </section>
    </>
  );
}
