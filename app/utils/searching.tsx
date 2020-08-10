import { replace } from 'lodash';

type Todo = {
  id: number
  title: string
  description: string
  dueDate: string
  priority: number
  createdAt: number
  currentState: string
  isReadOnly: boolean
}

type Return = number | boolean

export default (data: Todo, searchKeyword: string): Return => {
  const { title, description } = data;
  const string = replace(searchKeyword, /[' ']/g, '|');
  const pattern = new RegExp(string, 'i');
  const searchTitle = title.search(pattern);
  const searchDescription = description.search(pattern);
  return searchTitle !== -1 || searchDescription !== -1;
};
