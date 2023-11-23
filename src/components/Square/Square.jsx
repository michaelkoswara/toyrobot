import squareStyles from "./Square.module.scss";
import robotIcon from "../../icons/robot-icon.png";
import giftIcon from "../../icons/gift-icon.png";

export const Square = ({hasRobot = false, hasGift = false}) => {
    return (
        <div className={`${squareStyles.square} square`}>
            {hasRobot && <img src={robotIcon} data-testid="robot-icon"/>}
            {hasGift && <img src={giftIcon} data-testid="gift-icon"/>}
        </div>
    );
};
