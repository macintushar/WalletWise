import { Link } from "react-router-dom";
import { RouteItem } from "../../constants/routes";

function NavButton(routeItem: RouteItem) {
  return (
    <Link to={routeItem.url}>
      <div className="h-11 w-full bg-zinc-800/30 flex px-3 py-2 items-center gap-2 rounded-lg">
        <routeItem.icon className="h-8" />
      </div>
    </Link>
  );
}

export default NavButton;
