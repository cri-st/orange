import { redirect, type ActionFunctionArgs } from '@remix-run/cloudflare'
import { Form } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { ACCESS_AUTHENTICATED_USER_EMAIL_HEADER } from '~/utils/constants'
import { setUsername } from '~/utils/getUsername.server'

export const action = async ({ request }: ActionFunctionArgs) => {
	const url = new URL(request.url)
	const returnUrl = url.searchParams.get('return-url') ?? '/'
	const accessUsername = request.headers.get(
		ACCESS_AUTHENTICATED_USER_EMAIL_HEADER
	)
	if (accessUsername) throw redirect(returnUrl)
	const { username } = Object.fromEntries(await request.formData())
	invariant(typeof username === 'string')
	return setUsername(username, request, returnUrl)
}

export default function SetUsername() {
	return (
		<div className="grid h-full gap-4 place-content-center">
			<h1 className="text-3xl font-bold"><img src="https://freight.cargo.site/w/3210/i/ea71c6e0f2bb7f7642017b056153c527f0b751b812c25500c85bf222cb59fde2/2021_Logo_Master_White.png" alt="Mosaic Logo" width="150px" height="50px" /> 🇦🇷</h1>
			<Form className="flex items-end gap-4" method="post">
				<div className="grid gap-3">
					<label htmlFor="username">Enter your display name</label>
					<Input
						autoComplete="off"
						autoFocus
						required
						type="text"
						id="username"
						name="username"
					/>
				</div>
				<Button className="text-xs" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	)
}
