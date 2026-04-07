import cookie from '@cookie'
import to from './to'

const http = new Proxy(
  {},
  {
    get(_, method) {
      return (url) => {
        const init = { method }

        Object.assign(init, {
          headers: new Headers({
            Authorization: cookie.getItem('access_token'),
          }),
        })

        return {
          blob() {
            return to(fetch(url, init).then((response) => response.blob()))
          },

          body(target) {
            Object.assign(init, {
              body: JSON.stringify(target),
            })
            return this
          },

          headers(target) {
            for (const [key, value] of new Headers(target).entries()) {
              init.headers.set(key, value)
            }
            return this
          },

          json() {
            init.headers.set('Content-Type', 'application/json')
            return to(fetch(url, init).then((response) => response.json()))
          },

          mode(target) {
            Object.assign(init, {
              mode: target,
            })
            return this
          },

          signal(target) {
            Object.assign(init, {
              signal: target,
            })
            return this
          },
        }
      }
    },
  },
)

export default http
