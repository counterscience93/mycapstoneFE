const getters = {
  // loading
  isLoading: state => state.loading.isLoading,

  // user
  token: state => state.user.token,
  userId: state => state.user.userId,
  userName: state => state.user.userName,
  role: state => state.user.role,
  userInfo: state => state.user.userInfo,
  decodeToken: state => state.user.decodeToken
};
export default getters;
