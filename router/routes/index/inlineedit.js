import { Route } from "@slyte/router";
import { InlineeditComp } from "../../../components/javascript/inlineedit-comp";

class Inlineedit extends Route {
	render() {
		return { outlet: "#page-outlet", component: InlineeditComp }
	}

	static actions() {
		return {};
	}
}

export { Inlineedit };
