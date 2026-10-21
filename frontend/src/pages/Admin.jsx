import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApiError, propertyService } from '../services/propertyService';
import { formatCurrency, splitList } from '../utils/format';
import { ErrorState, LoadingState } from '../components/States';
import BrandLogo from '../components/BrandLogo';
import SEO from '../components/SEO';
import { seoPages } from '../seoPages';
import { normalizePropertyType, propertyTypes } from '../utils/propertyTypes';

const emptyForm={id:'',title:'',type:'residential',region:'',location:'',price:'',beds:'',baths:'',sqft:'',image:'',galleryImages:'',sourceImage:'',googleDriveFolderUrl:'',description:'',status:'live',featured:false,assetCode:'',highlights:''};
const fields=[['id','Property ID'],['title','Title'],['region','Region'],['location','Location'],['price','Price'],['beds','Beds'],['baths','Baths'],['sqft','Square Feet'],['image','Main Image URL'],['sourceImage','Source Image']];

export default function Admin(){
  const[properties,setProperties]=useState([]);const[form,setForm]=useState(emptyForm);const[editingId,setEditingId]=useState('');const[loading,setLoading]=useState(true);const[saving,setSaving]=useState(false);const[mediaChecking,setMediaChecking]=useState(false);const[mediaCount,setMediaCount]=useState(null);const[error,setError]=useState('');const[notice,setNotice]=useState('');
  const load=async()=>{setLoading(true);setError('');try{setProperties(await propertyService.list())}catch(err){setError(getApiError(err))}finally{setLoading(false)}};
  useEffect(()=>{load()},[]);
  const stats=useMemo(()=>({total:properties.length,live:properties.filter(p=>p.status==='live').length,featured:properties.filter(p=>p.featured).length,value:properties.reduce((sum,p)=>sum+(p.price||0),0)}),[properties]);
  const change=event=>{const{name,value,type,checked}=event.target;setForm(current=>({...current,[name]:type==='checkbox'?checked:value}));if(name==='googleDriveFolderUrl')setMediaCount(null)};
  const clear=()=>{setForm(emptyForm);setEditingId('');setMediaCount(null);setError('')};
  const edit=property=>{setEditingId(property.id);setForm({...emptyForm,...property,type:normalizePropertyType(property.type),galleryImages:(property.galleryImages||[]).join('\n'),highlights:(property.highlights||[]).join(', ')});setMediaCount(null);window.scrollTo({top:0,behavior:'smooth'})};
  const checkMedia=async()=>{if(!form.googleDriveFolderUrl)return;setMediaChecking(true);setError('');try{const media=await propertyService.previewGoogleDrive(form.googleDriveFolderUrl);setMediaCount(media.length)}catch(err){setError(getApiError(err));setMediaCount(null)}finally{setMediaChecking(false)}};
  const submit=async event=>{event.preventDefault();setSaving(true);setError('');setNotice('');const payload={...form,price:+form.price,beds:+form.beds,baths:+form.baths,sqft:+form.sqft,galleryImages:splitList(form.galleryImages),highlights:splitList(form.highlights)};try{if(editingId)await propertyService.update(editingId,payload);else await propertyService.create(payload);setNotice(editingId?'Property updated.':'Property created.');clear();await load()}catch(err){setError(getApiError(err))}finally{setSaving(false)}};
  const remove=async property=>{if(!window.confirm(`Delete “${property.title}”? This cannot be undone.`))return;try{await propertyService.remove(property.id);setNotice('Property deleted.');await load()}catch(err){setError(getApiError(err))}};

  return <div className="admin-shell"><SEO {...seoPages.admin} /><header className="admin-header"><Link to="/" className="brand brand-image-link" aria-label="AcreArch home"><BrandLogo className="admin-logo"/></Link><div><Link to="/properties">View Site</Link><span>Admin Portal</span></div></header><main className="admin-main">
    <div className="admin-intro"><div><span className="eyebrow">Portfolio Operations</span><h1>Property Administration</h1></div><button className="button outline-dark" onClick={clear}>New Property</button></div>
    <section className="dashboard">{[['Properties',stats.total],['Live Assets',stats.live],['Portfolio Value',formatCurrency(stats.value)],['Featured',stats.featured]].map(([label,value])=><article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section>
    {notice&&<p className="success">{notice}</p>}{error&&<ErrorState message={error}/>}<section className="admin-layout"><div className="admin-panel"><h2>{editingId?'Edit Property':'Create Property'}</h2><form onSubmit={submit} className="admin-form">
      {fields.map(([name,label])=><label key={name}>{label}<input name={name} required={['id','title','region','location','price'].includes(name)} disabled={name==='id'&&!!editingId} type={['price','beds','baths','sqft'].includes(name)?'number':'text'} value={form[name]??''} onChange={change}/></label>)}
      <label>Type<select name="type" value={form.type} onChange={change}>{propertyTypes.map(({value,label})=><option key={value} value={value}>{label}</option>)}</select></label>
      <label>Status<select name="status" value={form.status} onChange={change}><option value="live">Live</option><option value="draft">Draft</option><option value="sold">Sold</option></select></label>
      <label className="wide drive-field">Google Drive Folder Link<div className="drive-input"><input name="googleDriveFolderUrl" type="url" placeholder="https://drive.google.com/drive/folders/..." value={form.googleDriveFolderUrl||''} onChange={change}/><button type="button" onClick={checkMedia} disabled={!form.googleDriveFolderUrl||mediaChecking}>{mediaChecking?'Checking…':'Check Media'}</button></div>{mediaCount!==null&&<small>{mediaCount} image/video file{mediaCount===1?'':'s'} found. Media will load automatically on the details page.</small>}</label>
      <label className="wide">Gallery Images (one URL per line)<textarea rows="4" name="galleryImages" value={form.galleryImages} onChange={change}/></label>
      <label className="wide">Description<textarea required rows="4" name="description" value={form.description} onChange={change}/></label>
      <label className="wide">Highlights (comma separated)<input name="highlights" value={form.highlights} onChange={change}/></label>
      <label>Asset Code<input name="assetCode" value={form.assetCode} onChange={change}/></label><label className="checkbox"><input type="checkbox" name="featured" checked={!!form.featured} onChange={change}/> Featured property</label>
      <div className="form-actions wide"><button className="button navy" disabled={saving}>{saving?'Saving…':editingId?'Update Property':'Create Property'}</button><button type="button" className="button outline-dark" onClick={clear}>Clear</button></div>
    </form></div><div className="admin-panel list-panel"><h2>Portfolio ({properties.length})</h2>{loading?<LoadingState/>:<div className="admin-list">{properties.map(property=><article key={property.id}><img src={property.image} alt=""/><div><strong>{property.title}</strong><span>{property.id} · {property.status}{property.googleDriveFolderUrl?' · Google Drive':''}</span><b>{formatCurrency(property.price)}</b></div><div><button onClick={()=>edit(property)}>Edit</button><button className="danger" onClick={()=>remove(property)}>Delete</button></div></article>)}</div>}</div></section>
  </main></div>;
}
