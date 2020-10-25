import { useState } from 'react';

const initialState = [
{lunes: {
  inicio:'',
  fin:'',
  block:{
    desde:'',
    hasta:'',
    aforo:0
  }
}},
{martes: {
  inicio:'',
  fin:'',
  blocks:[{
    desde:'',
    hasta:'',
    aforo:0
  }]
}},
{miercoles: {
  inicio:'',
  fin:'',
  blocks:{
    desde:'',
    hasta:'',
    aforo:0
  }
}},
{jueves: {
  inicio:'',
  fin:'',
  blocks:{
    desde:'',
    hasta:'',
    aforo:0
  }
}},
{viernes: {
  inicio:'',
  fin:'',
  blocks:{
    desde:'',
    hasta:'',
    aforo:0
  }
}},
{sabado: {
  inicio:'',
  fin:'',
  blocks:{
    desde:'',
    hasta:'',
    aforo:0
  }
}},
{domingo: {
  inicio:'',
  fin:'',
  blocks:{
    desde:'',
    hasta:'',
    aforo:0,
  }
}}]


export default (initialValue:any) => {
  const [blocks, setBlocks] = useState(initialValue);

  return {
    blocks,
    addBlock: (blockText:string) => {
      setBlocks([...blocks, blockText]);
      
    },
    deleteBlock: (blockIndex:number) => {
      const newBlocks = blocks.filter((_:any, index: number) => index !== blockIndex);

      setBlocks(newBlocks);
    }
  };
};
