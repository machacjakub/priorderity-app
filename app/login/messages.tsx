"use client";

import { useSearchParams } from "next/navigation";
import { CheckOutlined, XOutlined } from "@/icons";

export default function Messages () {
	const searchParams = useSearchParams();
	const error = searchParams.get( "error" );
	const message = searchParams.get( "message" );
	return (
		<>
			{error && (
				<p className="flex justify-center mt-4 bg-error/20 p-4 text-center text-foreground rounded-xl">
					<XOutlined className='w-6 h-6 my-auto p-1 text-error mr-2 rounded-full border-2 border-error' strokeWidth={4}/>{error}
				</p>
			)}
			{message && (
				<p className="flex justify-center mt-4 bg-success-dark/20 p-4 text-center text-foreground rounded-xl">
					<CheckOutlined className='w-6 p-1 text-success-dark mr-2 rounded-full border-2 border-success-dark' strokeWidth={4}/>{message}
				</p>
			)}
		</>
	);
}
