import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Upload, LogOut } from "lucide-react";
import styles from "./Profile.module.css";
import defaultProfilePic from "../images/profile-pic.png"; 

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [uploading, setUploading] = useState(false);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setProfilePic(currentUser.photoURL || defaultProfilePic);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileBox}>
        <h1 className={styles.heading}>Profile</h1>
        {user ? (
          <>
            <div className={styles.profileInfo}>
              <div className={styles.profilePicContainer}>
                <img src={profilePic} alt="Profile" className={styles.profilePic} />
              </div>

              <label className={styles.uploadBtn}>
                <Upload className={styles.uploadIcon} />
                <input type="file" accept="image/*" hidden />
                {uploading ? "Uploading..." : "Upload New Photo"}
              </label>

              <p className={styles.userInfo}>
                <strong>Name:</strong> {user.displayName || "No name set"}
              </p>
              <p className={styles.userInfo}>
                <strong>Email:</strong> {user.email}
              </p>
            </div>

            <button onClick={handleLogout} className={styles.logoutBtn}>
              <LogOut size={20} className={styles.logoutIcon} />
              Log Out
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
