import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "MatchRoom",
				short_name: "MatchRoom",
				theme_color: "#BAA089",
				icons: [
					{
						src: "/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		port: 3000,
	},
	define: {
		"window.config.FRONTEND_URL": JSON.stringify("http://localhost:3000"),
		"window.config.BACKEND_URL": JSON.stringify("http://localhost:3001"),
		// "window.config.FRONTEND_URL": JSON.stringify("https://matchrooms.vercel.app"),
		// "window.config.BACKEND_URL": JSON.stringify("https://matchroom.omnimat.ci"),
	},
});
