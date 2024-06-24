import request from '@/utils/request'
// 分页功能
export const getGoodsList = (page, limit) => {
  return request.get('/goods', {
    params: {
      _page: page,
      _limit: limit
    }
  })
}
// 按商品名称搜索
export const searchGoods = (name) => {
  return request.get('/goods?_limit=10', {
    params: {
      name_like: name
    }
  })
}
// 按商品时间搜索
export const searchOndate = (date) => {
  return request.get('/goods', {
    params: {
      date_like: date
    }
  })
}
// 按id编号删除商品
export const deleteOnId = (id) => {
  return request.delete('/goods/' + id)
}
// id自增新添商品
export const addGoods = (obj) => {
  return request.post('/goods', obj)
}
// 通过id更改商品
export const updateGoods = (id, obj) => {
  return request.patch('/goods/' + id, obj)
}
// 通过id查找商品
export const searchGoodsById = (id) => {
  return request.get('/goods/' + id)
}
