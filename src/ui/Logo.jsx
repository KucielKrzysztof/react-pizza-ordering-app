import logo from "../assets/logo.png";

function Logo({ size }) {
  return (
    <div className={`logo mx-auto flex h-auto items-center justify-center`}>
      <img
        src={logo}
        alt="REACT PIZZA APP"
        style={{ maxWidth: `${size}rem` }}
      ></img>
    </div>
  );
}

export default Logo;
