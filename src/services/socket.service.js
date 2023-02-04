import io from 'socket.io-client'

export const SOCKET_EMIT_SET_TOPIC = 'code-set-topic'
export const SOCKET_EMIT_REMOVE_TOPIC = 'remove-topic'
export const SOCKET_EVENT_LOAD_CODE = 'load-code'
export const SOCKET_EMIT_LOAD_CODE = 'load-code'
export const SOCKET_EMIT_CHECK_MENTOR= 'check-is-mentor'
export const SOCKET_EVENT_CHECK_MENTOR= 'check-is-mentor'
export const SOCKET_EVENT_CHECK_LAST= 'check-is-last'
export const SOCKET_EVENT_SET_SOCKETID= 'set-socketId'


export const SOCKET_EMIT_SUCCESS_MSG= 'success-msg'
export const SOCKET_EVENT_SUCCESS_MSG= 'success-msg'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

// for debugging from console
window.socketService = socketService
socketService.setup()

function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      if(!data) {
        socket.emit(eventName)
        return
      }
      data = JSON.parse(JSON.stringify(data))
      socket.emit(eventName, data)
    },
   
  }
  return socketService
}


