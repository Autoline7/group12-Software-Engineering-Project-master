import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { updateEmail, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        setName(userData.name || "");
                        setEmail(userData.email || "");
                        setPhone(userData.phone || "");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                await updateDoc(userDocRef, { name: name, phone: phone });
                if (email !== user.email) await updateEmail(user, email);
                if (password) await updatePassword(user, password);
                alert("Profile updated successfully!");
                navigate("/User-DashBoard");
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert("Failed to update profile. Try again.");
        }
    };

    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
            <div className="input-group">
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-group">
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-group">
                <label>New Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-group">
                <label>Phone Number:</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <button className="save-button" onClick={handleUpdateProfile}>Save Changes</button>
            <button className="cancel-button" onClick={() => navigate("/User-DashBoard")}>Cancel</button>
        </div>
    );
};

export default EditProfile;
