import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { propertyService, getApiError } from '../services/propertyService';
import { formatCurrency, splitList, typeLabel } from '../utils/format';
import { localizeImageUrl } from '../utils/localImages';
import { ErrorState, LoadingState } from '../components/States';
import SEO from '../components/SEO';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property,setProperty]=useState(null);
  const [oneDriveMedia,setOneDriveMedia]=useState([]);
  const [loading,setLoading]=useState(true);
  const [mediaLoading,setMediaLoading]=useState(false);
  const [error,setError]=useState('');
  const [mediaError,setMediaError]=useState('');
  const [active,setActive]=useState(0);

  useEffect(()=>{
    let current=true;
    setLoading(true);setError('');setMediaError('');setActive(0);
    propertyService.get(id).then(async item=>{
      if(!current)return;setProperty(item);
      if(item.googleDriveFolderUrl){setMediaLoading(true);try{const media=await propertyService.getMedia(id);if(current)setOneDriveMedia(media)}catch(err){if(current)setMediaError(getApiError(err))}finally{if(current)setMediaLoading(false)}}
    }).catch(err=>current&&setError(getApiError(err))).finally(()=>current&&setLoading(false));
    return()=>{current=false};
  },[id]);

  const gallery=useMemo(()=>{
    if(!property)return[];
    const staticMedia=splitList(property.galleryImages).map((url,index)=>({id:`image-${index}`,name:`${property.title} view ${index+1}`,type:'image',url:localizeImageUrl(url)}));
    if(!staticMedia.length&&property.image)staticMedia.push({id:'main-image',name:property.title,type:'image',url:localizeImageUrl(property.image)});
    const known=new Set(staticMedia.map(item=>item.url));
    return [...staticMedia,...oneDriveMedia.filter(item=>!known.has(item.url))];
  },[property,oneDriveMedia]);

  useEffect(()=>{if(active>=gallery.length)setActive(0)},[gallery.length,active]);
  if(loading)return <div className="page-state"><LoadingState/></div>;
  if(error||!property)return <div className="page-state"><ErrorState message={error||'Property not found.'}/></div>;
  const selected=gallery[active];
  const move=direction=>setActive(index=>(index+direction+gallery.length)%gallery.length);
  const propertyDescription=property.description||`${property.title} in ${property.location}. Contact AcreArch for property information and a private viewing.`;
  const propertyImage=property.image?localizeImageUrl(property.image):undefined;

  return <>
    <SEO
      title={`${property.title} | Property Details | AcreArch`}
      description={propertyDescription.slice(0,160)}
      path={`/property/${encodeURIComponent(id)}`}
      image={propertyImage}
      type="article"
    />
    <section className="detail-heading"><div><span className="eyebrow">Asset Code: {property.assetCode}</span><h1>{property.title}</h1><p><i className="fa-solid fa-location-dot gold"/> {property.location}</p></div><strong>{formatCurrency(property.price)}</strong></section>
    <section className="gallery">
      <div className="main-image">{selected?.type==='video'?<video key={selected.url} src={selected.url} controls playsInline preload="metadata"/>:<img src={selected?.url||property.image} alt={selected?.name||property.title}/>} {gallery.length>1&&<><button className="previous" onClick={()=>move(-1)} aria-label="Previous media">‹</button><button className="next" onClick={()=>move(1)} aria-label="Next media">›</button></>}<span>{gallery.length?`${active+1} / ${gallery.length}`:'No media'}</span></div>
      {mediaLoading&&<p className="media-status"><span className="spinner"/> Loading Google Drive media…</p>}
      {mediaError&&<p className="media-status error"><i className="fa-solid fa-triangle-exclamation"/> {mediaError}</p>}
      <div className="thumbnails">{gallery.map((item,index)=><button key={item.id||`${item.url}-${index}`} className={active===index?'active':''} onClick={()=>setActive(index)} aria-label={`Open ${item.name}`}>{item.type==='video'?<><video src={item.url} muted preload="metadata"/><i className="fa-solid fa-play media-play"/></>:<img src={item.url} alt={item.name}/>}</button>)}</div>
    </section>
    <section className="facts detail-facts"><span><small>Property Type</small>{typeLabel(property.type)}</span><span><small>Footprint</small>{Number(property.sqft).toLocaleString()} sqft</span><span><small>Configuration</small>{property.beds} Beds / {property.baths} Baths</span><span><small>Region</small>{property.region}</span></section>
    <section className="detail-content"><div><span className="eyebrow">The Residence</span><h2>Architectural Profile</h2><p>{property.description}</p><h3>Property Highlights</h3><ul>{splitList(property.highlights).map(item=><li key={item}><i className="fa-solid fa-check gold"/> {item}</li>)}</ul></div><aside><span className="detail-cta-icon"><i className="fa-solid fa-key" /></span><span className="eyebrow">AcreArch Concierge</span><h3>Arrange a private viewing</h3><p>Receive tailored access, floor plans, and due-diligence materials for this residence.</p><ul><li><i className="fa-solid fa-check" /> Confidential scheduling</li><li><i className="fa-solid fa-check" /> Dedicated property advisor</li></ul><Link className="button gold-button" to="/contact">Contact Concierge <i className="fa-solid fa-arrow-right" /></Link></aside></section>
  </>;
}
