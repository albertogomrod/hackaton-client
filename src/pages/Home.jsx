import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import HomeHackatons from "../components/HomeHackatons"
import HomeTutorials from "../components/HomeTutorials"
import HomeCercaDeTi from "../components/HomeCercaDeTi"

function Home() {

  return (
    <div>
    <HomeHackatons />
    <HomeCercaDeTi />
    <HomeTutorials />
    </div>
  )
}

export default Home