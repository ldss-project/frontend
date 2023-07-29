import { createApp } from 'vue'
import App from './view/App.vue'
import PrimeVue from 'primevue/config';

import router from './router'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')
