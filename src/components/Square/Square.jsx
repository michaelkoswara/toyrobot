import { memo } from "react";
import squareStyles from "./Square.module.scss";
import robotIcon from "../../icons/robot-icon.png";
import giftIcon from "../../icons/gift-icon.png";
import PropTypes from "prop-types";

// Memoized component (simple functional component that only receives props)
const Square = memo(({ hasRobot = false, hasGift = false }) => {
  return (
    <div
      className={`${squareStyles.square} square`}
      aria-label="a square on a 2 dimensional board"
    >
      {hasRobot && (
        <img
          src={robotIcon}
          data-testid="robot-icon"
          alt="an icon of a robot"
        />
      )}
      {hasGift && (
        <img src={giftIcon} data-testid="gift-icon" alt="an icon of a gift" />
      )}
    </div>
  );
});

Square.propTypes = {
  hasRobot: PropTypes.bool,
  hasGift: PropTypes.bool,
};

export default Square;
