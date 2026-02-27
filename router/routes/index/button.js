import { Route } from "@slyte/router";
import { ButtonComp } from "../../../components/javascript/button-comp";

class Button extends Route {
	render() {
		return { outlet: "#page-outlet", component: ButtonComp }
	}

	static actions() {
		return {};
	}
}

export { Button };
