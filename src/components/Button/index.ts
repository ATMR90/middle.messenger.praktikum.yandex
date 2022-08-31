import Block from "../../utils/Block";
import template from './button.pug'
import * as styles from './button.scss'

interface ButtonProps {
	label: string,
	events?: {
		click: () => void
	},
	classes?: string,
	url?: string
}

export class Button extends Block {
	constructor(props: ButtonProps) {
		super('div', props);
	}

	render() {
		return this.compile(template, {label: this.props.label, styles, url: this.props.url || '#'})
	}
}