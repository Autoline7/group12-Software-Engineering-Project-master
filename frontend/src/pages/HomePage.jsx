import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";

const moviesData = [
  { id: 1, title: "Inception", category: "Currently Running", trailer: "https://www.youtube.com/embed/YoHD9XEInc0" },
  { id: 2, title: "Interstellar", category: "Coming Soon", trailer: "https://www.youtube.com/embed/zSWdZVtXT7E" },
  { id: 3, title: "The Dark Knight", category: "Currently Running", trailer: "https://www.youtube.com/embed/EXeTwQWrcwY" },
  { id: 4, title: "Avatar", category: "Currently Running", trailer: "https://www.youtube.com/embed/5PSNL1qE6VY" },
  { id: 5, title: "Titanic", category: "Coming Soon", trailer: "https://www.youtube.com/embed/kVrqfYjkTdQ" },
  { id: 6, title: "The Matrix", category: "Currently Running", trailer: "https://www.youtube.com/embed/vKQi3bBA1y8" },
  { id: 7, title: "Gladiator", category: "Coming Soon", trailer: "https://www.youtube.com/embed/P5ieIbInFpg" },
  { id: 8, title: "Jurassic Park", category: "Currently Running", trailer: "https://www.youtube.com/embed/QWBKEmWWL38" },
  { id: 9, title: "Mean Girls", category: "Coming Soon", trailer: "https://www.youtube.com/embed/KAOmTMCtGkI" },
  { id: 10, title: "Avengers: Endgame", category: "Currently Running", trailer: "https://www.youtube.com/embed/TcMBFSGVi1c" }
];

const HomePage = () => {

    const [moviesDataApi, setMoviesDataApi] = useState([]);

     useEffect(() => {
        fetchItems();
    }, []); 

    const fetchItems = async () => {
        try {
          const {data} = await axios.get("http://localhost:8080/api/movies");
          console.log(data);
          setMoviesDataApi(data);
        } catch (e) {
            console.error(e.message);
        }
    } 

    console.log(moviesDataApi);
    const [searchTerm, setSearchTerm] = useState("");

  const filteredMovies = moviesDataApi.filter((movie) =>{
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    console.log(movie);
  }
  );

  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Cinema E-Booking</h1>
        <div className="auth-buttons">
          <Link to="/Log-In" className="auth-button">Login</Link>
          <Link to="/Sign-Up" className="auth-button">Sign Up</Link>
        </div>
      </header>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <h2>Currently Running</h2>
      <div className="movies-section">
        {filteredMovies
          .filter((movie) => movie.runningStatus=== "Currently Running")
          .map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <iframe
                width="300"
                height="200"
                src={movie.video}
                title={movie.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button className="book-button">Book Movie</button>
            </div>
          ))}
      </div>
      <h2>Coming Soon</h2>
      <div className="movies-section">
        {filteredMovies
          .filter((movie) => movie.runningStatus=== "Coming Soon")
          .map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <iframe
                width="300"
                height="200"
                src={movie.video}
                title={movie.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button className="book-button">Book Movie</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
