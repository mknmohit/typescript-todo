import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TodoTable from 'components/TodoTable';
import { GROUPING, PRIORITY } from 'containers/App/constants';
import Styled from './style';

function CollapsibleRow({
  todoData,
  groupByKey,
  groupedValue,
  handldeTodoActions,
}) {
  const [isExpended, setIsExpended] = useState(false);

  const toggleCollapsible = () => {
    setIsExpended(!isExpended);
  };

  const getHeading = () => {
    const type = GROUPING[groupByKey];
    const value =
      groupByKey === 'priority' ? PRIORITY[groupedValue] : groupedValue;
    return (
      <Typography display="inline">
        {type}: <strong>{value}</strong>
      </Typography>
    );
  };

  return (
    <>
      <Styled.Row onClick={toggleCollapsible}>
        <TableCell align="left" size="small">
          <IconButton aria-label="expand row">
            {isExpended ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {getHeading()}
        </TableCell>
      </Styled.Row>
      <TableRow>
        <Styled.Cell>
          <Collapse in={isExpended} timeout="auto" unmountOnExit>
            <TodoTable
              todoData={todoData}
              handldeTodoActions={handldeTodoActions}
            />
          </Collapse>
        </Styled.Cell>
      </TableRow>
    </>
  );
}

CollapsibleRow.propTypes = {
  todoData: PropTypes.array,
  groupByKey: PropTypes.string,
  groupedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handldeTodoActions: PropTypes.func,
};

export default CollapsibleRow;
