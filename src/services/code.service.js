import { httpService } from './http.service.js'
import { socketService, SOCKET_EMIT_LOAD_CODE } from './socket.service.js'

export const codeService = {
    query,
    getById,
    updateCode
}

async function query() {
    try {
        const codes = await httpService.get('code')
        return codes
    } catch (err) {
        throw err
    }
}

async function getById(codeId) {
    try {
        const code = await httpService.get(`code/${codeId}`)
        return code
    } catch (err) {
        throw err
    }
}

// async function updateCode(code) {
//     try {
//         const newCode = await httpService.put(`code/${code._id}`, code)
//         socketService.emit(SOCKET_EMIT_LOAD_CODE, code._id)
//         return newCode
//     } catch (err) {
//         throw new Error('loadCodes')
//     }
// }
// NOTE try to Opitimize http req 25/1-->12:32 pm
async function updateCode(payload) {
    try {
        const newCode = await httpService.put(`code/${payload.code._id}`, payload)
        return newCode
    } catch (err) {
        throw new Error('loadCodes')
    }
}