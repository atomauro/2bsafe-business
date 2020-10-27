import { useState, useEffect } from 'react';
import api from './../../../api/api';

const dateToWeekDay = (date: Date) => {
  const DAYS = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];
  const numberDay = date.getDay();
  return DAYS[numberDay];
};

const dateToYearMonthDay = (date: Date) => {
  return [date.getFullYear(), date.getMonth(), date.getDate()];
};

const populateDays = (blocksDays: Record<string, {}>, xDays: number) => {
  for (let i = 0; i < xDays; i++) {
    let [year, month, day] = dateToYearMonthDay(new Date());
    const actualDate = new Date(year, month, day + i);
    console.log('actualDate', actualDate);
    [year, month, day] = dateToYearMonthDay(actualDate);
    const stringDay = `${dateToWeekDay(actualDate)} - ${day}/${month +
      1}/${year}`;
    blocksDays[stringDay] = [];
  }

  return blocksDays;
};

const stringToDate = (stringDate: string) => {
  return new Date(
    Number(stringDate.slice(6, 10)),
    Number(stringDate.slice(3, 5)),
    Number(stringDate.slice(0, 2))
  );
};

const dateToDateTag = (date: Date) => {
  return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
};

const BLOCKS_DAYS = populateDays({}, 7);

export default (props: any) => {
  const [blocksDays, setBlocksDays] = useState(BLOCKS_DAYS);
  const [APIBloques, setAPIBloques] = useState(null as any);

  useEffect(() => {
    if (!APIBloques) {
      api(props.credentials).then(API => {
        setAPIBloques(API);
      });
    }
  }, []);

  return {
    blocksDays,
    addBlock: async (blockText: string, dayString: string) => {
      const timeTag = `${JSON.parse(blockText).desde.slice(0, 2)}${JSON.parse(
        blockText
      ).desde.slice(3, 5)}to${JSON.parse(blockText).hasta.slice(
        0,
        2
      )}${JSON.parse(blockText).hasta.slice(3, 5)}`;
      const response = await APIBloques.bloques?.createBloque(
        {
          blockTag: timeTag,
          aforoMaximo: 150,
          dateTag: dateToDateTag(stringToDate(dayString))
        },
        props.credentials.email.slice(0, props.credentials.email.indexOf('@'))
      );
      return response;
    },
    deleteBlock: (blockIndex: number) => {
      // const newBlocks = semana.day.blocks.filter((_:any, index: number) => index !== blockIndex);
      console.log('Borrar: ' + blockIndex);
      // setBlocks(newBlocks);
    }
  };
};
