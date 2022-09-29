import Block from '../../utils/Block';
import store, { withStore } from '../../utils/Store';
import formatDate from '../../utils/formatDate';

import template from './chatMessages.pug';
import * as styles from './chatMessages.scss';

import { ChatMessage } from '../../components/ChatMessage';

interface ChatMessagesProps {
  label: string,
  classes?: string
  img?: string,
  title?: string,
  text?: string,
  time?: string,
  newMessage?: string;
  id?: number;
}

function storeMessages(obj: any) {
  let mes: any[] = [];
  if (obj.messages && Object.keys(obj.messages).length !== 0) {
    obj.messages.forEach((data: any) => {
      let mesList = new ChatMessage({
        label: '',
        content: `${data.content}`,
        data: formatDate(data.time),
        classes: 'messages-chat__his-message',
        id: data.id,
      });
      mes.push(mesList);
    });
  }
  return mes;
}

export class ChatMessagesBase extends Block {
  constructor(props: ChatMessagesProps) {
    super(props);
  }

  init(): void {
    let storeData = store.getState();
    if (storeData.messages) {
      this.children.mes = storeMessages(storeData.messages);
    } else {
      if (this.props.messages) {
        this.children.mes = storeMessages(this.props);
      }
    }
  }

  componentDidUpdate() {
    let storeData = store.getState();
    if (this.props.messages) {
      this.children.mes = storeMessages(this.props);
    } else {
      if (storeData.messages) {
        this.children.mes = storeMessages(storeData.messages);
      }
    }
    return true;
  }

  componentDidMount() {
    let storeData = store.getState();
    if (storeData.messages) {
      this.children.mes = storeMessages(storeData.messages);
    }
  }

  render() {
    return this.compile(template, {
      ...this.props, styles,
    });
  }
}

const withUser = withStore((state) => ({ ...state.messages }));

export const ChatMessages = withUser(ChatMessagesBase);
