import boardStyles from './Board.module.scss';

export const Board = ({children}) => {
    return (
        <div className={boardStyles.board} data-testid="playing-board">
            {children}
        </div>
    );
};