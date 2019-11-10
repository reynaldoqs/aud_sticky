import sticky from './components/AudSticky.vue'

const install = (Vue) => {
    Vue.component('aud-sticky', sticky)
}/*
if(window.Vue){
    Vue.use(install)
}*/
sticky.install = install
export default sticky