import args from '@router/args'
import matching from '@router/matching'
import params from '@router/params'

function handle() {
  const { page, path } = matching()
  args()
  params(path)
  if (page) page()
}

export default handle
