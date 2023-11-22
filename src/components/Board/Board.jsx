import boardStyles from './Board.module.scss';

export const Board = ({children}) => {
    return (
        <div className={boardStyles.board}>
            {children}
        </div>
    );
};