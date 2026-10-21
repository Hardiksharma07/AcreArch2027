import PropertyCard from './PropertyCard';
import { EmptyState, ErrorState, LoadingState } from './States';
export default function PropertyGrid({ properties, loading, error, retry }) { if (loading) return <LoadingState/>; if (error) return <ErrorState message={error} retry={retry}/>; if (!properties.length) return <EmptyState/>; return <div className="property-grid">{properties.map((property) => <PropertyCard key={property.id} property={property}/>)}</div>; }
