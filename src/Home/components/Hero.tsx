import RickNMorty from "../../components/RickNMorty"

const Hero = () => {
  return (
    <section className="h-[42vh] w-full relative flex items-center justify-center ">
        <RickNMorty />
        <h2 className="text-8xl font-extrabold text-[#202329]">
          The Rick and Morty
        </h2>
      </section>
  )
}

export default Hero