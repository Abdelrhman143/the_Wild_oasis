import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonIcon from "../ui/ButtonIcon";
import LogOut from "../features/authentication/LogOut";
import { HiOutlineUser } from "react-icons/hi";

const StyledHeaderMunu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMunu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <LogOut />
      </li>
    </StyledHeaderMunu>
  );
}

export default HeaderMenu;
