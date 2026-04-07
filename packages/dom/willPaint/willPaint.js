import execute from '@dom/execute'
import { willPaintCallback } from '@dom/interfaces'

const willPaint = (target, method) =>
  execute(method).on(target).after(willPaintCallback)

export default willPaint
