import Logo from "./Logo";

const Header = () => {
  return (
      <nav className="flex px-5 py-2 items-center justify-between">
        <Logo />
        <div className="shadow-sm bg-slate-100 px-8 rounded-3xl">
          <input
            className="outline-none border-none focus:border-none focus:outline-none bg-transparent w-[400px] h-[50px] "
            placeholder="Search for your favourite character.."
            type="text"
          />
        </div>
        <div></div>
      </nav>
  );
};

export default Header;
