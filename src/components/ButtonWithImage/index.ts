import Block from '../../utils/Block';
import template from './buttonWithImage.pug';
import * as styles from './buttonWithImage.scss';

interface ButtonWithImageProps {
  label: string,
  events?: {
    click: () => void
  },
  classes?: string,
  url?: string,
  src?: string,
  alt?: string
}

export default class ButtonWithImage extends Block {
  constructor(props: ButtonWithImageProps) {
    const defaultValue = {
      url: '',
      src: '',
      alt: '',
    };
    super({ ...defaultValue, ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
