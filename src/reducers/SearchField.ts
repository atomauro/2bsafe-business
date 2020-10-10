const intitialValue = '';
const reducer = (seachField: any, action: any) => {
  switch (action.type) {
    case 'SET':
      return (seachField = action.payload);
    case 'RESET':
      return (seachField = intitialValue);
    default:
      return seachField;
  }
};

export default reducer;
