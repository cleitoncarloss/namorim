import { render, define } from '@directive';
import component from './component';
import style from './style';

@define('nm-sign-in')
@render(component, style)
class SignIn extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
}

export default SignIn;
