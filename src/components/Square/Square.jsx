import squareStyles from "./Square.module.scss";
import robotIcon from "../../icons/robot-icon.png";

export const Square = ({hasRobot = false}) => {
    return (
        <div className={squareStyles.square}>
            {hasRobot && <img src={robotIcon}/>}
        </div>
    );
};
