import { memo } from "react";
import squareStyles from "./Square.module.scss";
import robotIcon from "../../icons/robot-icon.png";
import giftIcon from "../../icons/gift-icon.png";

// Memoized component (simple functional component that only receives props)
export const Square = memo(({hasRobot = false, hasGift = false}) => {
    const containText = `that contains a ${hasRobot ? "robot": hasGift ? "gift" : ""}`;
    const ariaText = `A ${!(hasRobot || hasGift) ? "blank":""} square ${hasRobot || hasGift ? containText : ""}`;
    return (
        <div className={`${squareStyles.square} square`} aria-label={ariaText}>
            {hasRobot && <img src={robotIcon} data-testid="robot-icon" alt="an icon of a robot"/>}
            {hasGift && <img src={giftIcon} data-testid="gift-icon" alt="an icon of a gift"/>}
        </div>
    );
});
