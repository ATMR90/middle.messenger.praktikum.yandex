import { router } from "..";
import Block from "../utils/Block";

export function withRouter(Component: typeof Block) {
  type Props = typeof Component extends typeof Block ? any : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: router });
    }
  }
}

export interface PropsWithRouter {
  router: typeof router;
}