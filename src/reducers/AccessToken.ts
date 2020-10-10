const intitialValue = '';
const reducer = (accessToken: any, action: any) => {
  switch (action.type) {
    case 'SET':
      return (accessToken = action.payload);
    case 'RESET':
      return (accessToken = intitialValue);
    default:
      return accessToken;
  }
};

export default reducer;
