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
					10: "#dc2626",
					9: "#db6534",
					8: "#da9f42",
					7: "#e0d150",
					6: "#f2e65b",
					5: "#fbe96a",
					4: "#f9ee7c",
					3: "#e7f186",
					2: "#a6ea90",
					1: "#6bed86"
				}
			},
		},
	},
	plugins: [ require( "tailwindcss-animated" ) ],
};
