import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { useUser } from "../features/authentication/useUser";
import { Navigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoutes({ children }) {
  const { isPending, isAuthenticated } = useUser();

  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoutes;
