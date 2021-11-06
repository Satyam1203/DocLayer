import { Link } from "react-router-dom";
import img from "../my_files.png";

function HomePage() {
  return (
    <div className="home-container">
      <div className="section">
        <h1 className="headline">Create documents on the go.</h1>
        <p className="description">
          This online editor would allow you to create your documents, access it
          from any device and download it as pdf. Have fun!
        </p>
        <Link to="/create">
          Create <i className="fas fa-plus"></i>
        </Link>
      </div>
      <div className="image-wrapper">
        <img src={img} alt="my files" />
      </div>
    </div>
  );
}

export default HomePage;
