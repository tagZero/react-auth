import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(
    () =>
      search
        .slice(1)
        .split('&')
        .reduce((acc, kv) => {
          const [key, value] = kv.split('=');
          acc[key] = decodeURIComponent(value);
          return acc;
        }, {}),
    [search]
  );
};

export default useQuery;
