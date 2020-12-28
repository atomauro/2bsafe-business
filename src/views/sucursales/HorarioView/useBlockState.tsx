import { useState } from 'react';
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

const dateToYearMonthDayStrings = (date: Date): [string, string, string] => {
  const addZeroString = (n: number): string => (n > 10 ? String(n) : `0${n}`);

  const month = addZeroString(date.getMonth() + 1);
  const day = addZeroString(date.getDate());

  return [String(date.getFullYear()), month, day];
};

const getColDate = (): Date => {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * -5);
};

const populateDays = (blocksDays: Record<string, {}>, xDays: number) => {
  for (let i = 0; i < xDays; i++) {
    const actualColDate = getColDate();
    actualColDate.setDate(actualColDate.getDate() + i);

    const [year, month, day] = dateToYearMonthDayStrings(actualColDate);
    const stringDay = `${dateToWeekDay(
      actualColDate
    )} - ${day}/${month}/${year}`;

    blocksDays[stringDay] = [];
  }

  return blocksDays;
};

const BLOCKS_DAYS = populateDays({}, 7);

export default (props: any) => {
  const [blocksDays] = useState(BLOCKS_DAYS as any);

  return {
    blocksDays,
    addBlock: async (blockObject: any, dayString: string) => {
      const blockTag =
        blockObject.desde.split(':').join('') +
        'to' +
        blockObject.hasta.split(':').join('');
      dayString =
        dayString && dayString.length === 7
          ? `${dayString.slice(0, dayString.length - 1)}0${dayString.charAt(
              dayString.length - 1
            )}`
          : dayString;
      const response = await (
        await api(props.credentials)
      ).bloques?.createBloque(
        {
          blockTag,
          aforoMaximo: blockObject.aforo,
          dateTag: dayString
        },
        props.credentials.email.slice(0, props.credentials.email.indexOf('@'))
      );

      // updateBlocks(dayString);
      props.update();

      return !response || !response.data
        ? response.errors.length === 0
          ? {}
          : {}
        : {};
    },
    deleteBlock: async (dateTag: string, blockTag: string) => {
      console.log('Borrar: ' + blockTag);

      // setBlocks(newBlocks);
    }
  };
};
