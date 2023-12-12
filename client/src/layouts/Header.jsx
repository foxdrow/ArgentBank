import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";

const Header = (props) => {
  const userId = useSelector((state) => state.user.id);
  return (
    <header>
      {userId}
      <nav>
        <NavLink
          to="/"
          exact="true"
          className={({ isActive }) => "nav_link" + (isActive ? " active" : "")}
        >
          Accueil
        </NavLink>
        <NavLink to="/about" exact="true" className="nav_link">
          A propos
        </NavLink>
      </nav>
    </header>
  );
};
export default Header;
