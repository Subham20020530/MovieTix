import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const predefinedPopularMovies = [
  "tt0111161",
  "tt0068646",
  "tt0071562",
  "tt0468569",
  "tt0050083",
  "tt0108052",
  "tt0167260",
  "tt0110912",
  "tt0060196",
  "tt0137523",
];

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response;
        if (searchQuery) {
          response = await axios.get(
            `https://www.omdbapi.com/?apikey=33482900&s=${searchQuery}&type=movie`
          );
          setMovies(response.data.Search);
        } else {
          const moviePromises = predefinedPopularMovies.map((id) =>
            axios.get(`https://www.omdbapi.com/?apikey=33482900&i=${id}`)
          );
          const movieResponses = await Promise.all(moviePromises);
          setMovies(movieResponses.map((res) => res.data));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  return (
    <div className="home-container">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setMovies={setMovies}
      />
      <div className="show-listings">
        {movies &&
          movies.map((movie) => (
            <div key={movie.imdbID} className="show-item">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/500"
                }
                alt={movie.Title}
                className="show-image"
              />
              <h2 className="movie-title">{movie.Title}</h2>
              <Link to={`/booking/${movie.imdbID}`}>
                <button className="book-button">Book</button>
              </Link>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
