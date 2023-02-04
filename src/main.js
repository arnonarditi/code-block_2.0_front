import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'

import './assets/main.scss'
import rootCmp from './root-cmp.vue'
// highlight.js
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from "@highlightjs/vue-plugin";

// import VueHighlightJS from 'vue-highlightjs'

hljs.registerLanguage('javascript', javascript);

const app = createApp(rootCmp)
app.use(router)
app.use(store)
app.use(hljsVuePlugin)
// app.use(VueHighlightJS)

app.mount('#app')
