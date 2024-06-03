import { useLocation } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  const location = useLocation();
  return (
    <nav className="flex px-5 py-4 items-center justify-between">
        <div className="cursor-pointer" onClick={()=>window.location.href = '/'}>
          <Logo />
        </div>

        {location.pathname === '/' ?(
                <div className="shadow-sm bg-slate-100 px-4 rounded-3xl">
                    <select
                        className="bg-transparent text-slate-600 px-1 py-2 border-r-[16px] border-transparent text-sm outline-none cursor-pointer"
                        title="Select Type"
                        name="type"
                        id="select-type"
                        // onChange={handleSelectChange}
                    >
                        <option value="characters">Characters</option>
                        <option value="episodes">Episodes</option>
                        <option value="locations">Locations</option>
                    </select>
                    <input
                        className="outline-none border-none focus:border-none focus:outline-none bg-transparent w-[400px] h-[50px]"
                        placeholder="Search for your favourite character.."
                        type="text"
                    />
                </div>
            ):(<h1 className="text-xl font-bold text-slate-600">RICK & MORTY</h1>)}
      <div></div>
    </nav>
  );
};

export default Header;
