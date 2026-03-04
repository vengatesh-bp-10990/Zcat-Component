import { Route } from "@slyte/router";
import { PopoverComp } from "../../../components/javascript/popover-comp";

class Popover extends Route {
	render() {
		return { outlet: "#page-outlet", component: PopoverComp }
	}

	static actions() {
		return {};
	}
}

export { Popover };
