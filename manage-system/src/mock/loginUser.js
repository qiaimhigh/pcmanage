import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/mall',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: '/UserPage'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: '/UserPage'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: '/MallPage'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: '/other/PageOne'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: '/other/PageTwo'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'user' && password === 'user') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/mall',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: '/UserPage'
            },
            {
              path: '/mall',
              name: 'video',
              label: '商品管理',
              icon: 'video-play',
              url: '/UserPage'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}
