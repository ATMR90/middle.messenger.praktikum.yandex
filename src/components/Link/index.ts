import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import Block from '../../utils/Block';
import template from './link.pug';
import * as styles from './link.scss';

interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  events?: {
    click: () => void;
  };
	classes?: string;
	src?: string;
	alt?: string;
}

class BaseLink extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Link = withRouter(BaseLink);
