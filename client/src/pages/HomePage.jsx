import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="bg-red-500 flex justify-center items-center">
      <header className="bg-zinc-800 p-10">
        <h1 className="text-5xl text-center py-2 font-bold mb-10">
          RappyMarket
        </h1>
        <p className="text-justify text-lg text-slate-400 mb-6">
          ¡Bienvenido a RappyMarket Licores! 🍷🥃 Descubre nuestra amplia
          selección de licores, vinos, cervezas y bebidas premium, todo
          disponible online con entrega rápida y segura en tu puerta. ¿Por qué
          elegirnos? Variedad Premium: Licores, cervezas artesanales y vinos de
          marcas reconocidas y productos exclusivos. Entrega Rápida: Disfruta de
          tu pedido sin esperas. Precios y Ofertas: Precios competitivos y
          promociones irresistibles. Atención Personalizada: Recomendaciones a
          tu medida. Explora nuestra tienda online y haz de cada brindis un
          momento único con RappyMarket Licores. ¡Brindemos por ti! 🥂
        </p>
        <p className="text-center text-lg text-slate-400 mb-4">
          En RappyMarket Licores, tu próximo brindis está a solo un clic de
          distancia.
        </p>

        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
          Comenzar
        </Link>
      </header>
    </section>
  );
}

export default HomePage;
