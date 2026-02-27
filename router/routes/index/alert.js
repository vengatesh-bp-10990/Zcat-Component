import { Route } from "@slyte/router";
import { AlertComp } from "../../../components/javascript/alert-comp";

class Alert extends Route {
  render() {
    return { outlet: "#page-outlet", component: AlertComp }
  }

  static actions() {
    return {};
  }
}

export { Alert };
