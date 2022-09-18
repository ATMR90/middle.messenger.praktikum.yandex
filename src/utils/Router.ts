import Block from "./Block";
import Route from "./Route";

class Router {
  public routes: Route[];
  public history: History;
  private _currentRoute: Route | null;
  private _rootQuery: string;
  static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);
    // console.log('use',route)
    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
			const target = event.currentTarget as Window
      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
			this.go('/404')
      // console.log('!route',pathname, route)
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      // console.log('leave',route)
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    // console.log('up-render',route)
    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    // console.log('router.go',pathname)
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    // console.log('getRoute',pathname, this.routes.find(route => route.match(pathname)))
    return this.routes.find(route => route.match(pathname));
  }
}

export default Router; 