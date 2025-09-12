import { Navigate } from "react-router-dom";
import { getTokenFromCookies } from "../utils/getToken";
import React, { ReactNode, ReactElement } from "react";

type Props = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: Props): ReactElement => {
  const token = getTokenFromCookies();
  return token ? <>{children}</> : <Navigate to="/login-agent" />;
};


export default PrivateRoute;
