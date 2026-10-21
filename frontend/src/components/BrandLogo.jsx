import logo from "../images/logo.png";

export default function BrandLogo({ className = "" }) {
  return <img className={`brand-logo ${className}`.trim()} src={logo} alt="AcreArch" />;
}
