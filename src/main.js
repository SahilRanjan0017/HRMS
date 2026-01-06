import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { initSocket } from "./socket"

// Local replacements for frappe-ui
import {
	setConfig,
	request,
	resourcesPlugin,
} from "@/utils/api"

import Button from "@/components/ui/Button.vue"
import Input from "@/components/ui/Input.vue"
import FeatherIcon from "@/components/ui/FeatherIcon.vue"
import EmptyState from "@/components/EmptyState.vue"

import { translationsPlugin } from "./plugins/translationsPlugin.js"

import { IonicVue } from "@ionic/vue"

import { session } from "@/data/session"
import { userResource } from "@/data/user"
import { employeeResource } from "@/data/employee"

import dayjs from "@/utils/dayjs"
import getIonicConfig from "@/utils/ionicConfig"

// Removed FrappePushNotification import

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css"

/* Theme variables */
import "./theme/variables.css"

import "./main.css"

import { auth } from "@/utils/auth"

await auth.initialize("MEG-EMP-001") // Mocked for initial load

const app = createApp(App)
const socket = initSocket()

setConfig("resourceFetcher", request)
app.use(resourcesPlugin)
app.use(translationsPlugin)

// Register global components
app.component("Button", Button)
app.component("Input", Input)
app.component("FeatherIcon", FeatherIcon)
app.component("EmptyState", EmptyState)

app.use(router)
app.use(IonicVue, getIonicConfig())

app.provide("$auth", auth)
app.provide("$session", session)
app.provide("$user", userResource)
app.provide("$employee", employeeResource)
app.provide("$socket", socket)
app.provide("$dayjs", dayjs)

// Resolve mount issues by being explicit
const mountApp = () => {
	console.log("[Main] Mounting App...")
	app.mount("#app")
}

translationsPlugin.isReady().then(() => {
	router.isReady().then(mountApp).catch(e => {
		console.error("[Main] Router failed to ready, mounting anyway", e)
		mountApp()
	})
})

router.beforeEach(async (to, _, next) => {
	// Bypass authentication for demonstration purposes
	next()
})
