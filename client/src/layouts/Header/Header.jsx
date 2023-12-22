import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { signInOut } from "../../pages/SignIn/signInSlice";

import Logo from "../../assets/img/argentBankLogo.png";

const Header = (props) => {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.signIn);
  const handleSignOut = () => {
    dispatch(signInOut());
    delete localStorage.token;
    navigate("/");
  };
  return (
    <header>
      {userId}
      <nav className="main-nav">
        <NavLink className="main-nav-logo" to="/" exact="true">
          <img class="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
        </NavLink>
        <div>
          <NavLink className="main-nav-item" to="/sign-in">
            <i class="fa fa-user-circle"></i>
            Sign In
          </NavLink>
          {auth && (
            <NavLink className="main-nav-item" onClick={() => handleSignOut()}>
              <i class="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
