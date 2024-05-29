import React from "react";
import RickNMorty from "./RickNMorty";

const Header = () => {
  return (
    <header className="flex flex-col">
      <nav className="flex px-5 py-4 items-center justify-between">
        <a href="">LOGO</a>
        <div className="shadow-sm bg-slate-100 px-5 rounded-lg">
          <input className="outline-none border-none focus:border-none focus:outline-none bg-transparent w-[400px] h-[50px] " placeholder="Character name ..." type="text" />
        </div>
        <div></div>
      </nav>
      <section className="h-[44vh] w-full relative flex items-center justify-center ">
        <RickNMorty />
        <h2 className="text-8xl font-extrabold">The Rick and Morty</h2>
      </section>
    </header>
  );
};

export default Header;
