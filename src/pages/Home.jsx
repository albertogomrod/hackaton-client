import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

// Components
import HomeHackatons from "../components/HomeHackatons";
import HomeTutorials from "../components/HomeTutorials";
import HomeCercaDeTi from "../components/HomeCercaDeTi";
import HomeNoLogged from "../components/HomeNoLogged";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === true) {
    return (
      <div id= "home" >
      <br />
      <h2 id="bienvenida">¡Bienvenido a Jacatón!</h2>
      <h4>Los mejores eventos del país al alcance de tu mano</h4>
        <HomeHackatons />
        <HomeCercaDeTi />
        <HomeTutorials />
      </div>
    );
  } else {
    return (
      <div id= "home">
        <HomeNoLogged />
      </div>
    );
  }
}

export default Home;
