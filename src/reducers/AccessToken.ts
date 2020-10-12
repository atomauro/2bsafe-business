const intitialValue = '';
const reducer = (dashboard2bsafeAccessToken: any, action: any) => {
  switch (action.type) {
    case 'SET':
      return (dashboard2bsafeAccessToken = action.payload);
    case 'RESET':
      localStorage.removeItem('accessToken');
      return (dashboard2bsafeAccessToken = intitialValue);
    default:
      return dashboard2bsafeAccessToken;
  }
};

export default reducer;
