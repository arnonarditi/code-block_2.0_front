<template>
    <section v-if="code" class="code-block fully flex column align-center">
        <h2>{{ code.title }}</h2>
        <textarea @input="onUpdateCode" :disabled="isMentor" ref="code" v-model="code.code">  </textarea>

        <div class="sub-wrapper">
            <highlightjs language="js" :code="code.code" />

            <div class="flex center actions-wrapper">
                <button @click="onGoBack">Go back</button>
            </div>

            <div class=" solution flex column ">
                <span>Solution:</span>
                <p> {{ code.solution }}</p>
            </div>
        </div>

        <img v-if="isCorrect" src="../assets/imgs/istockphoto-157030584-612x612.jpg" alt="">
    </section>
</template>

<script>
import { codeService } from '../services/code.service'
import {
    socketService,
    SOCKET_EVENT_LOAD_CODE, SOCKET_EMIT_SET_TOPIC,
    SOCKET_EMIT_CHECK_MENTOR, SOCKET_EVENT_CHECK_MENTOR,
    SOCKET_EMIT_SUCCESS_MSG, SOCKET_EVENT_SUCCESS_MSG,
    SOCKET_EVENT_CHECK_LAST,SOCKET_EVENT_SET_SOCKETID
} from '../services/socket.service'
import { showInfoMsg } from '../services/eventBus.service'

import 'vue-highlight-code/dist/style.css';
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";

export default {
    data() {
        return {
            code: null,
            isMentor: false,
            isCorrect: false,
            // NOTE try to Opitimize http req 25/1-->12:32 pm
            socketId: null
        }
    },
    async created() {
        this.code = await codeService.getById(this.$route.params.id)
        // when refresh at the block code page
        if (!this.$store.getters.getCodes) await this.$store.dispatch({ type: 'loadCodes' })

        socketService.emit(SOCKET_EMIT_SET_TOPIC, this.$route.params.id)
        socketService.emit(SOCKET_EMIT_CHECK_MENTOR)

        // NOTE try to Opitimize http req 25/1-->12:32 pm
        socketService.on(SOCKET_EVENT_SET_SOCKETID, this.setSocketId)
        socketService.on(SOCKET_EVENT_LOAD_CODE, this.loadCurrCodeBySocket)
        socketService.on(SOCKET_EVENT_CHECK_MENTOR, this.handleIsMentor)
        socketService.on(SOCKET_EVENT_SUCCESS_MSG, this.showSuccessMsg)
    },
    unmounted() {
        // conditionally zeroing the code content for reusing the app properly
        socketService.emit(SOCKET_EVENT_CHECK_LAST, this.code)
    },
    methods: {
        setSocketId(socketId) {
            this.socketId = socketId
        },
        async onUpdateCode() {
            this.code.code = this.$refs.code.value
            // await this.$store.dispatch({ type: 'updateCode',code: this.code })
            // NOTE try to Opitimize http req 25/1-->12:32 pm
            const payload = { socketId: this.socketId, code: this.code }
            await this.$store.dispatch({ type: 'updateCode', payload })

            const compressedCode = this.compressCode(this.$refs.code.value)
            const compressedSolution = this.compressCode(this.code.solution)

            if (compressedCode === compressedSolution) {
                socketService.emit(SOCKET_EMIT_SUCCESS_MSG)
            }
        },
        onGoBack() {
            this.$router.push('/')
        },
        async loadCurrCodeBySocket(codeId) {
            this.code = await codeService.getById(codeId)
        },
        handleIsMentor(value) {
            this.isMentor = value
            const txt = this.isMentor ? `Hi Mentor, Mode: Readonly` : 'Hi User, Mode: Edit'
            showInfoMsg(txt)
        },
        showSuccessMsg() {
            this.isCorrect = true
            setTimeout(() => this.isCorrect = false, 1500)
        },
        compressCode(str) {
            str = str.split(' ').join('')
            var position = 0
            const searchStr = '\n'

            while (str.indexOf(searchStr, position) !== -1) {
                position = str.indexOf(searchStr)
                str = str.slice(0, position) + str.slice(position + 1)
            }
            return str
        }
    },
    components: {
        highlightjs: hljsVuePlugin.component
    }
}
</script>

