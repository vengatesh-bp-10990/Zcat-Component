import { Route } from "@slyte/router";
import { TooltipComp } from "../../../components/javascript/tooltip-comp";

class Tooltip extends Route {
	render() {
		return { outlet: "#page-outlet", component: TooltipComp }
	}

	static actions() {
		return {};
	}
}

export { Tooltip };
