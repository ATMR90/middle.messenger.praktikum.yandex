import { set } from './helpers';
import { EventBus } from './EventBus';
import Block from './Block';
import isEqual from './isEqual';

export enum StoreEvents {
  Updated = 'updated'
}

// export interface State {
// 	user: {

// 	},
// 	chats: {}[]
// }

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: any) => any) {

  return function wrap(Component: typeof Block){
    let previousState: any;


    return class WithStore extends Component {

      constructor(props: any) {
        previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

					if (isEqual(previousState, stateProps)) {
						// console.log('isEqual', stateProps)
						return;
					}
					
          previousState = stateProps;
					// console.log('not isEqual', stateProps)

          this.setProps({ ...stateProps });
        });
      }
    }

  }

}

export default store;