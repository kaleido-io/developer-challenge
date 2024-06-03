import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/authService';

const Profile = () => {
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
      } else {
        setMessage('Please log in first');
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
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

export default Profile;
