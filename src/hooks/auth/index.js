import React, { createContext, useContext, useState, useEffect } from "react";
import firebase from "firebase";
import { Persistence } from "../../services";

const EMAIL_ALREADY_IN_USE = "auth/email-already-in-use";
const INVALID_EMAIL = "auth/invalid-email";
const WEAK_PASSWORD = "auth/weak-password";
const WRONG_PASSWORD = "auth/wrong-password";
const USER_NOT_FOUND = "auth/user-not-found";

const formatSignupError = (code) => {
  switch (code) {
    case EMAIL_ALREADY_IN_USE:
      return "Email já está em uso, por favor utilize outro.";
    case INVALID_EMAIL:
      return "Email inválido.";
    case WEAK_PASSWORD:
      return "Por favor informe uma senha mais forte. (mínimo 6 caracteres)";
    default:
      return "Ocorreu um erro ao tentar criar seu usuário.";
  }
};

const formatSigninError = (code) => {
  switch (code) {
    case INVALID_EMAIL:
      return "Email inválido.";
    case WRONG_PASSWORD || USER_NOT_FOUND:
      return "Email ou senha incorretos.";
    default:
      return "Ocorreu um erro ao tentar efetuar o login.";
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSuccess = async ({ uid, email }) => {
    await Persistence.setItem(
      Persistence.USER_KEY,
      JSON.stringify({
        uid,
        email,
      })
    );

    setIsAuth(true);
    setLoading(false);
  };

  const signin = async ({ email, password, toast, navigation }) => {
    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (result?.user) {
        handleSuccess(result.user);
      }
    } catch ({ code }) {
      toast.show({
        description: formatSigninError(code),
        status: "error",
      });

      setLoading(false);
    }
  };

  const signup = async ({ email, password, toast, navigation }) => {
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (result?.user) {
        handleSuccess(result.user);
      }
    } catch ({ code }) {
      toast.show({
        description: formatSignupError(code),
        status: "error",
      });
    }
  };

  const requestPasswordRecovery = async ({ email, toast }) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);

      toast.show({
        description: "Email enviado com sucesso.",
        status: "success",
      });
    } catch (error) {
      toast.show({
        description: "Ocorreu um erro ao tentar enviar o email.",
        status: "error",
      });
    }
  };

  useEffect(() => {
    const fn = async () => {
      const result = await Persistence.getItem(Persistence.USER_KEY);

      if (result) {
        const parsed = JSON.parse(result);

        if (parsed.uid) {
          setIsAuth(true);
        }
      }
      setLoading(false);
    };

    fn();
  }, []);

  const logout = async () => {
    await firebase.auth().signOut();
    await Persistence.removeItem(Persistence.USER_KEY);

    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        loading,
        signin,
        signup,
        requestPasswordRecovery,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
