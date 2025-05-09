import React, { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const { movies, searchTerm, setSearchTerm, fetchTrending, fetchMore } = useContext(MovieContext);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filterPage, setFilterPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (!searchTerm && !isFiltering) fetchTrending();
  }, [searchTerm, fetchTrending, isFiltering]);

  const handleFilter = async (page = 1) => {
    let query = '';
    if (genre) query += `&with_genres=${genre}`;
    if (year) query += `&primary_release_year=${year}`;
    if (rating) query += `&vote_average.gte=${rating}`;
  
    const filteredURL = `https://api.themoviedb.org/3/discover/movie?api_key=7c9e8da5913f37be7a3143cb211244e7&page=${page}${query}`;
  
    try {
      const response = await fetch(filteredURL);
      const data = await response.json();
  
      if (response.ok && data.results) {
        setSearchTerm('');
        localStorage.setItem('lastSearch', '');
        setIsFiltering(true);
        setFilteredMovies(prev =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setFilterPage(page);
      } else {
        console.error('API Error:', data);
        alert('Failed to filter movies. API returned an error.');
      }
    } catch (err) {
      console.error('Network Error:', err);
      alert('Failed to filter movies. Network error.');
    }
  };

  const handleLoadMore = () => {
    if (isFiltering) {
      handleFilter(filterPage + 1);
    } else {
      fetchMore();
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="p-2 border rounded">
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
          <option value="10749">Romance</option>
        </select>

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          placeholder="Min Rating (0-10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-2 border rounded appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => handleFilter(1)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
        >
          Apply Filters
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {(filteredMovies.length > 0 ? filteredMovies : movies).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="text-center py-4">
        <button
          onClick={handleLoadMore}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Home;
