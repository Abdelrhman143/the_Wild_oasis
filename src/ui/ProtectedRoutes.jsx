import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoutes({ children }) {
  const navegate = useNavigate();
  const { isPending, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navegate("/login");
    },
    [isAuthenticated, isPending, navegate]
  );

  if (isPending)
    return (
      <FullPage>
        <Spinner></Spinner>
      </FullPage>
    );

  return children;
}

export default ProtectedRoutes;
