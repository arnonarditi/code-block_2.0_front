import { codeService } from "../services/code.service"
import { showErrorMsg } from "../services/eventBus.service"

export const codeStore = {
    state: {
        codes: null,
    },
    getters: {
        getCodes({ codes }) {
            return codes
        }
    },
    mutations: {
        setCodes(state, { codes }) {
            state.codes = codes
        },
        updateCode(state, { code }) {
            const idx = state.codes.findIndex(c => c._id === code._id)
            state.codes.splice(idx, 1, code)
        }
    },
    actions: {
        async loadCodes({ commit }) {
            try {
                const codes = await codeService.query()
                commit({ type: 'setCodes', codes })
            } catch (err) {
                showErrorMsg(`Something went wrong, please try again! ${err}`)
            }
        },
        // NOTE try to Opitimize http req 25/1-->12:32 pm
        async updateCode({ commit }, { payload }) {
        // async updateCode({ commit }, { code }) {
            try {
                // const updatedCode = await codeService.updateCode(code) M
                // NOTE try to Opitimize http req 25/1-->12:32 pm
                const updatedCode = await codeService.updateCode(payload)
                commit({ type: 'updateCode', code: updatedCode })
            } catch (err) {
                showErrorMsg('Fail to update the code, please try again!')
                await dispatch({ type: err.message })
            }
        }
    }
}