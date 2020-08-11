import { replace } from 'lodash';
import { Todo } from '../containers/App/types';

type Return = number | boolean

export default (data: Todo, searchKeyword: string): Return => {
  const { title, description } = data;
  const string = replace(searchKeyword, /[' ']/g, '|');
  const pattern = new RegExp(string, 'i');
  const searchTitle = title.search(pattern);
  const searchDescription = description.search(pattern);
  return searchTitle !== -1 || searchDescription !== -1;
};
