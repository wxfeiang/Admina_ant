import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const orgTree = () => {
  return builder([
    {
      key: 'key-01',
      title: '研发中心',
      icon: 'mail',
      children: [
        {
          key: 'key-01-01',
          title: '后端组',
          icon: null,
          group: true,
          children: [
            {
              key: 'key-01-01-01',
              title: 'JAVA',
              icon: null
            },
            {
              key: 'key-01-01-02',
              title: 'PHP',
              icon: null
            },
            {
              key: 'key-01-01-03',
              title: 'Golang',
              icon: null
            }
          ]
        },
        {
          key: 'key-01-02',
          title: '前端组',
          icon: null,
          group: true,
          children: [
            {
              key: 'key-01-02-01',
              title: 'React',
              icon: null
            },
            {
              key: 'key-01-02-02',
              title: 'Vue',
              icon: null
            },
            {
              key: 'key-01-02-03',
              title: 'Angular',
              icon: null
            }
          ]
        }
      ]
    },
    {
      key: 'key-02',
      title: '财务部',
      icon: 'dollar',
      children: [
        {
          key: 'key-02-01',
          title: '会计核算',
          icon: null
        },
        {
          key: 'key-02-02',
          title: '成本控制',
          icon: null
        },
        {
          key: 'key-02-03',
          title: '内部控制',
          icon: null,
          children: [
            {
              key: 'key-02-03-01',
              title: '财务制度建设',
              icon: null
            },
            {
              key: 'key-02-03-02',
              title: '会计核算',
              icon: null
            }
          ]
        }
      ]
    }
  ])
}

const menuTree = () => {
  return builder([
    {
      key: 'key-01',
      title: '菜单',
      icon: 'appstore',
      children: [
        {
          key: 'key-01-01',
          title: '用户管理',
          icon: 'user',
          group: true,
          children: [
            {
              key: 'key-01-01-01',
              title: '用户列表',
              icon: 'user'
            }
          ]
        },
        {
          key: 'key-01-02',
          title: '车辆管理',
          icon: 'car',
          group: true,
          children: [
            {
              key: 'key-01-02-01',
              title: '车辆列表',
              icon: 'car'
            }
          ]
        },
        {
          key: 'key-01-03',
          title: '停车场管理',
          icon: 'robot',
          group: true,
          children: [
            {
              key: 'key-01-03-01',
              title: '停车场列表',
              icon: 'robot'
            }
          ]
        },
        {
          key: 'key-01-04',
          title: '发票管理',
          icon: 'book',
          group: true,
          children: [
            {
              key: 'key-01-04-01',
              title: '发票管理',
              icon: 'book'
            }
          ]
        },
        {
          key: 'key-01-05',
          title: '资讯管理',
          icon: 'sound',
          group: true,
          children: [
            {
              key: 'key-01-05-01',
              title: '文章列表',
              icon: 'flag'
            }
          ]
        },
        {
          key: 'key-01-06',
          title: '物业管理',
          icon: 'bank',
          group: true,
          children: [
            {
              key: 'key-01-06-01',
              title: '报事报修',
              icon: 'tool'
            },
            {
              key: 'key-01-06-02',
              title: '费用查缴',
              icon: 'money-collect'
            },
            {
              key: 'key-01-06-03',
              title: '投诉建议',
              icon: 'audit'
            }
          ]
        },
        {
          key: 'key-01-07',
          title: '统计管理',
          icon: 'dashboard',
          group: true,
          children: [
            {
              key: 'key-01-07-01',
              title: '用户统计',
              icon: 'file-sync'
            },
            {
              key: 'key-01-07-02',
              title: '车辆统计',
              icon: 'file-protect'
            }
          ]
        },
        {
          key: 'key-01-08',
          title: '系统管理',
          icon: 'setting',
          group: true,
          children: [
            {
              key: 'key-01-08-01',
              title: '菜单配置',
              icon: null
            },
            {
              key: 'key-01-08-02',
              title: '系统用户',
              icon: null
            },
            {
              key: 'key-01-08-03',
              title: '橘色配置',
              icon: null
            },
            {
              key: 'key-01-08-04',
              title: '权限配置',
              icon: null
            }
          ]
        }
      ]
    }
  ])
}

const role = () => {
  return builder({
    data: [
      {
        id: 'super',
        name: '超级管理员',
        describe: '拥有所有权限',
        status: 1,
        creatorId: 'system',
        createTime: 1497160610259,
        deleted: 0,
        permissions: [
          {
            roleId: 'super',
            permissionId: 'wxuser',
            permissionName: '用户管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'super',
            permissionId: 'car',
            permissionName: '车辆管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'super',
            permissionId: 'park',
            permissionName: '停车场管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'super',
            permissionId: 'infos',
            permissionName: '资讯管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"audit","defaultCheck":false,"describe":"审核"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              },
              {
                action: 'audit',
                describe: '审核',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'super',
            permissionId: 'repair',
            permissionName: '物业管理-报事报修',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'super',
            permissionId: 'costs',
            permissionName: '物业管理-费用查缴',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'super',
            permissionId: 'complain',
            permissionName: '物业管理-投诉建议',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'super',
            permissionId: 'userStats',
            permissionName: '统计管理-用户统计',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'super',
            permissionId: 'carStats',
            permissionName: '统计管理-车辆统计',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'super',
            permissionId: 'spermis',
            permissionName: '权限管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'super',
            permissionId: 'srole',
            permissionName: '角色管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'super',
            permissionId: 'suser',
            permissionName: '用户管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"audit","defaultCheck":false,"describe":"审核"},{"action":"query","defaultCheck":false,"describe":"查询"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              },
              {
                action: 'audit',
                describe: '审核',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          }
        ]
      },
      {
        id: 'admin',
        name: '管理员',
        describe: '拥有所有权限',
        status: 1,
        creatorId: 'system',
        createTime: 1497160610259,
        deleted: 0,
        permissions: [
          {
            roleId: 'admin',
            permissionId: 'comment',
            permissionName: '用户管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'admin',
            permissionId: 'car',
            permissionName: '车辆管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'admin',
            permissionId: 'park',
            permissionName: '停车场管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'admin',
            permissionId: 'infors',
            permissionName: '资讯管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"audit","defaultCheck":false,"describe":"审核"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              },
              {
                action: 'audit',
                describe: '审核',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'admin',
            permissionId: 'repair',
            permissionName: '物业管理-报事报修',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'admin',
            permissionId: 'costs',
            permissionName: '物业管理-费用查缴',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'admin',
            permissionId: 'complain',
            permissionName: '物业管理-投诉建议',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'admin',
            permissionId: 'userStats',
            permissionName: '统计管理-用户统计',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'admin',
            permissionId: 'carStats',
            permissionName: '统计管理-车辆统计',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'admin',
            permissionId: 'spermis',
            permissionName: '权限管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'admin',
            permissionId: 'srole',
            permissionName: '角色管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'admin',
            permissionId: 'suser',
            permissionName: '用户管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"audit","defaultCheck":false,"describe":"审核"},{"action":"query","defaultCheck":false,"describe":"查询"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              },
              {
                action: 'audit',
                describe: '审核',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          }
        ]
      },
      {
        id: 'operat',
        name: '运营',
        describe: '运营权限',
        status: 1,
        creatorId: 'system',
        createTime: 1497160610259,
        deleted: 0,
        permissions: [
          {
            roleId: 'operat',
            permissionId: 'comment',
            permissionName: '用户管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'operat',
            permissionId: 'car',
            permissionName: '车辆管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'operat',
            permissionId: 'park',
            permissionName: '停车场管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'operat',
            permissionId: 'infors',
            permissionName: '资讯管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              },
              {
                action: 'delete',
                describe: '删除',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'operat',
            permissionId: 'repair',
            permissionName: '物业管理-报事报修',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'operat',
            permissionId: 'costs',
            permissionName: '物业管理-费用查缴',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'operat',
            permissionId: 'complain',
            permissionName: '物业管理-投诉建议',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'operat',
            permissionId: 'userStats',
            permissionName: '统计管理-用户统计',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'operat',
            permissionId: 'carStats',
            permissionName: '统计管理-车辆统计',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'operat',
            permissionId: 'suser',
            permissionName: '用户管理',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"query","defaultCheck":false,"describe":"查询"}]',
            actionEntitySet: [
              {
                action: 'add',
                describe: '新增',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'update',
                describe: '修改',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          }
        ]
      },
      {
        id: 'audit',
        name: '审核',
        describe: '审核权限',
        status: 1,
        creatorId: 'system',
        createTime: 1497160610259,
        deleted: 0,
        permissions: [
          {
            roleId: 'audit',
            permissionId: 'comment',
            permissionName: '用户管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'audit',
            permissionId: 'car',
            permissionName: '车辆管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'audit',
            permissionId: 'park',
            permissionName: '停车场管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'audit',
            permissionId: 'infors',
            permissionName: '资讯管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"audit","defaultCheck":false,"describe":"审核"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              },
              {
                action: 'audit',
                describe: '审核',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'audit',
            permissionId: 'repair',
            permissionName: '物业管理-报事报修',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'audit',
            permissionId: 'costs',
            permissionName: '物业管理-费用查缴',
            actions:
              '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'audit',
            permissionId: 'complain',
            permissionName: '物业管理-投诉建议',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'audit',
            permissionId: 'userStats',
            permissionName: '统计管理-用户统计',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'audit',
            permissionId: 'carStats',
            permissionName: '统计管理-车辆统计',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          }
        ]
      },
      {
        id: 'user',
        name: '普通',
        describe: '普通权限',
        status: 1,
        creatorId: 'system',
        createTime: 1497160610259,
        deleted: 0,
        permissions: [
          {
            roleId: 'user',
            permissionId: 'comment',
            permissionName: '用户管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'user',
            permissionId: 'car',
            permissionName: '车辆管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'user',
            permissionId: 'park',
            permissionName: '停车场管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'user',
            permissionId: 'infors',
            permissionName: '资讯管理',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'user',
            permissionId: 'repair',
            permissionName: '物业管理-报事报修',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'user',
            permissionId: 'costs',
            permissionName: '物业管理-费用查缴',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'user',
            permissionId: 'complain',
            permissionName: '物业管理-投诉建议',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'user',
            permissionId: 'userStats',
            permissionName: '统计管理-用户统计',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          },
          {
            roleId: 'user',
            permissionId: 'carStats',
            permissionName: '统计管理-车辆统计',
            actions:
              '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
            actionEntitySet: [
              {
                action: 'query',
                describe: '查询',
                defaultCheck: false
              },
              {
                action: 'get',
                describe: '详情',
                defaultCheck: false
              }
            ],
            actionList: null,
            dataAccess: null
          }
        ]
      }
    ],
    pageSize: 10,
    pageNo: 0,
    totalPage: 1,
    totalCount: 5
  })
}

const permissionNoPager = () => {
  return builder([
    {
      id: 'marketing',
      name: '营销管理',
      describe: null,
      status: 1,
      actionData:
        '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      sptDaTypes: null,
      optionalFields: null,
      parents: null,
      type: null,
      deleted: 0,
      actions: ['add', 'query', 'get', 'update', 'delete']
    },
    {
      id: 'member',
      name: '会员管理',
      describe: null,
      status: 1,
      actionData:
        '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      sptDaTypes: null,
      optionalFields: '[]',
      parents: null,
      type: 'default',
      deleted: 0,
      actions: ['add', 'query', 'get', 'update', 'delete']
    },
    {
      id: 'menu',
      name: '菜单管理',
      describe: null,
      status: 1,
      actionData:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
      sptDaTypes: null,
      optionalFields: '[]',
      parents: null,
      type: 'default',
      deleted: 0,
      actions: ['add', 'import', 'get', 'update']
    },
    {
      id: 'order',
      name: '订单管理',
      describe: null,
      status: 1,
      actionData:
        '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      sptDaTypes: null,
      optionalFields: '[]',
      parents: null,
      type: 'default',
      deleted: 0,
      actions: ['add', 'query', 'get', 'update', 'delete']
    },
    {
      id: 'permission',
      name: '权限管理',
      describe: null,
      status: 1,
      actionData:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      sptDaTypes: null,
      optionalFields: '[]',
      parents: null,
      type: 'default',
      deleted: 0,
      actions: ['add', 'get', 'update', 'delete']
    },
    {
      id: 'role',
      name: '角色管理',
      describe: null,
      status: 1,
      actionData:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      sptDaTypes: null,
      optionalFields: '[]',
      parents: null,
      type: 'default',
      deleted: 0,
      actions: ['add', 'get', 'update', 'delete']
    },
    {
      id: 'test',
      name: '测试权限',
      describe: null,
      status: 1,
      actionData:
        '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
      sptDaTypes: null,
      optionalFields: '[]',
      parents: null,
      type: 'default',
      deleted: 0,
      actions: ['add', 'get']
    },
    {
      id: 'user',
      name: '用户管理',
      describe: null,
      status: 1,
      actionData:
        '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
      sptDaTypes: null,
      optionalFields: '[]',
      parents: null,
      type: 'default',
      deleted: 0,
      actions: ['add', 'get']
    }
  ])
}

const totalCount = 13
const permissions = (options) => {
  const parameters = getQueryParameters(options)
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  return builder({
    data: [
      {
        id: 'wxuser',
        name: '用户管理',
        describe: null,
        status: 1,
        actionData:
          '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['query', 'get', 'update', 'delete']
      },
      {
        id: 'car',
        name: '车辆管理',
        describe: null,
        status: 1,
        actionData:
          '[{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['delete', 'query', 'update']
      },
      {
        id: 'park',
        name: '停车场管理',
        describe: null,
        status: 1,
        actionData:
          '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['query', 'update', 'delete']
      },
      {
        id: 'invoice',
        name: '发票管理',
        describe: null,
        status: 1,
        actionData: '[{"action":"query","defaultCheck":false,"describe":"查询"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['query']
      },
      {
        id: 'infos',
        name: '资讯管理',
        describe: null,
        status: 1,
        actionData:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"audit","defaultCheck":false,"describe":"审核"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['add', 'query', 'get', 'update', 'delete', 'audit']
      },
      {
        id: 'repair',
        name: '物业管理-报事报修',
        describe: null,
        status: 1,
        actionData:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['add', 'query', 'get', 'update', 'delete']
      },
      {
        id: 'costs',
        name: '物业管理-费用查缴',
        describe: null,
        status: 1,
        actionData:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['add', 'query', 'get', 'update', 'delete']
      },
      {
        id: 'complain',
        name: '物业管理-投诉建议',
        describe: null,
        status: 1,
        actionData:
          '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['query', 'get', 'update', 'delete']
      },
      {
        id: 'userStats',
        name: '统计管理-用户统计',
        describe: null,
        status: 1,
        actionData:
          '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['query', 'get']
      },
      {
        id: 'carStats',
        name: '统计管理-车辆统计',
        describe: null,
        status: 1,
        actionData:
          '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['query', 'get']
      },
      {
        id: 'spermis',
        name: '权限管理',
        describe: null,
        status: 1,
        actionData:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['add', 'update', 'delete']
      },
      {
        id: 'srole',
        name: '角色管理',
        describe: null,
        status: 1,
        actionData:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['add', 'update', 'delete']
      },
      {
        id: 'suser',
        name: '系统用户管理',
        describe: null,
        status: 1,
        actionData:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"audit","defaultCheck":false,"describe":"审核"}]',
        sptDaTypes: null,
        optionalFields: null,
        parents: null,
        type: null,
        deleted: 0,
        actions: ['add', 'query', 'get', 'update', 'delete', 'audit']
      }
    ],
    pageSize: pageSize,
    pageNo: pageNo,
    totalPage: totalPage,
    totalCount: totalCount
  })
}

Mock.mock(/\/org\/tree/, 'get', orgTree)
Mock.mock(/\/menu\/tree/, 'get', menuTree)
Mock.mock(/\/role/, 'get', role)
Mock.mock(/\/permission\/no-pager/, 'get', permissionNoPager)
Mock.mock(/\/permission/, 'get', permissions)
