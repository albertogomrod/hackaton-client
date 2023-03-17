import "../App.css";
import logoBlanco from "../assets/logo-blanco.png";

function Footer() {
  return (
    <footer className="footer">
      <img
        style={{ marginBottom: "10px" }}
        src={logoBlanco}
        alt="logo-blanco"
        width="80vh"
      />
      <br />
      <h6>Proyecto de Aaron Barcos y Alberto Gómez</h6>
      <p>© 2023 Copyright: La Dupla Creations</p>
    </footer>
  );
}

export default Footer;
