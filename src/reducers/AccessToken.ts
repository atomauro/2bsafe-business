const intitialValue = '';
const reducer = (accessToken: any, action: any) => {
  switch (action.type) {
    case 'SET':
      return (accessToken = action.payload);
    case 'RESET':
      localStorage.removeItem('accessToken');
      return (accessToken = intitialValue);
    default:
      return accessToken;
  }
};

export default reducer;
