import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { addGlory } from "../glory/glorySlice";
import { fetchCategoryPassed, setUserName } from "../user/userSlice";
import { useAppDispatch } from "./redux/store";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const user = localStorage.getItem("userName");
  const categoryPassed = localStorage.getItem("categoryPassed");
  const dispatch = useAppDispatch();
  if (user !== "") {
    dispatch(setUserName(user));
  }
  if (categoryPassed) {
    dispatch(fetchCategoryPassed());
  }

  useEffect(() => {
    const categoryArr = categoryPassed?.split(",");
    if (categoryArr?.length === 3 && user) {
      dispatch(addGlory(user));
    }
  }, [categoryPassed, dispatch, user]);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}
