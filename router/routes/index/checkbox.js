import { Route } from "@slyte/router";
import { CheckboxComp } from "../../../components/javascript/checkbox-comp";

class Checkbox extends Route {
	render() {
		return { outlet: "#page-outlet", component: CheckboxComp }
	}

	static actions() {
		return {};
	}
}

export { Checkbox };
