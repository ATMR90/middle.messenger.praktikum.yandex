import Block from "../../utils/Block";
import template from './infoField.pug'
import * as styles from './infoField.scss'

interface InfoFieldProps {
	label: string,
	idInput?: string,
	type?: string,
	events?: {
		click: () => void
	},
	classes?: string
	name?: string | Block
	value?: string
	fieldName?: Block
	fieldValue?: Block
}

export class InfoField extends Block {
	constructor(props: InfoFieldProps) {
		super('div', props);
		this.element!.classList.add('info-field')
	}

	render() {
		return this.compile(template, {label: this.props.label, styles, idInput: this.props.idInput, type: this.props.type, name: this.props.name, value: this.props.value})
	}
}