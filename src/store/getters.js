const getters = {
  device: (state) => state.app.device,
  theme: (state) => state.app.theme,
  color: (state) => state.app.color,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  nickname: (state) => state.user.name,
  mchId: (state) => state.user.mchId,
  roleId: (state) => state.user.roleId,
  welcome: (state) => state.user.welcome,
  roles: (state) => state.user.roles,
  userInfo: (state) => state.user.info,
  addRouters: (state) => state.permission.addRouters,
  multiTab: (state) => state.app.multiTab,
  lockState: (state) => state.app.lock,
  groups: (state) => state.user.groups,
  curGroup: (state) => state.user.curgroup
}

export default getters
