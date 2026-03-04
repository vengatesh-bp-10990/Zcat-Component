import { Route } from "@slyte/router";
import { DoublefieldComp } from "../../../components/javascript/doublefield-comp";

class Doublefield extends Route {
	render() {
		return { outlet: "#page-outlet", component: DoublefieldComp }
	}

	static actions() {
		return {};
	}
}

export { Doublefield };
