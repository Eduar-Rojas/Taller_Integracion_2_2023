import sushi from "./assets/img/sushi-ejemplo.png";

export const MasVendido = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-10 sm:flex-col">
      <div>
        <button
          style={{
            backgroundImage: `url(${sushi})`,
            backgroundSize: "cover",
            textShadow: "2px 5px 10px black",
          }}
          className="btn w-full h-96 text-white font-bold hover:scale-95 text-1xl sm:text-2xl md:text-4xl lg:text-6xl"
        >
          LO MAS VENDIDO
        </button>
      </div>
      <div>
        <button
          style={{
            backgroundImage: `url(${sushi})`,
            backgroundSize: "cover",
            textShadow: "2px 5px 10px black",
          }}
          className="btn w-full h-96 text-white font-bold hover:scale-95 text-1xl sm:text-2xl md:text-4xl lg:text-6xl"
        >
          VISTA PREVIA DEL CATÁLOGO
        </button>
      </div>
    </div>
  );
};
