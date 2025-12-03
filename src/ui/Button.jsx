import { Link } from "react-router-dom";

function Button({ children, disabled, to, type = "primary", onClick }) {
  const base =
    " disabled:bg-slate-500 text-sm inline-block rounded-full  font-semibold tracking-wide text-sky-50 uppercase transition-colors duration-300   focus:outline-none  disabled:cursor-not-allowed hover:scale-110 transform transition-transform duration-300 ";

  const styles = {
    primary:
      base +
      "sm:py-4  sm:px-6 px-4 py-3 bg-sky-500 hover:bg-sky-300 active:bg-sky-700 focus:ring focus:ring-sky-300 focus:ring-offset-1 ",
    small:
      base +
      "sm:px-3 sm:py-1 px-2 bg-sky-500 hover:bg-sky-300 active:bg-sky-700 focus:ring focus:ring-sky-300 focus:ring-offset-1",
    smallSecondary:
      base +
      "sm:px-3 sm:py-1 px-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-700 focus:ring focus:ring-orange-400 focus:ring-offset-1",
    secondary:
      "inline-block  text-sm rounded-full  font-semibold tracking-wide text-sky-50 uppercase transition-all duration-300  focus:ring focus:ring-sky-300 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed border-2 border-sky-500 sm:py-4  sm:px-6 px-4 py-3 hover:bg-sky-900 hover:scale-110 transform transition-transform duration-300 ",
    round:
      base +
      "px-2.5 py-1  text-sm bg-sky-500 hover:bg-sky-300 active:bg-sky-700 focus:ring focus:ring-sky-300 focus:ring-offset-1 rounded-full",
    goelocation:
      base +
      "md:px-6 md:py-3  px-5 py-2 bg-sky-500 hover:bg-sky-300 active:bg-sky-700 focus:ring focus:ring-sky-300 focus:ring-offset-1 ",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
