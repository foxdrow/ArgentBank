import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.scss";

import Logo from "../../assets/img/argentBankLogo.png";

const Header = (props) => {
  const userId = useSelector((state) => state.user.id);
  return (
    <header>
      {userId}
      <nav className="main-nav">
        <NavLink className="main-nav-logo" to="/" exact="true">
          <img class="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
        </NavLink>
        <NavLink className="main-nav-item" to="/sign-in">
          <i class="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      </nav>
    </header>
  );
};
export default Header;
