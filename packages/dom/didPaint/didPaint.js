import execute from '@dom/execute'
import { didPaintCallback } from '@dom/interfaces'

const didPaint = (target, method) =>
  execute(method).on(target).after(didPaintCallback)

export default didPaint
