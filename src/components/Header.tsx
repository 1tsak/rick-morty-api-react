import RickNMorty from "./RickNMorty";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="flex flex-col">
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
      <section className="h-[42vh] w-full relative flex items-center justify-center ">
        <RickNMorty />
        <h2 className="text-8xl font-extrabold text-[#202329]">
          The Rick and Morty
        </h2>
      </section>
    </header>
  );
};

export default Header;
