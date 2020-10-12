import { Input } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { SearchFieldContext } from '../views/sucursales/SucursalesListView';

export default function SearchField({
  isSucursales,
  ...rest
}: {
  isSucursales: boolean;
}) {
  const { searchFieldDispatch, searchFieldState } = useContext(
    SearchFieldContext
  );
  const [searchField, setSearchField] = useState(searchFieldState);
  
  let placeholderSearch = ''
  if (isSucursales) { 
    placeholderSearch='Buscar sede por nombre...'
  }
  else {
    placeholderSearch='Buscar persona por cedula...'
  }

  return (
    <Input
      placeholder={placeholderSearch}
      value={searchField}
      fullWidth={true}
      onChange={e => {
        setSearchField(e.target.value);
        searchFieldDispatch({ type: 'SET', payload: e.target.value });
      }}
    />
  );
}
