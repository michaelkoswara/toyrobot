import { memo } from 'react';
import boardStyles from './Board.module.scss';

// Memoized component (simple functional component that only receives props)
export const Board = memo(({children}) => {
    return (
        <div className={boardStyles.board} data-testid="playing-board">
            {children}
        </div>
    );
});