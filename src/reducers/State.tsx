import React, { useContext } from 'react';
import { AccessTokenContext, UserNameContext } from '../App';
import AccessTokenReducer from './AccessToken';
import UserNameReducer from './UserName';

export { AccessTokenReducer };
export { UserNameReducer };
  
export default ({ state }: { state: Record<string, any> }) => {
  const { accessTokenDispatch, accessTokenState } = useContext(
    AccessTokenContext
  );
  const { userNameDispatch, userNameState } = useContext(
    UserNameContext
  );

  Object.keys(state).forEach((value: string) => {
    console.log('value', localStorage.getItem(value));
    if (!localStorage.getItem(value)) {
      console.log(`Storing no saved value ${value},${String(state[value])}...`);
      localStorage.setItem(value, String(state[value]));
    } else if (localStorage.getItem(value) !== accessTokenState) {
      accessTokenDispatch({
        type: 'SET',
        payload: localStorage.getItem(value)
      });
    } else if (localStorage.getItem(value) !== userNameState) {
      userNameDispatch({
        type: 'SET',
        payload: localStorage.getItem(value)
      });
    }
  });
  return <></>;
};
