import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound(){return <div className="page-state"><SEO title="Page Not Found | AcreArch" description="The requested AcreArch page could not be found." noindex/><h1>404</h1><p>This asset pathway does not exist.</p><Link className="button navy" to="/">Return Home</Link></div>}
