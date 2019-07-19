const api = {
  Login: '/sys/user/login',
  Logout: '/api/auth/logout',
  ForgePassword: '/api/auth/forge-password',
  Register: '/api/auth/register',
  twoStepCode: '/api/auth/2step-code',
  SendSms: '/api/account/sms',
  SendSmsErr: '/api/account/sms_err',
  CustomerList: '/sys/customer/getList',
  CustomerEdit: '/sys/customer/update',
  CarList: '/sys/vehicle/getList',
  CarAdd: '/sys/vehicle/bind',
  CarEdit: '/sys/vehicle/update',
  ParkList: '/sys/vehicle/infoList/gain',
  parkListMch: '/sys/mch/findList',
  ParkAdd: '/sys/vehicle/info',
  ParkAddNew: '/sys/vehicle/new/info',
  ParkEdit: '/sys/vehicle/info/update',
  ParkDetail: '/sys/vehicle/info/gain',
  ParkFeeDetail: '/sys/vehicle/rate/gain',
  ParkFeeAdd: '/sys/vehicle/rate',
  ParkFeeAddNew: 'sys/vehicle/new/rate',
  ParkFeeEdit: '/sys/vehicle/rate/update',
  ParkFeeInfo: '/sys/vehicle/rate/gainById',
  MchParkRateList: '/sys/mch/findAllData', // 获取商户、停车场、费率 树形结构数据
  MerchantAll: '/sys/mch/findList', // 根据mchId获取所有商户 1为所有商户，其他为指定商户
  MerchantList: '/sys/mch/findAll', // 获取商户数据 table使用
  MerchantDetail: '/sys/mch/find',
  MerchantParkDetail: '/sys/vehicle/infoList/gain',
  MerchantAdd: '/sys/mch/save',
  MerchantAddNew: '/sys/mch/new/save',
  MerchantEdit: '/sys/mch/update',
  ArtsList: '/api/art/list',
  NewsAdd: '/sys/news/save',
  NewsUpdate: '/sys/news/update',
  FindNewsByStateAndType: '/sys/news/findByStateAndType',
  GetNewsList: '/sys/news/getList',
  UpdateNews: '/sys/news/update',
  UploadImg: '/sys/news/uploadFile',
  DownloadImg: '/sys/news/downloadFile',
  DeleteImg: '/sys/news/deleteFile',
  SysNewsList: '/sys/news/getList',
  SysPayOrderList: '/sys/payOrder/findAll',
  SysPayOrderListByMulCondition: '/sys/payOrder/findByMulCondition',
  SysMenuList: '/sys/menu/list', // 系统管理  菜单列表
  SysMenuAdd: '/sys/menu/save', // 系统管理  菜单新增
  SysMenuEdit: '/sys/menu/update', // 系统管理  菜单修改
  SysMenuSelect: '/sys/menu/list/default', // 系统管理  子菜单数据
  SysPerGranGet: '/sys/permgra/enable', // 系统管理  权限粒度获取
  SysPerList: '/sys/perm/list', // 系统管理  权限列表 table使用
  SysPerAdd: '/sys/perm/save', // 系统管理  权限新增
  SysPerEdit: '/sys/perm/update', // 系统管理  权限修改
  SysPerSelect: '/sys/perm/enable',
  SysPerGranList: '/sys/permgra/list', // 系统管理  权限粒度列表 table使用
  SysPerGranAdd: '/sys/permgra/save', // 系统管理  权限粒度新增
  SysPerGranEdit: '/sys/permgra/update', // 系统管理  权限粒度修改
  SysPerByRoleId: '/sys/perm/byroid', // 系统管理  根据角色id获取权限数据
  SysRoleList: '/sys/role/list', // 系统管理  角色列表 table使用
  SysRoleAdd: '/sys/role/save', // 系统管理  角色新增
  SysRoleEdit: '/sys/role/update', // 系统管理  角色编辑
  SysRoleSelect: '/sys/role/enable', // 系统管理  角色数据
  SysUserList: '/sys/user/list', // 系统管理 用户列表 按商户查询
  SysUserAdd: '/sys/user/save', // 系统管理 用户新增
  SysUserEdit: '/sys/user/update', // 系统管理 用户编辑
  SysUserInfo: '/sys/user/info', // 登陆后 按用户所属用户组获取用户信息及角色权限信息
  SysUserGroupAdd: '/sys/group/save', // 系统管理 用户组新增
  SysUserGroupEdit: '/sys/group/update', // 系统管理 用户组修改
  SysUserGroupList: '/sys/group/list', // 系统管理 用户组列表 table使用
  SysUserGroupSelect: '/sys/group/enable', // 系统管理 有效用户组 按商户查询
  SysUserGroupUserList: '/sys/user/mchid', // 系统管理 对应商户下有效用户(已进组、未进组)
  SysUserGroupLinkUser: '/sys/group/saveuser', //系统管理 对应商户下 用户与用户组关联
  SysUserGroupDefaultEdit: '/sys/user/group', //系统管理 个人设置下 修改用户关联的用户组的默认组
  MprAddUser: '/sys/mch/leadIn',
  OrgList: '/sys/agency/allList',
  OrgDetail: '',
  OrgAdd: '/sys/agency/save',
  OrgEdit: '/sys/agency/update',
  SysPayBillList: '/sys/bill/findAll',
  generatingKeyById: '/sys/mch/generatingKeyById',
  SysPayBillListByCondition: '/sys/bill/findByMulCondition',
  SysGoodsOrderByCondition: '/sys/goods/list',
  SysPayOrderPushById: '/payment/payOrder/push/',
  SysRefundOrder: '/payment/refund'
}
export default api
