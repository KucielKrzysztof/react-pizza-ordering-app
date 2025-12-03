import { useSelector } from "react-redux";
import CreateUser from "../Features/user/CreateUser.jsx";
import Button from "./Button.jsx";
import Logo from "./Logo.jsx";

function Home() {
  const username = useSelector((store) => store.user.username);
  return (
    <div className="my-10 px-4 text-center">
      <Logo size={20} />
      <h1 className="mb-8 text-center text-xl font-semibold text-zinc-300 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-sky-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username && <CreateUser />}
      {username && (
        <div className="flex flex-col gap-3">
          <div className="text-xl font-semibold text-sky-100">
            Welcome back, <span className="text-sky-500">{username}</span>
          </div>
          <div>
            <Button to="/menu" type="primary">
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
