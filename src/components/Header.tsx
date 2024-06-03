import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SearchDialog from "./SearchDialog";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="flex px-5 py-4 items-center justify-between relative">
      <div
        className="cursor-pointer"
        onClick={() => (navigate("/"))}
      >
        <Logo />
      </div>

      {location.pathname === "/" || location.pathname === "/search" ? (
        <SearchDialog />
      ) : (
        <h1 className="text-xl font-bold text-slate-600">RICK & MORTY</h1>
      )}
      <div></div>
    </nav>
  );
};

export default Header;
