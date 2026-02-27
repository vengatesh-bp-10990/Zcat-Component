import { Route } from "@slyte/router";
import { IconComp } from "../../../components/javascript/icon-comp";

class Icon extends Route {
  render() {
    return { outlet: "#page-outlet", component: IconComp }
  }

  static actions() {
    return {};
  }
}

export { Icon };
