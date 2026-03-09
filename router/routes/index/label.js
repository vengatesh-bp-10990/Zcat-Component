import { Route } from "@slyte/router";
import { LabelComp } from "../../../components/javascript/label-comp";

class Label extends Route {
	render() {
		return { outlet: "#page-outlet", component: LabelComp }
	}

	static actions() {
		return {};
	}
}

export { Label };
