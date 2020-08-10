import { replace } from 'lodash';

export default (data, searchKeyword) => {
  const { title, description } = data;
  const string = replace(searchKeyword, /[' ']/g, '|');
  const pattern = new RegExp(string, 'i');
  const searchTitle = title.search(pattern);
  const searchDescription = description.search(pattern);
  return searchTitle !== -1 || searchDescription !== -1;
};
