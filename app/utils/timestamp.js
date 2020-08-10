import { isEmpty } from 'lodash';

export default date => {
  const timestamp = !isEmpty(date) ? new Date(date) : new Date();
  const day = timestamp.getDate();
  const month = timestamp.getMonth();
  const year = timestamp.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};
