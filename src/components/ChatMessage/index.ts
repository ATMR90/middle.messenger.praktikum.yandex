import Block from '../../utils/Block';
import template from './chatMessage.pug';
import * as styles from './chatMessage.scss';

interface ChatMessageProps {
  label: string,
  classes?: string
  img?: string,
  title?: string,
  text?: string,
  time?: string,
  newMessage?: string;
	id?: number;
	content?: string;
	data?: any;
}

export class ChatMessage extends Block {
  constructor(props: ChatMessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      ...this.props, styles,
    });
  }
}
