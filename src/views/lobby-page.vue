
<template>
    <section class="lobby-page fully flex column align-center">
        <header>
            <h2>Choose code block:</h2>
        </header>

        <section v-if="codes" class="code-list card-grid">
            <!-- code preview -->
            <article v-for="code in codes" @click="onNavToCodeBlock(code._id)" :key="code._id"
                class="code-preview flex column space-between">
                <div class="info">
                    <h3>{{ code.title }}</h3>
                    <span>{{ code.difficulty }}</span>
                </div>

                <div class="preview-modal">
                    <h3>Let's try!</h3>
                </div>
            </article>
        </section>
        
        <section v-else class="loader-container">
            <div class="loader">
                <div class="inner one"></div>
                <div class="inner two"></div>
                <div class="inner three"></div>
            </div>
        </section>
    </section>
</template>

<script>

export default {
    data() {
        return {
            codes: null
        }
    },
    async created() {
        await this.$store.dispatch({ type: 'loadCodes' })
        this.codes = this.$store.getters.getCodes
    },
    methods: {
        onNavToCodeBlock(codeId) {
            this.$router.push(`/code/${codeId}`)
        }
    }
}
</script>

