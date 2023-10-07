export default function LogoutButton () {
	return (
		<form action="/auth/sign-out" method="post">
			<button className="py-2 px-4 rounded-md no-underline bg-gray-400 dark:bg-gray-200 hover:bg-blue-400 ">
            Logout
			</button>
		</form> 
	);
}
