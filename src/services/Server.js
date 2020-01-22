import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('/auth/signup', credentials)
  },
  login (credentials) {
    return Api().post('/auth/signin', credentials)
  },
  newAccount(credentials) {
    return Api().post('/accounts', credentials)
  },
  getUserAccounts(token) {
    return Api().get(`/accounts/${sessionStorage.getItem('id')}/all`, token)
  },
  getStaffs(config) {
    return Api().get('/auth/allstaff', config)
  },
  createStaff (credentials) {
    return Api().post('/auth/createStaff', credentials)
  },
}
