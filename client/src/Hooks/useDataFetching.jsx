import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useDataFetching = ({ api, key }) => {
  
  const axiosPublic = useAxiosPublic();
  const {
    data: data = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axiosPublic.get(api);
      return res.data;
    },
  });
  return [data, loading, refetch];
};

export default useDataFetching;
