import Block from "../../utils/Block";
import template from './modal.pug';
import * as styles from './modal.scss';

interface ModalProps {
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
}

export class Modal extends Block {
  constructor(props: ModalProps) {
    super(props);
  }



  render() {
    return this.compile(template, { ...this.props, styles });
  }
}