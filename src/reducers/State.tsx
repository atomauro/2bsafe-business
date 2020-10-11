import React, { useContext } from 'react';
import { AccessTokenContext } from '../App';
import AccessTokenReducer from './AccessToken';

export { AccessTokenReducer };
export default ({ state }: { state: Record<string, any> }) => {
  const { accessTokenDispatch, accessTokenState } = useContext(
    AccessTokenContext
  );

  Object.keys(state).forEach((value: string) => {
    if (!localStorage.getItem(value)) {
      console.log(`Storing no saved value ${value},${String(state[value])}...`);
      localStorage.setItem(value, String(state[value]));
    } else if (localStorage.getItem(value) !== accessTokenState) {
      accessTokenDispatch({
        type: 'SET',
        payload: localStorage.getItem(value)
      });
    }
  });
  return <></>;
};
