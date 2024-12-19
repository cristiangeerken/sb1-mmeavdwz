import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useSupabaseQuery<T>(
  tableName: string,
  options: { orderBy?: { column: string; ascending: boolean } } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let query = supabase.from(tableName).select('*');
        
        if (options.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending
          });
        }

        const { data: result } = await query;
        if (result) setData(result as T[]);
      } catch (error) {
        console.error(`Error fetching ${tableName}:`, error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [tableName, options.orderBy?.column, options.orderBy?.ascending]);

  return { data, isLoading };
}