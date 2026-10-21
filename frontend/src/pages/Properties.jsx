import { useMemo, useState } from 'react';
import PageHero from '../components/PageHero';
import PropertyGrid from '../components/PropertyGrid';
import useProperties from '../hooks/useProperties';
import SEO from '../components/SEO';
import { seoPages } from '../seoPages';
import { normalizePropertyType, propertyTypes } from '../utils/propertyTypes';

export default function Properties() {
  const { properties, loading, error, reload } = useProperties({ status: 'live' });
  const [type,setType]=useState('all');
  const [region,setRegion]=useState('all');
  const [minPrice,setMinPrice]=useState('');
  const [maxPrice,setMaxPrice]=useState('');
  const [minBeds,setMinBeds]=useState('');
  const [minBaths,setMinBaths]=useState('');
  const [minSqft,setMinSqft]=useState('');
  const [sort,setSort]=useState('high');
  const [advancedOpen,setAdvancedOpen]=useState(false);

  const regions=useMemo(()=>[...new Set(properties.map(property=>property.region).filter(Boolean))].sort(),[properties]);
  const filtered=useMemo(()=>properties
    .filter(property=>(type==='all'||normalizePropertyType(property.type)===type)
      &&(region==='all'||property.region===region)
      &&(!minPrice||property.price>=+minPrice)
      &&(!maxPrice||property.price<=+maxPrice)
      &&(!minBeds||property.beds>=+minBeds)
      &&(!minBaths||property.baths>=+minBaths)
      &&(!minSqft||property.sqft>=+minSqft))
    .sort((a,b)=>sort==='low'?a.price-b.price:sort==='space'?b.sqft-a.sqft:b.price-a.price),
    [properties,type,region,minPrice,maxPrice,minBeds,minBaths,minSqft,sort]);

  const reset=()=>{setType('all');setRegion('all');setMinPrice('');setMaxPrice('');setMinBeds('');setMinBaths('');setMinSqft('');setSort('high');};
  const activeAdvanced=Boolean(minBeds||minBaths||minSqft);

  return <>
    <SEO {...seoPages.properties} />
    <PageHero eyebrow="Global Asset Portal" title="Curated Masterpieces">Explore a tightly vetted collection of distinguished residences.</PageHero>
    <section className="property-filter-shell">
      <div className="filter-bar">
        <div className="type-buttons">{[{value:'all',label:'All Assets'},...propertyTypes].map(({value,label})=><button key={value} className={type===value?'active':''} onClick={()=>setType(value)}>{label}</button>)}</div>
        <select aria-label="Region" value={region} onChange={event=>setRegion(event.target.value)}><option value="all">All Regions</option>{regions.map(item=><option key={item}>{item}</option>)}</select>
        <div className="price-range"><input aria-label="Minimum price" type="number" min="0" placeholder="Min Price (₹)" value={minPrice} onChange={event=>setMinPrice(event.target.value)}/><span>–</span><input aria-label="Maximum price" type="number" min="0" placeholder="Max Price (₹)" value={maxPrice} onChange={event=>setMaxPrice(event.target.value)}/></div>
        <button className={`advanced-toggle ${advancedOpen||activeAdvanced?'active':''}`} onClick={()=>setAdvancedOpen(value=>!value)} aria-expanded={advancedOpen}><i className="fa-solid fa-sliders"/> Advanced {activeAdvanced&&<span className="filter-dot"/>}</button>
        <select aria-label="Sort properties" value={sort} onChange={event=>setSort(event.target.value)}><option value="high">Allocation: Highest</option><option value="low">Allocation: Lowest</option><option value="space">Dimensions: Max</option></select>
      </div>
      {advancedOpen&&<div className="advanced-filters">
        <label>Minimum Bed Configuration<select value={minBeds} onChange={event=>setMinBeds(event.target.value)}><option value="">Any Bed Count</option><option value="4">4+ Beds</option><option value="6">6+ Beds</option><option value="8">8+ Beds</option></select></label>
        <label>Minimum Bath Configuration<select value={minBaths} onChange={event=>setMinBaths(event.target.value)}><option value="">Any Bath Count</option><option value="5">5+ Baths</option><option value="8">8+ Baths</option><option value="11">11+ Baths</option></select></label>
        <label>Volumetric Size (Sq Ft Min)<input type="number" min="0" placeholder="e.g. 10000" value={minSqft} onChange={event=>setMinSqft(event.target.value)}/></label>
        <button className="clear-filters" onClick={reset}>Clear Matrix Filters</button>
      </div>}
    </section>
    <section className="section pale"><div className="filter-results"><span>{loading?'Loading assets…':`${filtered.length} asset${filtered.length===1?'':'s'} matched`}</span>{!loading&&filtered.length===0&&<button onClick={reset}>Reset Active Parameters</button>}</div><PropertyGrid properties={filtered} loading={loading} error={error} retry={reload}/></section>
  </>;
}
