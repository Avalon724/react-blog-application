export const LoginStart = () => ({
  type: "REGISTER_START",
});

export const LoginSuccess = (user) => ({
  type: "REGISTER_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "REGISTER_FAILURE",
});
