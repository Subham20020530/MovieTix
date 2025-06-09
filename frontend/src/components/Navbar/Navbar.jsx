import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, LogOut } from "lucide-react";
import { auth, storage } from "../../firebase";
import { signOut } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";

function Navbar({ searchQuery, setSearchQuery, setMovies }) {
  const [searching, setSearching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);

      // Fetch profile picture from Firebase Storage
      const profilePicRef = ref(storage, `profile_pictures/${currentUser.uid}`);
      getDownloadURL(profilePicRef)
        .then((url) => setProfilePic(url))
        .catch(() => setProfilePic(null)); // If no profile picture is found, use default icon
    }
  }, []);

  const searchMovies = async (e) => {
    e.preventDefault();
    setSearching(true);
    const url = `http://www.omdbapi.com/?apikey=33482900&s=${searchQuery}&type="movie"`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      }
      setSearching(false);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setSearching(false);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch((err) => {
        console.error("Error logging out:", err);
      });
  };

  return (
    <div className="min-w-screen text-white">
      <nav className="bg-transparent w-full p-5 flex items-center justify-between shadow-none">
        <Link
          to="/home"
          className="cursor-pointer text-3xl font-extrabold text-[#f5c518] tracking-wide"
        >
          🎟️ MovieTix
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden block text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={28} />
        </button>

        {/* Search Bar */}
        <form
          onSubmit={searchMovies}
          className="hidden sm:flex items-center bg-gray-800 px-4 py-2 rounded-lg w-72"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies..."
            className="bg-transparent outline-none text-white placeholder-gray-400 flex-1 px-2"
          />
        </form>

        <div
          className={`sm:flex items-center space-x-6 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          {user ? (
            <>
              {/* Profile Icon */}
              <Link to="/profile" className="flex items-center space-x-2">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                ) : (
                  <User className="w-10 h-10 text-[#f5c518]" />
                )}
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xl font-bold hover:text-[#e5b507] text-[#f5c518]"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-xl font-bold hover:text-[#e5b507] text-[#f5c518]"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
