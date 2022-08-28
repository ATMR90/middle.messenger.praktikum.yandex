import Block from "../../utils/Block";
import template from './input.pug'
import * as styles from './input.scss'

interface InputProps {
	label: string,
	idInput?: string,
	type?: string,
	events?: {
		click: () => void
	},
	classes?: string
}

export class Input extends Block {
	constructor(props: InputProps) {
		super('div', props);
	}

	render() {
		return this.compile(template, {label: this.props.label, styles, idInput: this.props.idInput, type: this.props.type})
	}
}