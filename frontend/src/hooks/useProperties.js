import { useCallback, useEffect, useState } from 'react';
import { getApiError, propertyService } from '../services/propertyService';

export default function useProperties(filters = {}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const key = JSON.stringify(filters);
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setProperties(await propertyService.list(filters)); }
    catch (err) { setError(getApiError(err)); }
    finally { setLoading(false); }
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [load]);
  return { properties, loading, error, reload: load };
}
