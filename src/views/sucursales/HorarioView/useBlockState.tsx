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
  const [blocksDays, setBlocksDays] = useState(BLOCKS_DAYS as any);

  const updateBlocks = (dateTag: string) => {
    api(props.credentials).then((API: any) => {
      API.bloques
        .getBloquesByDateTag(
          props.credentials.email.slice(
            0,
            props.credentials.email.indexOf('@')
          ),
          dateTag
        )
        .then((response: any) => {
          setBlocksDays(blocksDays);
        });
    });
  };

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
      props.update()

      return !response || !response.data
        ? response.errors.length === 0
          ? {}
          : {}
        : {};

    },
    deleteBlock: async (dateTag: string, blockTag: string) => {
      const response = (await api(props.credentials)).bloques?.deleteBloque(
        props.credentials.email.slice(0, props.credentials.email.indexOf('@')),
        dateTag,
        blockTag
      ).then(res => {
        props.update()
      });
      console.log('Borrar: ' + blockTag);
      
      
      // setBlocks(newBlocks);
    }
  };
};
