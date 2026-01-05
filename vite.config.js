import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { VitePWA } from "vite-plugin-pwa"

import path from "path"

export default defineConfig({
	server: {
		port: 8080,
	},
	plugins: [
		vue(),
		VitePWA({
			registerType: "autoUpdate",
			strategies: "injectManifest",
			injectRegister: null,
			devOptions: {
				enabled: true,
			},
			manifest: {
				display: "standalone",
				name: "Megha HR",
				short_name: "Megha HR",
				start_url: "/",
				description: "Everyday HR & Payroll operations at your fingertips",
				theme_color: "#ffffff",
				icons: [
					{
						src: "/favicon.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/favicon.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	build: {
		outDir: "dist",
		emptyOutDir: true,
		target: "es2015",
		commonjsOptions: {
			include: [/tailwind.config.js/, /node_modules/],
		},
		sourcemap: true,
	},
})
