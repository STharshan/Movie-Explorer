import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

const API_KEY = '7c9e8da5913f37be7a3143cb211244e7';
const BASE_URL = 'https://api.themoviedb.org/3';

export const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('lastSearch') || '');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [page, setPage] = useState(1);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        searchMovies(searchTerm, 1);
        localStorage.setItem('lastSearch', searchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const searchMovies = async (query, page = 1) => {
    try {
      const res = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
      setMovies(page === 1 ? res.data.results : prev => [...prev, ...res.data.results]);
      setPage(page);
    } catch {
      alert('Failed to fetch search results.');
    }
  };

  const fetchMore = () => {
    if (searchTerm) {
      searchMovies(searchTerm, page + 1);
    }
  };

  const fetchTrending = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
      setMovies(res.data.results);
    } catch {
      alert('Failed to load trending movies.');
    }
  };

  return (
    <MovieContext.Provider value={{ movies, searchTerm, setSearchTerm, searchMovies, fetchTrending, favorites, setFavorites, fetchMore }}>
      {children}
    </MovieContext.Provider>
  );
};