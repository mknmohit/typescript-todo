import { isEmpty } from 'lodash';

type DateType = string | number | Date

const getTime = (date?: DateType) => {
  if (!isEmpty(date)) {
    return new Date(date as DateType);
  }
  return new Date();
}

export default (date?: DateType) => {
  const timestamp = getTime(date)
  const day = timestamp.getDate();
  const month = timestamp.getMonth();
  const year = timestamp.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};
