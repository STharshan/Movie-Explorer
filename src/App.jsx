import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import Home from './Pages/Home';
import MovieDetails from './Components/MovieDetails';
import Favorites from './Pages/Favorites';
import Login from './Pages/Login';
import { MovieContextProvider } from './Context/MovieContext';

const App = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const isAuthenticated = () => !!localStorage.getItem('user');

  return (
    <MovieContextProvider>
      <div className={theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}>
        <Router>
          <header className="flex justify-between p-4 shadow-md">
            <Link to="/" className="text-xl font-bold">Movie Explorer</Link>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="cursor-pointer p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {theme === 'light' ? <Moon /> : <Sun />}
              </button>
              {isAuthenticated() && (
                <button
                  onClick={() => {
                    //localStorage.removeItem('user');
                    window.location.href = '/login';
                  }}
                  className="cursor-pointer text-sm text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-4 py-2 rounded-full shadow-md transition"
                >
                  Logout
                </button>
              )}
            </div>
          </header>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
            <Route path="/movie/:id" element={isAuthenticated() ? <MovieDetails /> : <Navigate to="/login" />} />
            <Route path="/favorites" element={isAuthenticated() ? <Favorites /> : <Navigate to="/login" />} />
          </Routes>
        </Router>
      </div>
    </MovieContextProvider>
  );
};

export default App;
