import React from "react";
import { HomeNavigator } from "../Home";
import { AuthNavigator } from "../Auth";
import { useAuth } from "../../hooks";
import { Loading } from "../../components";

export const MainNavigator = () => {
  const { isAuth, loading } = useAuth();

  return (
    <>
      {!loading ? (
        isAuth ? (
          <HomeNavigator />
        ) : (
          <AuthNavigator />
        )
      ) : (
        <Loading></Loading>
      )}
    </>
  );
};
