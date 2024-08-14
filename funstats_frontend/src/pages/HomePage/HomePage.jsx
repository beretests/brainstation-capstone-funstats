import heroImage from "./../../assets/images/hero.jpg";
import "./HomePage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const url = import.meta.env.VITE_API_URL;
  // console.log(url);

  // const location = useLocation();
  //   const { warehouseId } = useParams();

  //   if (location.pathname === "/warehouse/addNewWarehouse") {
  //       return (
  //           <AddNewWarehousePage />
  //       )
  //   } else if (location.pathname === `/warehouse/editWarehouse/${warehouseId}`) {
  //       return (
  //           <EditWarehousePage />
  //       )
  //   } else if (location.pathname === `/warehouse/${warehouseId}`) {
  //       return (
  //           <WarehouseDetailsPage />
  //       )
  //   } else {
  //       return (
  //           <WarehouseList />
  //       )
  //   }

  const id = "3aa3a66a-bc1d-4f52-83fc-88d39e2a1cce";
  const navigate = useNavigate();

  const handleClick = async (id) => {
    try {
      const data = await axios.get(`${url}/player/${id}`);
      navigate(`/player/${id}`, { state: { data: data.data } });
    } catch (err) {
      alert("Error: ", err);
    }
  };

  return (
    <>
      <div className="home">
        <div className="home__image-container">
          <img
            src={heroImage}
            alt="kids around a soccer ball"
            className="home__hero-image"
          />
        </div>
        <div className="home__blurb-container">
          <h1 className="home__page-header">FunStats App</h1>
          <h2 className="home__subheader">
            Goals, Stats and Friendly Rivalries!
          </h2>
          <button className="home__button" onClick={() => handleClick(id)}>
            Login/Register
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
