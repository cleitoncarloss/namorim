import { attributeChanged, connected, define } from '@directive'
import Echo from '@echo'
import { customEvent } from '@event'
import http from '@http'
import { after, before } from '@middleware'
import { Headless } from '@mixin'
import Siphon, { pump } from '@siphon'
import { abort, autorun, dispatch } from './interfaces'
import interpolate from './interpolate'

@define('nm-fetch')
class Fetch extends Echo(Headless(Siphon(HTMLElement))) {
  #controller
  #url

  get url() {
    return (this.#url ??= '')
  }

  @attributeChanged('url')
  set url(value) {
    this.#url = value
  }

  [abort](payload) {
    this.#controller?.abort()
    this.#controller = new AbortController()
    return payload
  }

  @connected
  [autorun]() {
    this.hasAttribute('autorun') && this.get()
    return this
  }

  @before(abort)
  @after(dispatch)
  delete(payload) {
    return http
      .delete(interpolate(this.url, payload))
      .signal(this.#controller.signal)
      .json()
  }

  async [dispatch](response) {
    const { data, error } = await response
    error
      ? this.dispatchEvent(customEvent('errored', error))
      : this.dispatchEvent(customEvent('succeeded', data))
    return data
  }

  @pump
  @before(abort)
  @after(dispatch)
  get(payload) {
    return http
      .get(interpolate(this.url, payload))
      .signal(this.#controller.signal)
      .json()
  }

  @before(abort)
  @after(dispatch)
  post(payload) {
    return http
      .post(interpolate(this.url, payload))
      .body(payload)
      .signal(this.#controller.signal)
      .json()
  }

  @before(abort)
  @after(dispatch)
  put(payload) {
    return http
      .put(interpolate(this.url, payload))
      .body(payload)
      .signal(this.#controller.signal)
      .json()
  }
}

export default Fetch
