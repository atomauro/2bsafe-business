import { Input } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { SearchFieldContext } from '../views/sucursales/SucursalesListView';

export default function SearchField() {
  const { searchFieldDispatch, searchFieldState } = useContext(
    SearchFieldContext
  );
  const [searchField, setSearchField] = useState(searchFieldState);
  return (
    <Input
      placeholder={'Buscar sede...'}
      value={searchField}
      fullWidth={true}
      onChange={e => {
        setSearchField(e.target.value);
        searchFieldDispatch({ type: 'SET', payload: e.target.value });
      }}
    />
  );
}
