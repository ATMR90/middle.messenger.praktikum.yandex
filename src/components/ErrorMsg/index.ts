import Block from '../../utils/Block';
import template from './errorMsg.pug';
import * as styles from './errorMsg.scss';

interface ErrorMsgProps {
  errorMsg: string,
}

export class ErrorMsg extends Block {
  constructor(props: ErrorMsgProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      errorMsg: this.props.errorMsg,
      styles,
    });
  }
}
