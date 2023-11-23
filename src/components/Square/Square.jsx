import squareStyles from "./Square.module.scss";
import robotIcon from "../../icons/robot-icon.png";
import giftIcon from "../../icons/gift-icon.png";

export const Square = ({hasRobot = false, hasGift = false}) => {
    return (
        <div className={squareStyles.square}>
            {hasRobot && <img src={robotIcon}/>}
            {hasGift && <img src={giftIcon}/>}
        </div>
    );
};
