import { Route } from "@slyte/router";
import { ToggleComp } from "../../../components/javascript/toggle-comp";

class Toggle extends Route {
	render() {
		return { outlet: "#page-outlet", component: ToggleComp }
	}

	static actions() {
		return {};
	}
}

export { Toggle };
