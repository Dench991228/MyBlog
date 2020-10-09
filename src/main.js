import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import Antd from 'ant-design-vue'

import 'element-ui/lib/theme-chalk/index.css'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'
new Vue({
	el:"#app",
	render: h => h(App),
	router,
	template:'<App/>',
	components:{App}
})
