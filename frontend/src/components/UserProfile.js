import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found, user is not authenticated');
          return;
        }
      
        try {
          const response = await fetch('http://localhost:5000/api/user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          console.log('Response status:', response.status);  // Log status code
          
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch user details: ${errorMessage}`);
          }
      
          const data = await response.json();
          setEmail(data.email);  // Set the email state
        } catch (error) {
          console.error('Error:', error);
        }
      };
      

    fetchUserEmail();
  }, []);

  return (
    <div>
      {email ? <p>Email: {email}</p> : <p>Loading...</p>}
    </div>
  );
};

export default UserProfile;
