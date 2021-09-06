import { createContext, useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [group, setGroup] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies()  {
      const token =  Cookies.get('token');
      if(token) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        await api.get('/me',)
        .then(function (response) {
            setUser(response.data.user);
            // setGroup(response.data.group);
            setLoading(false);
        })
        .catch(function (error) {
            Cookies.remove('token')
            setUser(null)
            delete api.defaults.headers.Authorization  
        });
      } else {

      }
    }

    loadUserFromCookies();
  }, [])


  return(
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, setUser, loading, group, setGroup}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
