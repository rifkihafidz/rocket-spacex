// Plugins
import vuetify from './vuetify'
import router from '../router'
import { createPinia } from 'pinia'

// Types
import type { App } from 'vue'

const pinia = createPinia()
export function registerPlugins(app: App) {
  app
    .use(pinia)
    .use(vuetify)
    .use(router)
}
