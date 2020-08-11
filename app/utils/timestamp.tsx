import { isEmpty } from 'lodash';

type Date = string | number

export default (date: Date): string => {
  const timestamp = !isEmpty(date) ? new Date(date) : new Date();
  const day = timestamp.getDate();
  const month = timestamp.getMonth();
  const year = timestamp.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};
