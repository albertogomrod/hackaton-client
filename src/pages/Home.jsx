import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

// Components
import HomeHackatons from "../components/HomeHackatons"
import HomeTutorials from "../components/HomeTutorials"
import HomeCercaDeTi from "../components/HomeCercaDeTi"
import HomeNoLogged from "../components/HomeNoLogged"

function Home() {

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn === true) {
    return (
      <div>
      <HomeHackatons />
      <HomeCercaDeTi />
      <HomeTutorials />
      </div>
    )
  } else {
    return (
      <div>
        <HomeNoLogged />
      </div>
    )
  }

  
}

export default Home