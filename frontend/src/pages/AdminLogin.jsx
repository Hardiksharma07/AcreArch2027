import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import { authService } from "../services/authService";
import { getApiError } from "../services/propertyService";
import SEO from "../components/SEO";
import { seoPages } from "../seoPages";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authService.login(id, password);
      navigate(location.state?.from?.pathname || "/admin", { replace: true });
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <SEO {...seoPages.adminLogin} />
      <div className="login-visual">
        <Link to="/" className="brand brand-image-link" aria-label="AcreArch home">
          <BrandLogo className="login-logo" />
        </Link>
        <div>
          <span className="eyebrow">Restricted Operations</span>
          <h1>Private Asset<br />Administration</h1>
          <p>Authorized personnel only. Access is protected by AcreArch security protocols.</p>
        </div>
      </div>
      <section className="login-panel">
        <form onSubmit={submit}>
          <span className="eyebrow">Secure Sign In</span>
          <h2>Admin Portal</h2>
          <p>Enter your administrator credentials to continue.</p>
          {error && <div className="login-error"><i className="fa-solid fa-circle-exclamation" /> {error}</div>}
          <label>Admin ID<input autoFocus autoComplete="username" value={id} onChange={(event) => setId(event.target.value)} required /></label>
          <label>Password<div className="password-field"><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /><i className="fa-solid fa-lock" /></div></label>
          <button className="button navy" disabled={loading}>{loading ? "Authenticating…" : "Access Admin Portal"}</button>
          <Link className="login-back" to="/"><i className="fa-solid fa-arrow-left" /> Return to website</Link>
        </form>
      </section>
    </main>
  );
}
