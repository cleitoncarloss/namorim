import fallback from '@router/fallback'
import handle from '@router/handle'
import listeners from '@router/listeners'

function router(path, page) {
  listeners.push({ path, page })
  return router
}

Object.assign(router, {
  fallback,
  handle,
})

export default router
