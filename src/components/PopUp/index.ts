import Block from "../../utils/Block";
import ButtonWithImage from "../ButtonWithImage";
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

	init() {
		// const btn = 
		// [
		// 	new ButtonWithImage({
		// 		label: 'Добавить пользователя',
		// 		src: './../../assets/img/pop_up_plus_.svg',
		// 		events: {
		// 			click: () => {
		// 				console.log(this)
		// 				this.hide()
		// 			}
		// 		},
		// 		classes: 'pop-up-item__container ya-pop-up__item pop-up-item',
		// 		classDiv: 'pop-up-item__text'
		// 	}),
		// 	new ButtonWithImage({
		// 		label: 'Удалить пользователя',
		// 		src: './../../assets/img/pop_up_delete_.svg',
		// 		events: {
		// 			click: () => {
		// 				console.log('clack')
		// 				this.hide()
		// 			}
		// 		},
		// 		classes: 'pop-up-item__container ya-pop-up__item pop-up-item',
		// 		classDiv: 'pop-up-item__text'
		// 	}),
		// ]
		// this.children.btn = btn
	}

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}