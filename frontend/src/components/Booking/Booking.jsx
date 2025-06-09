import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Booking.css";

const seats = [
  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
  ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
  ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
];

const Booking = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=33482900&i=${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleSeatSelect = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-page">
      <div className="movie-details">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/500"
          }
          alt={movie.Title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1>{movie.Title}</h1>
          <p>{movie.Plot}</p>
        </div>
      </div>
      <h2>Choose Your Seats</h2>
      <p>Selected Seats: {selectedSeats.join(", ")}</p>
      <div className="screen">Screen</div>
      <div className="seat-grid">
        {seats.flat().map((seat) => (
          <div
            key={seat}
            onClick={() => handleSeatSelect(seat)}
            className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
          >
            {seat}
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link to={`/checkout?seats=${selectedSeats.join(",")}`}>
          <button disabled={selectedSeats.length === 0}>
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Booking;
