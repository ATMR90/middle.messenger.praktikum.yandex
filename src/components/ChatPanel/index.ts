import Block from '../../utils/Block';
import store from '../../utils/Store';
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
	onClick?: (chatID:any) => void 
  events?: {
    click: (param:any) => void
  };
	id?: number;
}

export class ChatPanel extends Block {
  constructor(props: ChatPanelProps) {
    super({...props,
		events: {
			click: () => {
				this.props.onClick(this.props.id)
			}
		}});
  }

  render() {
    return this.compile(template, {
      label: this.props.label, styles, img: this.props.img, title: this.props.title, text: this.props.text, time: this.props.time, newMessage: this.props.newMessage,
    });
  }
}
