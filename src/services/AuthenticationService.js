import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('/auth/signup', credentials)
  },
  google () {
    return Api().get('/auth/google')
  }
}
