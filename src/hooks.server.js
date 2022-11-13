import { redirect } from '@sveltejs/kit'

export const handle = async ({ event, resolve }) => {
  // get cookies from browser
  const session = event.cookies.get('session')

  if (!session) {
    // if there is no session load page as normal
    return await resolve(event)
  }

  const user = JSON.parse(session)

  // if `user` exists set `events.local`
  if (user.id) {
    event.locals.user = {
      ...user
    }
  }

  // load page as normal
  return await resolve(event)
}