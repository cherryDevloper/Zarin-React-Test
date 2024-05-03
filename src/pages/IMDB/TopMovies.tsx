import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Alert, Pagination } from 'antd';
import { omdbApi } from '../../services/axiosConfig';
import Loading from '../../components/Loading';
import MovieItems from './components/MovieItems';
import MovieSearch from './components/MovieSearch';
import { OMDBResponse } from './types';
import YearPicker from './components/YearPicker';
import Layout from '../../components/Layout';

const fetchMovies = async (
  search: string,
  type: string,
  year: number,
  page: number,
): Promise<OMDBResponse> => {
  const response = await omdbApi.get('', {
    params: {
      apikey: import.meta.env.VITE_OMDB_API_KEY,
      s: search, // Search term
      type, // Type (movie or series)
      page,
      year,
      r: 'json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch movies');
  }

  return response.data;
};

const TopMovies2024 = () => {
  const [querySearchTerm, setQuerySearchTerm] = useState('movie'); // Default search term
  const [type, setType] = useState('movie'); // Default type
  const [year, setYear] = useState(2024); // Default year
  const [currentPage, setCurrentPage] = useState(1);

  const { error, data, isFetching, isLoading } = useQuery({
    queryKey: ['topmovies2024', querySearchTerm, type, year, currentPage], // Include type
    queryFn: () => fetchMovies(querySearchTerm, type, year, currentPage), // Pass search term, type, and page
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (searchTerm: string, selectedType: string) => {
    setQuerySearchTerm(searchTerm); // Update search term
    setType(selectedType); // Update type
    setCurrentPage(1); // Reset page on new search
  };

  const handleYearChange = (selectedYear: number) => {
    setYear(selectedYear); // Update year
    setCurrentPage(1); // Reset page on new year selection
  };

  if (isLoading) return <Loading />;

  if (error) return <Alert message={error.message} type="error" />;

  const totalResults = parseInt(data?.totalResults || '0', 10);

  return (
    <Layout>
      <h2 className="font-bold text-3xl text-black p-4 border rounded-lg my-4">
        Search Movies and Series
      </h2>
      <MovieSearch onSearch={handleSearch} />
      <YearPicker onYearChange={handleYearChange} />
      {isFetching ? <Loading /> : null}
      {data?.Search ? (
        <div className="grid md:grid-cols-4 gap-4">
          {data.Search.map((movie) => (
            <MovieItems movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
      <div className="bg-yellow-500 p-4 m-8">
        <Pagination
          current={currentPage}
          total={totalResults}
          pageSize={10}
          onChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </Layout>
  );
};

export default TopMovies2024;
