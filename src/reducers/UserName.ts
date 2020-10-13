const intitialValue = '';
const reducer = (userName: any, action: any) => {
  switch (action.type) {
    case 'SET':
      return (userName = action.payload);
    case 'RESET':
      console.log('RESET Username')
      localStorage.removeItem('userName');
      return (userName = intitialValue);
    default:
      return userName;
  }
};

export default reducer;
