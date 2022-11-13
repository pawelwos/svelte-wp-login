import { redirect } from '@sveltejs/kit'

export const load = async ({locals}) => {
  if (locals.user) {
    throw redirect(302, '/')
  }
}

const login = async ({ cookies, request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')
  const response = await fetch(`http://127.0.0.1/api/login`,
		{
				method: 'POST',
				headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
				},
				body: JSON.stringify({'username': username, 'password': password})
		});
    const user = await response.json()
    
    if(user.id)
    {
      cookies.set('session', JSON.stringify(user), {
        // send cookie for every page
        path: '/',
        // server side only cookie so you can't use `document.cookie`
        httpOnly: true,
        // only requests from same site can send cookies
        // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
        sameSite: 'strict',
        // only sent over HTTPS in production
        secure: process.env.NODE_ENV === 'production',
        // set cookie to expire after a month
        maxAge: 60 * 60 * 24 * 30,
      })
      // redirect the user
      throw redirect(302, '/members')
    } else {
      return { message: user.error }
    }
}

export const actions = { login }
