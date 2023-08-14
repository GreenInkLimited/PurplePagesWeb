import React, { createContext, useEffect, useState } from "react";
//import { getProfile, getUserProfile } from '../apis/AuthApis';
import { deleteSecureKey, saveSecureKey } from "../utils/authfunctions";

export const AuthContext = createContext();

const AuthProvider = ({ children, _token, _profile }) => {
  const [authState, setAuthState] = useState();
  const [tempAuthState, setTempAuthState] = useState(null);
  //const [userProfile, setUserProfile] = useState(_profile);
  const [token, setToken] = useState(_token);

  const setTokenAsync = async (value) => {
    if (value) {
      setToken(value);
      value = JSON.stringify(value);
      await saveSecureKey("token", value);
    }
  };

  const deleteTokenAsync = async () => {
    deleteSecureKey("token");
    deleteSecureKey("profile");
    setToken(null);
    //setUserProfile(null);
  };

  useEffect(() => {
    const loadUserAsync = async () => {
      if (token) {
        try {
          console.log(token, "the token");
          //let profile = await getUserProfile(token);
          //setUserProfile(profile);
          //profile = JSON.stringify(profile);
          //await saveSecureKey('profile', profile);
        } catch (e) {
          console.log(">>>>>Setting User Data<<<<<<<");
          console.log(Object.keys(e));
          console.log(e.message);
        }
      }
    };
    loadUserAsync();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        tempAuthState,
        setTempAuthState,
        setTokenAsync,
        deleteTokenAsync,
        token,
        //userProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
