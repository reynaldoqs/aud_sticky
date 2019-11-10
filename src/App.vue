<template>
<div id="app">
    <header class="w-100"></header>
    <div class="w-100 flex h-screen">
        <nav class="gray-bg"></nav>
        <main class="h-100 aud-scroller" scroll-control>
            <div class="video-container w-100">
                <aud-sticky @onOpen="onOpen"  :targetPadding="[10,210]" :targetWidth="miniWidth" :targetHeight="miniHeight">
                    <div class="object">
                        amanda
                    </div>
                    <!--<video src="./assets/videos/edSheeran.mp4" :width="videoWidth" :height="videoHeight" controls>
                        <p>If you are reading this, it is because your browser does not support the HTML5 video element.</p>
                    </video>-->
                </aud-sticky>
            </div>
            <div class="spam">
            </div>
        </main>
    </div>
</div>
</template>

<script>
import AudSticky from './components/AudSticky'
export default {
    name: 'app',
    data(){
        return{
            videoWidth: 1200,
            videoHeight: 600,
            miniWidth: 320,
            miniHeight: 219
        }
    },
    methods:{
        onOpen(){
           /* this.videoWidth = this.miniWidth
            this.videoHeight = this.miniHeight*/
        }
    },
    components: {
        AudSticky
    }
}
</script>

<style>
.object{
    width: 600px;
    height: 400px;
    background-color: aquamarine;
}
video {
    object-fit: cover;
}
.spam {
    height: 1200px;
}

.element {
    width: 700px;
    height: 420px;
    background-color: aquamarine;
    margin: 0 auto;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100vw;
    height: 100vh;
    --h-header: 50px;
    --w-nav: 200px;
}

body {
    padding: 0;
    margin: 0;
}

*,
*::after,
*::before {
    box-sizing: border-box;
}

header {
    height: var(--h-header);
    border-bottom: 1px solid #d1d1d1;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

nav {
    width: 200px;
}

main {
    width: calc(100% - var(--w-nav));
    overflow-y: auto;
}

.gray-bg {
    background-color: #e4e4e7
}

.white-bg {
    background-color: #f1f1f1
}

.w-100 {
    width: 100%;
}

.h-100 {
    height: 100%;
}

.h-screen {
    height: calc(100% - var(--h-header));
}

.border-r {
    border-radius: 3px;
}

.flex {
    display: flex;
}

.video-container {
    background-color: #010101;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.aud-scroller {
    overflow-y: scroll;
    scrollbar-color: #414141 #e4e4e7;
    scrollbar-width: thin;
}

.aud-scroller::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.aud-scroller::-webkit-scrollbar-track-piece {
    background-color: #e4e4e7;
}

.aud-scroller::-webkit-scrollbar-thumb:vertical {
    height: 30px;
    background-color: #414141;
}
</style>
