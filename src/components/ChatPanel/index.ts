import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
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
  isSelected: any;
  selectedChat: any;
}

class ChatPanelBase extends Block {
  constructor(props: ChatPanelProps) {
    super({ ...props,
    // events: {
      // click: () => {
        // console.log(this.props.id)
        // this.props.onClick(this.props.id);
      // },
    // } 
  });
  }

  render() {
    console.log('ren#', this.props.selectedChat);
    console.log('#', this.props.id);
    console.log(this.props.id === this.props.selectedChat?.id);
    debugger;
    return this.compile(template, {
      ...this.props, 
      isSelected: this.props.id === this.props.selectedChat?.id,
      styles,
    });
  }
}


const withSelectedChats = withStore((state) => ({ selectedChat: (state.chats || []).find((item:any) => {
  const { id } = item;
  // console.log(item)
  // console.log(id)
  // console.log(state.chatId)
  return id === state.chatId;
}) }));

export const ChatPanel = withSelectedChats(ChatPanelBase);