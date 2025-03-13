import axiosInstance from '@/shared/config/axios.config';
import { useLayoutContext } from '@/context/LayoutContext';
import useNotification from './useNotification';
import { AxiosError } from 'axios';

const useApi = () => {
  const { setLoading } = useLayoutContext();
  const { error } = useNotification();
  const axios = axiosInstance;

  const api = async (url, method = 'GET', body = null, headers = null) => {
    setLoading(true);
    try {
      const response = await axios({
        url,
        method,
        data: body,
        headers: headers,
      });
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.message || err.message || 'An error occurred';
        const status = err.response?.status || 'Unknown status';
        
        error({
          message: `Error: ${message}`,
          onClose: () => console.log(`Error Status: ${status}`)
        });

        return null;
      }

      error({ message: 'An unexpected error occurred' });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { api };
};

export default useApi;

