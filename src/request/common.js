export function removeHTMLTag(htmlStr) {
  const html = htmlStr.replace(/<img.*?>/g, '').replaceAll(/<[^>]+>/g, '').replace(/&nbsp;/gi, '')
  return html
}

export function rulesMenu(new_arr, old_arr) {
  // 开始筛选保留前端中匹配后端的路由
  const newarr = []
  new_arr.forEach(ele => {
    old_arr.forEach(element => {
      // 前端和后端路由一致
      if (ele.meta.title === element.name) {
        // 开始深拷贝，利用深拷贝将children中共同的路由筛选
        if (element.children && element.children.length > 0) {
          ele.children = rulesMenu(ele.children, element.children)
        }
        newarr.push(ele)
      }
    })
  })
  return newarr
}

// 重置路由
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // 重新设置路由的可匹配路径
// }
