import { useState, useEffect } from "react";
import { Board, Square, Form } from "../components";
import { useKeyPress } from "../hooks/useKeyPress";
import homeStyles from "./Home.module.scss";

export const Home = () => {
    const [robotPosition, setRobotPosition] = useState([0,0]);
    const [giftPosition, setGiftPosition] = useState(null);
    const [isFormInFocus, setIsFormInFocus] = useState(false);
    const [robotMessage, setRobotMessage] = useState("");
    const minBoundary = 0;
    const maxBoundary = 4;
    const invalidInputMessage = "Oops, I cannot fall off the edge.";
    const playingBoard = (new Array(5)).fill(new Array(5).fill(0));
    const [arrowKeyPressed, invalidKeyPressed] = useKeyPress(['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']);

    const generateRandomNumber = (min = 0, max = 4, exclusion = 0) => {
        let randomNumber = Math.floor(Math.random() * (max - min)) + min;
        while (randomNumber === exclusion) {
            randomNumber = Math.floor(Math.random() * (max - min)) + min;
        }
        return randomNumber;
    }

    const handleNewPositionRequest = ({rowPosition, columnPosition}) => {
        // Manually blur form due to limitation of react-hook-form (see: https://www.joeltok.com/posts/2022-07-unfocus-input-react-hook-form/)
        document.activeElement.blur();
        setRobotMessage("");
        setIsFormInFocus(false);
        setRobotPosition([parseInt(rowPosition-1),parseInt(columnPosition-1)]);
        const giftRowPosition = generateRandomNumber(0,4,rowPosition-1);
        const giftColumnPosition = generateRandomNumber(0,4,columnPosition-1);
        setGiftPosition([giftRowPosition, giftColumnPosition]);
    }

    // Determines if a square should display a robot based on the robot's current row-col position
    const shouldDisplayRobot = (squarePosition) => {
        const [row, column] = squarePosition;
        const [robotRowPosition, robotColumnPosition] = robotPosition;
        return (row === robotRowPosition) && (column === robotColumnPosition);
    }

    // Determines if a square should display a gift based on the gift's current row-col position
    const shouldDisplayGift = (squarePosition) => {
        const [row, column] = squarePosition;
        if (giftPosition) {
            const [giftRowPosition, giftColumnPosition] = giftPosition;
            return (row === giftRowPosition) && (column === giftColumnPosition);
        }
        return false;
    }

    const moveRobot = (direction) => {
        setRobotMessage("");
        const [robotRowPosition, robotColumnPosition] = robotPosition;
        let newRowPosition = robotRowPosition;
        let newColumnPosition = robotColumnPosition;
        let isInputValid = true;
        switch(direction) {
            case "ArrowLeft":
                newRowPosition -= 1;
                isInputValid = newRowPosition >= minBoundary;
                if (isInputValid) setRobotPosition([newRowPosition,robotColumnPosition])
                else {setRobotMessage(invalidInputMessage);}
                break;
            case "ArrowRight":
                newRowPosition += 1;
                isInputValid = newRowPosition <= maxBoundary;
                if (isInputValid) setRobotPosition([newRowPosition,robotColumnPosition])
                else {setRobotMessage(invalidInputMessage);}
                break;
            case "ArrowUp":
                newColumnPosition -= 1;
                isInputValid = newColumnPosition >= minBoundary;
                if (isInputValid) setRobotPosition([robotRowPosition,newColumnPosition])
                else {setRobotMessage(invalidInputMessage);}
                break;
            case "ArrowDown":
                newColumnPosition += 1;
                isInputValid = newColumnPosition <= maxBoundary;
                if (isInputValid) setRobotPosition([robotRowPosition,newColumnPosition])
                else {setRobotMessage(invalidInputMessage);}
                break;
            default:
                return;
        }
    };

    useEffect(() => {
        // Only move robot if the arrow key press is not when form fields are in focus
        if (arrowKeyPressed && !isFormInFocus) {
          moveRobot(arrowKeyPressed);
        }
        if (invalidKeyPressed && !isFormInFocus && (!['Tab','Enter'].includes(invalidKeyPressed))) {
            setRobotMessage("Oops, I can only be moved using the directional keys or buttons :)")
        }
    }, [arrowKeyPressed, isFormInFocus, invalidKeyPressed]);

    // Everytime the robot position changes, check to see if it lands on a gift. If yes then display message & remove gift.
    useEffect(()=> {
        const [robotRowPosition, robotColumnPosition] = robotPosition;
        if (giftPosition) {
            const [giftRowPosition, giftColumnPosition] = giftPosition;
            if (robotRowPosition === giftRowPosition && robotColumnPosition === giftColumnPosition) {
                setGiftPosition(null);
                setRobotMessage("I found a gift ! Awesome !");
            }
        }
    }, [robotPosition])

    useEffect(()=> {
        const [robotRowPosition, robotColumnPosition] = robotPosition;
        const giftRowPosition = generateRandomNumber(0,4,robotRowPosition);
        const giftColumnPosition = generateRandomNumber(0,4,robotColumnPosition);
        setGiftPosition([giftRowPosition, giftColumnPosition]);
    },[])
   
    return (
        <>
            <div className={homeStyles.col}>
                <h1 data-testid="main-header">Toy Robot Simulator</h1>
                <Board>
                    {
                        playingBoard.map((row, rowIndex) => {
                            return <div key={rowIndex}>
                                {
                                    row.map((column, columnIndex) => <Square key={`${rowIndex},${columnIndex}`} hasRobot={shouldDisplayRobot([rowIndex, columnIndex])} hasGift={shouldDisplayGift([rowIndex, columnIndex])}/>)
                                }
                            </div>
                        })
                    }
                </Board>
            </div>
            <div className={homeStyles.col}>
                <h2>Command Panel</h2>
                <div className={homeStyles.locationStatus}>Robot Location: {`X ${robotPosition[0]+1} : Y ${robotPosition[1]+1}`}</div>
                <button className={homeStyles.moveButton} onClick={() => moveRobot("ArrowUp")} data-testid="arrow-up">{"UP"}</button>
                <button className={homeStyles.moveButton} onClick={() => moveRobot("ArrowDown")} data-testid="arrow-down">{"DOWN"}</button>
                <button className={homeStyles.moveButton} onClick={() => moveRobot("ArrowLeft")} data-testid="arrow-left">{"LEFT"}</button>
                <button className={homeStyles.moveButton} onClick={() => moveRobot("ArrowRight")} data-testid="arrow-right">{"RIGHT"}</button>
                
                {robotMessage && <p className={homeStyles.message} data-testid="robot-message">Message from robot: {`"${robotMessage}"`}</p>}
                <Form onSubmit={handleNewPositionRequest} onFocusChange={setIsFormInFocus}/>
            </div>

        </>
    );
};

