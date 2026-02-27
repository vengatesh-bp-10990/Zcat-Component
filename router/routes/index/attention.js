import { Route } from "@slyte/router";
import { AttentionComp } from "../../../components/javascript/attention-comp";

class Attention extends Route {
  render() {
    return { outlet: "#page-outlet", component: AttentionComp }
  }

  static actions() {
    return {};
  }
}

export { Attention };
