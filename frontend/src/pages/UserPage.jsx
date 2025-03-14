import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./UserPage.css";

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

const UserPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserName(userDocSnap.data().name);
        }
      }
      
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/Log-In");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Filter movies based on the search input
  const filteredMovies = moviesData.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <header className="header">
        <h1>Hi, {userName}</h1>
        <div className="user-buttons">
          <button className="account-button" onClick={() => navigate("/Edit-Profile")}>My Account</button>
          <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
        </div>
      </header>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Filtered "Currently Running" movies */}
      <h2 className="user__h2">Currently Running</h2>
      <div className="movies-section">
        {filteredMovies
          .filter(movie => movie.category === "Currently Running")
          .map(movie => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <iframe
                width="300"
                height="200"
                src={movie.trailer}
                title={movie.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button className="book-button" onClick={() => navigate(`/Book-Ticket/${movie.id}`)}>Book Movie</button>
            </div>
        ))}
      </div>

      {/* Filtered "Coming Soon" movies */}
      <h2>Coming Soon</h2>
      <div className="movies-section">
        {filteredMovies
          .filter(movie => movie.category === "Coming Soon")
          .map(movie => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <iframe
                width="300"
                height="200"
                src={movie.trailer}
                title={movie.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button className="book-button" onClick={() => navigate(`/Book-Ticket/${movie.id}`)}>Book Movie</button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
