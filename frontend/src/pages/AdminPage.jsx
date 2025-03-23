import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import "./AdminPage.css";
import Sidebar from "../components/AdminPageComp/Sidebar";
import Header from "../components/AdminPageComp/Header";
import AdminNav from "../components/AdminPageComp/AdminNav";
import AdminMovies from "../components/AdminPageComp/AdminMovies";
import AdminCodes from "../components/AdminPageComp/AdminCodes";
import { Routes, Route } from "react-router-dom";
import AdminUsers from "../components/AdminPageComp/AdminUsers";

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
  const [addCustomerForm, setCustomerForm] = useState(false);
  const [addAdminForm, setAdminForm] = useState(false);


  return (
    <div id="admin">
        <Sidebar logout={logout} />
        <div className="admin__container">
          <Header loading={loading} userData={userData} />
          <AdminNav setAddMovieForm={setAddMovieForm} addMovieForm={addMovieForm} setCustomerForm={setCustomerForm} addCustomerForm={addCustomerForm} setAdminForm={setAdminForm} addAdminForm={addAdminForm}/>
          <hr />
          <Routes>
            <Route index element={<AdminMovies addMovieForm={addMovieForm}/>} />
            <Route path="Manage-Users" element={<AdminUsers addCustomerForm={addCustomerForm} addAdminForm={addAdminForm}/>} />
            <Route path="Manage-PromoCodes" element={<AdminCodes />} />
          </Routes>
        </div>
    </div>
  )
}

export default AdminPage
