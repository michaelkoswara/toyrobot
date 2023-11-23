import PropTypes from "prop-types";
import statusBarStyles from "./StatusBar.module.scss";

const StatusBar = ({ xPosition, yPosition }) => {
  return (
    <span className={statusBarStyles.statusBar} data-testid="statusBar">
      Robot Location: {`X ${xPosition} : Y ${yPosition}`}
    </span>
  );
};

StatusBar.propTypes = {
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
};

export default StatusBar;
