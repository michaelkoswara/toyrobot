import { useState, useEffect } from "react";
import { Board, Square } from "../components";
import { useKeyPress } from "../hooks/useKeyPress";

export const Home = () => {
    const [robotPosition, setRobotPosition] = useState([0,0]);
    const minBoundary = 0;
    const maxBoundary = 4;
    const playingBoard = (new Array(5)).fill(new Array(5).fill(0));
    const arrowKeyPressed = useKeyPress(['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']);

    // Determines if a square should display a robot based on the robot's current row-col position
    const shouldDisplayRobot = (squarePosition) => {
        const [row, column] = squarePosition;
        const [robotRowPosition, robotColumnPosition] = robotPosition;
        return (row === robotRowPosition) && (column === robotColumnPosition);
    }

    const moveRobot = (direction) => {
        const [robotRowPosition, robotColumnPosition] = robotPosition;
        let newRowPosition = robotRowPosition;
        let newColumnPosition = robotColumnPosition;
        switch(direction) {
            case "ArrowLeft":
                newRowPosition -= 1;
                if (newRowPosition >= minBoundary) setRobotPosition([newRowPosition,robotColumnPosition]);
                break;
            case "ArrowRight":
                newRowPosition += 1;
                if (newRowPosition <= maxBoundary) setRobotPosition([newRowPosition,robotColumnPosition]);
                break;
            case "ArrowUp":
                newColumnPosition -= 1;
                if (newColumnPosition >= minBoundary) setRobotPosition([robotRowPosition,newColumnPosition]);
                break;
            case "ArrowDown":
                newColumnPosition += 1;
                if (newColumnPosition <= maxBoundary) setRobotPosition([robotRowPosition,newColumnPosition]);
                break;
            default:
                return;
        }
    };

    useEffect(() => {
        if (arrowKeyPressed) {
          moveRobot(arrowKeyPressed);
        }
    }, [arrowKeyPressed]);
   
    return (
        <>
            <h1>Toy Robot Simulator</h1>
            <Board>
                {
                    playingBoard.map((row, rowIndex) => {
                        return <div key={rowIndex}>
                            {
                                row.map((column, columnIndex) => <Square key={`${rowIndex},${columnIndex}`} hasRobot={shouldDisplayRobot([rowIndex, columnIndex])}/>)
                            }
                        </div>
                    })
                }
            </Board>
            <div>Status: {`Row ${robotPosition[1]+1} Column ${robotPosition[0]+1}}`}</div>
            <button onClick={() => moveRobot("ArrowLeft")}>{"<"}</button>
            <button onClick={() => moveRobot("ArrowUp")}>{"^"}</button>
            <button onClick={() => moveRobot("ArrowRight")}>{">"}</button>
            <button onClick={() => moveRobot("ArrowDown")}>{"v"}</button>
            <input type="text"/>

        </>
    );
};

