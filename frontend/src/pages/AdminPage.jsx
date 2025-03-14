import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import "./AdminPage.css";
import Sidebar from "../components/AdminPageComp/Sidebar";
import Header from "../components/AdminPageComp/Header";
import AdminNav from "../components/AdminPageComp/AdminNav";
import {useLocation } from "react-router-dom";
import AdminMovies from "../components/AdminPageComp/AdminMovies";
import AdminCodes from "../components/AdminPageComp/AdminCodes";
import AdminUsers from "../components/AdminPageComp/AdminUsers";
import { Routes, Route } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {//if user is not signed in take them to log in
    onAuthStateChanged(auth, async (user) => {
      if(!user){
        navigate('/Log-In');
      } else{
        setUser(user);
        const userRef = doc(db, "users", user.uid); 
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data()); // Set the user data
        }
        setLoading(false);
      }

    })
  }, [auth, navigate]);

  function logout() {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  }


  const [addMovieForm, setAddMovieForm] = useState(false);
  const location = useLocation();


  return (
    <div id="admin">
        <Sidebar logout={logout} />
        <div className="admin__container">
          <Header loading={loading} userData={userData} />
          <AdminNav setAddMovieForm={setAddMovieForm} addMovieForm={addMovieForm} />
          <hr />
          <Routes>
            <Route index element={<AdminMovies addMovieForm={addMovieForm} />} />
            <Route path="Manage-Users" element={<AdminUsers />} />
            <Route path="Manage-PromoCodes" element={<AdminCodes />} />
          </Routes>
        </div>
    </div>
  )
}

export default AdminPage
