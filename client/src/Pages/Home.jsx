import { Link } from "react-router-dom";
import bannerImage from "../assets/Banner.jpg";
import './home.css'


const Home = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      <div className="hero-overlay "></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xs text-black ml-10">
          <h1 className="mb-5 md:text-3xl lg:text-4xl font-bold handwritten uppercase">
            Hello there
          </h1>
          <p className="mb-5 font-bold handwritten sm:text-sm md:text-md lg:text-lg">
            Welcome to Lunch Time
          </p>
          <Link to='/menu' className="btn btn-primary">Open it</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
