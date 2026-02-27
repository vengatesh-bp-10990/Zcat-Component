import { Route } from "@slyte/router";
import { DropdownComp } from "../../../components/javascript/dropdown-comp";

class Dropdown extends Route {
	render() {
		return { outlet: "#page-outlet", component: DropdownComp }
	}

	static actions() {
		return {};
	}
}

export { Dropdown };
