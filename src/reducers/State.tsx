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
  const { userNameDispatch, userNameState } = useContext(UserNameContext);

  const STATE: any = {
    dashboard2bsafeAccessToken: {
      state: accessTokenState,
      dispatch: accessTokenDispatch
    },
    userName: {
      state: userNameState,
      dispatch: userNameDispatch
    }
  };

  Object.keys(state).forEach((value: string) => {
    console.log('value', value);
    if (!localStorage.getItem(value)) {
      console.log(`Storing no saved value ${value},${String(state[value])}...`);
      localStorage.setItem(value, String(state[value]));
    } else if (localStorage.getItem(value) !== STATE[value].state) {
      STATE[value].dispatch({
        type: 'SET',
        payload: localStorage.getItem(value)
      });
    }
  });
  return <></>;
};
