import { Route } from "@slyte/router";
import { LinkboxComp } from "../../../components/javascript/linkbox-comp";

class Linkbox extends Route {
	render() {
		return { outlet: "#page-outlet", component: LinkboxComp }
	}

	static actions() {
		return {};
	}
}

export { Linkbox };
