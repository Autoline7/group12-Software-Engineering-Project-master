import InputField from "./InputField"
import SocialLogin from "./SocialLogin"
import { auth, db } from "../../firebase/firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "../LogIn-SignUp.css";

const LogIn = () => {
  const[email , setEmail] = useState("");
  const[password , setPassword] = useState("");
  const[user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {//if user is already signed in
        
        const unsubscribe =  onAuthStateChanged(auth, async (user) => {
          if(user){
            setUser(user);
            try{
              const userDocRef = doc(db, 'users', user.uid);
              const userDocSnap = await getDoc(userDocRef);
              if(userDocSnap.exists()){
                const userData = userDocSnap.data();

                if(userData.role === "admin"){
                  console.log("Redirecting to Admin Dashboard...");
                  navigate('/Admin-DashBoard');
                }
                else {
                  console.log("Redirecting to User Dashboard...");
                  navigate('/User-Dashboard');
                }
              }
            } catch (error){
              console.log("Error Fetching user role: ", error);
            }
            
          }
        })
        return () => unsubscribe();
      }, [auth, db, navigate]);

   function logIn(e){
    e.preventDefault();
    console.log("login()");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      
   }

  return (
    <div id="Log-In-Sign-Up">
      <div  className="login-container">
          <h2 className="form-title">Log in with</h2>
          <SocialLogin />

          <p className="separator"><span>or</span></p>

          <form onSubmit={logIn} action="#" className="login-form">
            <InputField value={email} type="email" placeholder="Email address" icon="mail" onChange={(e) => setEmail(e.target.value)}/>
            <InputField value={password} type="password" placeholder="Password" icon="lock" onChange={(e) => setPassword(e.target.value)} />
            
            <a href="#" className="forgot-pass-link">Forgot Password?</a>

             <button type="submit" className="login-button">Log In</button>
           </form>

           <p className="signup-text">Don&apos;t have an account? <a href="/Sign-Up">Sign Up now</a></p>
           <p className="signup-text">An admin? <a href="/Sign-Up/Admin">Sign Up now</a></p>
          
        </div>
      </div>
  )
}

export default LogIn
