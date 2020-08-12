import { Todo } from 'containers/App/types';

type Order = 'asc' | 'desc';

// type ComparatorFunc = (a: number, b: number) => number

// const descendingComparator = <Todo, Key extends keyof Todo>(a: Todo, b: Todo, orderBy: Key) => {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// };

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


// export const getComparator = (order: string, orderBy: string) =>
//   order === 'desc'
//     ? (a: Todo, b: Todo) => descendingComparator(a, b, orderBy as keyof Todo)
//     : (a: Todo, b: Todo) => -descendingComparator(a, b, orderBy as keyof Todo);

export function getComparator<Key extends keyof Todo>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// export const stableSort = (array: Todo[], comparator: ComparatorFunc): Todo[] => {
//   const stabilizedThis: (number | Todo)[][] = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0] as number, b[0] as number);
//     if (order !== 0) return order;
//     return (a[1] as number) - (b[1] as number);
//   });
//   const sortedData = map(stabilizedThis, el => el[0]) as Todo[]
//   return sortedData;
// };

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
