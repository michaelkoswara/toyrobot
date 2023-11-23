import { memo } from 'react';
import boardStyles from './Board.module.scss';
import PropTypes from 'prop-types';

// Memoized component (simple functional component that only receives props)
const Board = memo(({children}) => {
    return (
        <div className={boardStyles.board} data-testid="playing-board">
            {children}
        </div>
    );
});

Board.propTypes = {
    children: PropTypes.node.isRequired
};

export default Board;