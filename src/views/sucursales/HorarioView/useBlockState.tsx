import { useState } from 'react';

const initialState = [
{
  lunes: {
  inicio:null,
  fin:null,
  blocks:[{
    desde:'8:00',
    hasta:'9:30', 
    tag:'0800to2130'      
  },
  {
    desde:'04:20',
    hasta:'12:00',    
    tag:'2000to2130'   
  },
  {
    desde:'11:00',
    hasta:'12:00',    
    tag:'2000to2130'   
  },
]
}},
{martes: {
  inicio:'',
  fin:'',
  blocks:[{
    desde:'16:00',
    hasta:'16:30',    
    tag:'2000to2130'   
  },
  {
    desde:'17:00',
    hasta:'18:00',    
    tag:'2000to2130'   
  },
  {
    desde:'18:00',
    hasta:'19:00',    
    tag:'2000to2130'   
  },
]
}},
{miercoles: {
  inicio:'',
  fin:'',
  blocks:[{
    desde:'20:00',
    hasta:'21:30', 
    tag:'2000to2130'   
  },
  {
    desde:'21:00',
    hasta:'22:00',    
    tag:'2000to2130'   
  },
  {
    desde:'23:00',
    hasta:'24:00',   
    tag:'2000to2130'    
  },
]
}},
{jueves: {
  inicio:'',
  fin:'',
  blocks:[{
    desde:'8:00',
    hasta:'9:30', 
    tag:'2000to2130'      
  },
  {
    desde:'10:00',
    hasta:'11:00', 
    tag:'2000to2130'      
  },
  {
    desde:'11:00',
    hasta:'12:00',  
    tag:'2000to2130'     
  },
]
}},
{viernes: {
  inicio:'',
  fin:'',
  blocks: [{
    desde:'8:00',
    hasta:'9:30',  
    tag:'2000to2130'     
  },
  {
    desde:'20:00',
    hasta:'12:00', 
    tag:'2000to2130'      
  },
  {
    desde:'15:00',
    hasta:'15:00',   
    tag:'2000to2130'    
  },
]
}},
{sabado: {
  inicio:'',
  fin:'',
  blocks:[{
    desde:'12:00',
    hasta:'12:30',    
    tag:'2000to2130'   
  },
  {
    desde:'13:00',
    hasta:'14:00',   
    tag:'2000to2130'    
  },
  {
    desde:'15:00',
    hasta:'16:00',    
    tag:'2000to2130'   
  },
]
}},
{domingo: {
  inicio:'',
  fin:'',
  blocks:[{
    desde:'',
    hasta:'',
    tag:'2000to2130'       
  }]
}}]


export default (props:any) => {
  const [semana, setBlocks] = useState(initialState);

  return {
    semana,
    addBlock: (blockText:string, dayChoosed:number) => {
      setBlocks({...semana});
      console.log(semana)
      console.log(blockText)
      console.log(dayChoosed)
    },
    deleteBlock: (blockIndex:number) => {
      // const newBlocks = semana.day.blocks.filter((_:any, index: number) => index !== blockIndex);
      console.log("Borrar: " + blockIndex)
      // setBlocks(newBlocks);
    }
  };
};
