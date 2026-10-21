import { Link } from 'react-router-dom';
import { formatCurrency, typeLabel } from '../utils/format';
import { localizeImageUrl } from '../utils/localImages';
import { normalizePropertyType } from '../utils/propertyTypes';

export default function PropertyCard({ property }) {
  const isCommercial = normalizePropertyType(property.type) === 'commercial';

  return (
    <article className="property-card">
      <div className="card-image">
        <span className="image-fallback"><i className="fa-regular fa-building" /></span>
        <img
          src={localizeImageUrl(property.image)}
          alt={property.title}
          onError={(event) => { event.currentTarget.style.display = 'none'; }}
        />
        <span className="pill">{typeLabel(property.type)}</span>
        {property.featured && <span className="pill featured">Featured</span>}
      </div>
      <div className="card-body">
        <p className="price">{formatCurrency(property.price)}</p>
        <h3>{property.title}</h3>
        <p className="muted"><i className="fa-solid fa-location-dot gold" /> {property.location}</p>
        <div className="facts">
          {!isCommercial && (
            <>
              <span><i className="fa-solid fa-bed" /> {property.beds} Beds</span>
              <span><i className="fa-solid fa-bath" /> {property.baths} Baths</span>
            </>
          )}
          <span><i className="fa-solid fa-maximize" /> {Number(property.sqft || 0).toLocaleString()} sqft</span>
        </div>
        <p className="description">{property.description}</p>
        <Link className="text-link" to={`/property/${property.id}`}>
          View Property <i className="fa-solid fa-arrow-right" />
        </Link>
      </div>
    </article>
  );
}
