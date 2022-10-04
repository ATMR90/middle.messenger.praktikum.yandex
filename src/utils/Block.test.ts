import { expect } from 'chai';
import Block from './Block';

describe('Block', () => {
  let isComponentDidMount = false;
  let isComponentRender = false;
  let isComponentRenderAfterUpdateProps = false;

  interface IComponent {
    classes? : string
  }

  class Component extends Block {
    constructor(props?: IComponent) {
      super({
        classes: props?.classes ?? 'button',
      });
    }

		init(): void {
			this.dispatchComponentDidMount();
		}

    componentDidMount() {
      isComponentDidMount = true;
    }

    render() {
      isComponentRender = true;
      if (this.props.classes === 'updated-button') {
        isComponentRenderAfterUpdateProps = true;
      }
      const html = '<button class="button">Нажми меня!</button>';

      const temp = document.createElement('template');
  
      temp.innerHTML = html;
      return temp.content;
    }
  }

  const component = new Component();

  it('Create instance of Block with default props', () => {
    const componentWithDefaultProps = new Component();
    expect(componentWithDefaultProps.props.classes).to.eq('button');
  });

  it('Create instance of Block with custom props', () => {
    const componentWithCustomProps = new Component({
      classes: 'custom-button',
    });
    expect(componentWithCustomProps.props.classes).to.eq('custom-button');
  });

  it('Component did mount', () => {
    expect(isComponentDidMount).to.eq(true);
  });

  it('Component did render', () => {
    expect(isComponentRender).to.eq(true);
  });

  it('Set class from template element', () => {
    expect(component.getContent()?.className).to.eq('button');
  });

  it('Set content', () => {
    expect(component.getContent()?.textContent).to.eq('Нажми меня!');
  });

  it('Update prop', () => {
    component.setProps({
      classes: 'updated-button',
    });
    expect(component.props.classes).to.eq('updated-button');
  });

  it('Render after update props', () => {
    expect(isComponentRenderAfterUpdateProps).to.eq(true);
  });

  it('Set new prop', () => {
    component.setProps({
      text: 'new-text',
    });
    expect(component.props.text).to.eq('new-text');
  });
});
