export default function LogoutButton () {
	return (
		<form action="/auth/sign-out" method="post">
			<button className="rounded-md bg-gray-400 px-4 py-2 no-underline hover:bg-blue-400 dark:bg-gray-200 ">
				Logout
			</button>
		</form>
	);
}
