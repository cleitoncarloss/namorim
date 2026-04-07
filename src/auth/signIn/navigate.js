import { urlFor } from '@router'

class Navigate {
  static goToSignIn() {
    history.pushState({}, '', urlFor('signIn'))
  }
}

export default Navigate
