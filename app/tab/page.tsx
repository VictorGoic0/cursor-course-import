// let's create a new page that talks about cursor's tab features
"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TabPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	// the button should have cursor on hover
	// the button should have cursor on hover
	const handleClick = () => {
		setIsLoading(true);
		router.push("/");
		setIsLoading(false);
	}

	return <div className="flex flex-col items-center justify-center h-screen">
		<h1>Cursor Tab Features</h1>
		<p className="text-center">Cursor is a powerful tool for developers. It has a lot of features that make it easy to use. One of the most useful features is the tab feature. The tab feature allows you to organize your code into tabs. This is a great way to organize your code and make it easier to read.</p>
		<div className="flex flex-col items-center justify-center mt-4">
			<h2>How to use the tab feature</h2>
			<p>To use the tab feature, you need to create a new tab. You can do this by clicking the <span className="font-bold">New Tab</span> button in the top right corner of the editor. You can also use the keyboard shortcut <span className="font-bold">Ctrl+T</span> to create a new tab.</p>
		</div>
		<button className="bg-blue-500 text-white p-2 rounded-md cursor-pointer" onClick={handleClick}>{isLoading ? "Loading..." : "Get Started"}</button>
	</div>
}