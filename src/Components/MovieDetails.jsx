import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MovieContext } from '../context/MovieContext';

const API_KEY = '7c9e8da5913f37be7a3143cb211244e7';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const { favorites, setFavorites } = useContext(MovieContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);
        setDetails(res.data);
      } catch {
        alert('Failed to fetch movie details.');
      }
    };
    fetchDetails();
  }, [id]);

  if (!details) return <p className="p-4">Loading...</p>;

  const trailer = details.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const isFavorite = favorites.some(f => f.id === details.id);

  const toggleFavorite = () => {
    setFavorites(prev =>
      isFavorite ? prev.filter(f => f.id !== details.id) : [...prev, details]
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{details.title}</h2>
      <p className="mb-2">{details.overview}</p>
      <p className="mb-2">Genres: {details.genres.map(g => g.name).join(', ')}</p>
      {trailer && <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${trailer.key}`} title="Trailer" frameBorder="0" allowFullScreen></iframe>}
      <button onClick={toggleFavorite} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieDetails;