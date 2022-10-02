import Block from '../../utils/Block';
import template from './chatPanel.pug';
import * as styles from './chatPanel.scss';

interface ChatPanelProps {
  label: string,
  classes?: string
  img?: string,
  title?: string,
  text?: string,
  time?: string,
  newMessage?: string;
  onClick?: (chatID:number) => void 
  events?: {
    click: () => void
  };
  id?: number;
}

export class ChatPanel extends Block {
  constructor(props: ChatPanelProps) {
    super({ ...props,
    events: {
      click: () => {
        this.props.onClick(this.props.id);
      },
    } });
  }

  render() {
    return this.compile(template, {
      ...this.props, styles,
    });
  }
}
