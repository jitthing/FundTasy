import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/protected', { 
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('authToken');
          navigate('/login');
          alert(response.data.message);
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        navigate('/login');
        alert(error.response.data.message);
      }
    };

    verifyToken();
  }, [navigate]);

  return isAuthenticated ? children : null;
};

export default PrivateRoute;