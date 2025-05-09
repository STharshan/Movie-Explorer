import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
  <Link to={`/movie/${movie.id}`} className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow hover:scale-105 transition">
    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="w-full" />
    <div className="mt-2">
      <h3 className="text-sm font-bold">{movie.title}</h3>
      <p className="text-xs">{movie.release_date?.split('-')[0]} | ⭐ {movie.vote_average}</p>
    </div>
  </Link>
);

export default MovieCard;
