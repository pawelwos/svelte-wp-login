import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
  // redirect user if logged in
  if (locals.user) {
    throw redirect(302, '/')
  }
}

const register = async ({ request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')
  if(password.length < 8)
  return { message: "Password too short. Min 8 characters long." }
  const response = await fetch(`http://127.0.0.1/api/register`,
		{
				method: 'POST',
				headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
				},
				body: JSON.stringify({'username': username, 'password': password})
		});
    const msg = await response.text()
    return { message: msg }
}

export const actions = { register }
