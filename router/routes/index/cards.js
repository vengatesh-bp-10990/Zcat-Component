import { Route } from "@slyte/router";
import { CardsComp } from "../../../components/javascript/cards-comp";

class Cards extends Route {
	render() {
		return { outlet: "#page-outlet", component: CardsComp }
	}

	static actions() {
		return {};
	}
}

export { Cards };
