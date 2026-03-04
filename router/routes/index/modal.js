import { Route } from "@slyte/router";
import { ModalComp } from "../../../components/javascript/modal-comp";

class Modal extends Route {
	render() {
		return { outlet: "#page-outlet", component: ModalComp }
	}

	static actions() {
		return {};
	}
}

export { Modal };
