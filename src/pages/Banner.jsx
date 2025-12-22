import { Link } from "react-router";
import bg from "../assets/banner.jpg";

const Banner = () => {
  return (
    <section
      className="relative h-screen bg-center bg-cover bg-no-repeat flex items-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Donate Blood, <span className="text-red-400">Save Lives</span> 🩸
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            Become a hero today or find donors near you.
            Every drop of blood counts.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <button className="px-10 py-3 rounded-full bg-red-600 hover:bg-red-700 transition font-semibold shadow-lg">
                Join as a Donor
              </button>
            </Link>

            <Link to="/search-request">
              <button className="px-10 py-3 rounded-full border-2 border-white hover:bg-white hover:text-red-700 transition font-semibold shadow-lg">
                Search Donors
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
