import "primevue/resources/themes/lara-light-indigo/theme.css";
import App from "@/view/App.vue";
import {createApp} from 'vue'
import PrimeVue from 'primevue/config';
import router from './router'

const app = createApp(App)
app.use(router)
app.use(PrimeVue)

app.mount('#app')
