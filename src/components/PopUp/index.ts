import Block from '../../utils/Block';
import template from './popUp.pug';
import * as styles from './popUp.scss';

interface PopUpProps {
  label: string;
  events?: {
    click: () => void;
  };
  classes?: string;
  src?: string;
  alt?: string;
  subTitle?: string;
  fields?: Block | Block[];
  footer?: Block | Block[];
  btn?: Block | Block[];
}

export class PopUp extends Block {
  constructor(props: PopUpProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
