import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";

import MenuItem from "./MenuItem.jsx";

function Menu() {
  const menu = useLoaderData();

  return (
    <>
      <h1 className="my-5 text-center text-3xl font-bold text-sky-500 uppercase">
        Menu
      </h1>

      <ul className="divide-y divide-amber-50 px-2">
        {menu.map((pizzaObj, index) => (
          <MenuItem pizza={pizzaObj} key={pizzaObj.id} index={index} />
        ))}
      </ul>
    </>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
