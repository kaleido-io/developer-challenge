import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfile } from '../services/authService';

const MainPage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await getProfile(token);
        if (response.error) {
          setMessage(response.error);
        } else {
          setProfile(response.user);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setProfile(null);
  };

  return (
    <div className="container mx-auto">
      <nav className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Voting App</h1>
        <div>
          {profile ? (
            <div>
              <span className="mr-4">Welcome, {profile.username}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded">Register</Link>
            </div>
          )}
        </div>
      </nav>
      {message && <p className="mt-4">{message}</p>}
      {profile && (
        <div>
          <p>Username: {profile.username}</p>
          <p>Created At: {new Date(profile.created_at).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
