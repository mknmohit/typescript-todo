import { Todo } from '../containers/App/types';

type ComparatorFunc = (a: number | Todo, b: number | Todo) => number

const descendingComparator = <Todo, Key extends keyof Todo>(a: Todo, b: Todo, orderBy: Key) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = <Todo, Key extends keyof Todo>(order: string, orderBy: Key) =>
  order === 'desc'
    ? (a: Todo, b: Todo) => descendingComparator(a, b, orderBy)
    : (a: Todo, b: Todo) => -descendingComparator(a, b, orderBy);

export const stableSort = (array: Todo[], comparator: ComparatorFunc) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return (a[1] as number) - (b[1] as number);
  });
  return stabilizedThis.map(el => el[0]);
};
