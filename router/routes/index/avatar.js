import { Route } from "@slyte/router";
import { AvatarComp } from "../../../components/javascript/avatar-comp";

class Avatar extends Route {
	render() {
		return { outlet: "#page-outlet", component: AvatarComp }
	}

	static actions() {
		return {};
	}
}

export { Avatar };
