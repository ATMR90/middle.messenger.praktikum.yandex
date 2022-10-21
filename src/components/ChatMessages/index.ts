import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
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
  // console.log('obj',obj)
  if (obj && Object.keys(obj).length !== 0) {
    // console.log(obj)
    // const activId = store.getState().chat.chatId
    obj.forEach((data: any) => {
      // console.log(data)
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
    // let storeData = store.getState();
    // if (storeData.messages) {
    //   console.log('nen')
    //   this.children.mes = storeMessages(storeData.messages);
    // } else {
      if (this.props.messages) {
        this.children.mes = storeMessages(this.props.messages);
      // }
    }
  }

  componentDidUpdate() {
    // let storeData = store.getState();
    if (this.props.messages) {
    //   console.log('cdu',this.props.messages)
      this.children.mes = storeMessages(this.props.messages);
    // } else {
      // if (storeData.messages) {
      //   console.log('cduuu')
      //   this.children.mes = storeMessages(storeData.messages);
      // }
    }
    return true;
  }

  componentDidMount() {
    // if (this.props.messages) {
    //   this.children.mes = storeMessages(this.props.messages);
    // }
    // let storeData = store.getState();
    // if (storeData.messages) {
    //   this.children.mes = storeMessages(storeData.messages);
    // }
  }

  render() {
    // console.log(this.children.mes)
    return this.compile(template, {
      ...this.props, styles,
    });
  }
}

const withSelectedChatMessages = withStore(state => {
  const selectedChatId = state.chat?.chatId;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.chat.chatId,
    userId: state.user.id,
  };
});

export const ChatMessages = withSelectedChatMessages(ChatMessagesBase);


// const withUser = withStore((state) => ({ ...state.messages }));

// export const ChatMessages = withUser(ChatMessagesBase);
