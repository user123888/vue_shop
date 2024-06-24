import request from '@/utils/request'
// 账号密码登录
export const userLogin = (user, password) => {
  return request.get('/user', {
    params: {
      user: user,
      password: password
    }
  })
}
// 更改个人信息
export const userMsg = (id, obj) => {
  return request.patch('/user/' + id, obj)
}
// 更改个人信息
export const userMsgById = (id) => {
  return request.get('/user/' + id)
}
