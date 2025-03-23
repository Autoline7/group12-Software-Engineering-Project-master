import InputField from "./InputField.jsx"
import SocialSignUp from "./SocialSignUp.jsx"
import { auth, db } from "../../firebase/firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../LogIn-SignUp.css";
import SimpleAlert from "../SimpleAlert";
import axios from "axios";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [givenSecPass, setGivenSecPass] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [promoCode, setPromoCode] = useState("");
    
    const navigate = useNavigate();
    const location = useLocation();

    const [formCustomer, setCustomer] = useState({
        address: { street: "", city: "", state: "", zipCode: "", country: "" }, // Optional
        decryptedPassword: "",
        email: "",
        firstName: "",
        isSubscriber: "FALSE",
        lastName: "",
        role: "CUSTOMER",
        status: "ACTIVE",
    });

    useEffect(() => {
        setIsAdmin(location.pathname.toLowerCase().includes("admin"));
    }, [location.pathname]);

    useEffect(() => {
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            firstName,
            lastName,
            email,
            decryptedPassword: password,
        }));
    }, [firstName, lastName, email, password]);

    const handleAlert = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    async function signUp(event) {
        event.preventDefault();

        try {
            // Send verification code
            const response = await axios.post("http://localhost:8080/api/customers/send-verification", { email });
            console.log("Verification response:", response.data);
            
            // Show popup for user to enter the code
            setShowPopup(true);
            
        } catch (error) {
            console.error("Error sending verification code:", error.message);
        }
    }

    async function verifyCodeAndCreateAccount() {
        try {
            // Verify the code
            const verifyResponse = await axios.post("http://localhost:8080/api/customers/verify", { email, code: verificationCode });
            console.log("Verification status:", verifyResponse.data);


            // Create the customer
            console.log("Data being sent:", formCustomer);
            await axios.post("http://localhost:8080/api/customers", formCustomer);

            await axios.post("")

            // Hide popup and show success alert
            setShowPopup(false);
            handleAlert();

            setTimeout(() => {
                navigate(isAdmin ? "/Admin-DashBoard" : "/User-Dashboard");
            }, 3000);

        } catch (error) {
            console.error("Error verifying code:", error.message);
            alert("Invalid verification code. Please try again.");
        }
    }

    return (
        <div id="Log-In-Sign-Up">
            <div className="login-container">
                <h2 className="form-title">Sign Up with</h2>
                <SocialSignUp />

                <p className="separator"><span>or</span></p>

                <h2 className="form-title">Create Account</h2>
                <form onSubmit={signUp} action="#" className="login-form">
                    <p className="registration__fields">* Required *</p>
                    <InputField value={firstName} type="text" placeholder="First Name" icon="person" onChange={(e) => setFirstName(e.target.value)} />
                    <p className="registration__fields">* Required *</p>
                    <InputField value={lastName} type="text" placeholder="Last Name" icon="person" onChange={(e) => setLastName(e.target.value)} />
                    <p className="registration__fields">* Required *</p>
                    <InputField value={email} type="email" placeholder="Email address" icon="mail" onChange={(e) => setEmail(e.target.value)} />
                    <p className="registration__fields">* Required *</p>
                    <InputField value={password} type="password" placeholder="Password.....(6 >= characters)" icon="lock" onChange={(e) => setPassword(e.target.value)} />
                    <p className="registration__fields">* Required *</p>
                    <InputField value={phone} type="tel" placeholder="Phone Number" icon="call" onChange={(e) => setPhone(e.target.value)} />
                    <p className="registration__fields">* Required *</p>
                    <InputField value={phone} type="tel" placeholder="Promo Code" icon="sell" onChange={(e) => setPhone(e.target.value)} />

                    {location.pathname === "/Sign-Up/Admin" ? (
                        <>
                            <p className="registration__fields">* Required *</p>
                            <InputField value={givenSecPass} type="password" placeholder="Admin Security Password.....(6 >= characters)" icon="lock" onChange={(e) => setGivenSecPass(e.target.value)} />
                            <button disabled={givenSecPass !== "admin123"} type="submit" className="login-button">Create Account</button>
                        </>
                    ) : (
                        <button type="submit" className="login-button">Create Account</button>
                    )}
                </form>

                <p className="signup-text">Already have an account? <a href="/Log-In">Login now</a></p>
                {showAlert && <SimpleAlert message="Registration Successful!!!" />}

                {showPopup && (
                    <div className="login-form signup__popup">
                        <div className="popup-content">
                            <h3>Enter Verification Code</h3>
                            <InputField
                                value={verificationCode}
                                type="text"
                                placeholder="Enter your code"
                                icon="key"
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <button onClick={verifyCodeAndCreateAccount} className="login-button">Verify</button>
                            <button onClick={() => setShowPopup(false)} className="cancel-button">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SignUp;
