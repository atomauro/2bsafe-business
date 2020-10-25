import { useState } from 'react';

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
