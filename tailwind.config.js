/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ "./app/**/*.{js,ts,jsx,tsx,mdx}" ],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				btn: {
					background: "hsl(var(--btn-background))",
					"background-hover":
						"hsl(var(--btn-background-hover))",
				},
				gray: {
					100: "#f7fafc",
					200: "#edf2f7",
					300: "#e2e8f0",
					400: "#cbd5e0",
					500: "#a0aec0",
					600: "#718096",
					700: "#4a5568",
					800: "#2d3748",
					900: "#1a202c",
				},
				priority: {
					11: 'hsl(0, 90%, 42% )',
					10: 'hsl(10, 100%, 45% )',
					9: 'hsl(20, 95%, 44% )',
					8: 'hsl(30, 90%, 43% )',
					7: 'hsl(40, 90%, 42% )',
					6: 'hsl(48, 90%, 41% )',
					5: 'hsl(56, 90%, 40% )',
					4: 'hsl(64, 90%, 40% )',
					3: 'hsl(72, 90%, 40% )',
					2: 'hsl(90, 90%, 40% )',
					1: 'hsl(110,90%, 40% )'
				},
				error: "#f43f5e",
				warning: "#f59e0b",
				success: {
					light: "#6ee7b7",
					dark: "#10b981"
				},
				action: {
					dark: "#3b82f6",
					light: "#7dd3fc"
				},
			},
		},
	},
	plugins: [ require( "tailwindcss-animated" ) ],
};
