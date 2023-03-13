import { Player, TileOwner } from "./types";
import {
  setTile,
  setTurn,
  setWinner,
  setPieceToMove,
  setStartingPoint,
  resetBoard,
} from "./UI/state";

let coordinates = [
  [0, 0],
  [0, 0],
];

const changeCoordinates = (
  startingCol: number,
  startingRow: number,
  finalCol: number,
  finalRow: number
) => {
  coordinates[0][0] = startingCol;
  coordinates[0][1] = startingRow;

  coordinates[1][0] = finalCol;
  coordinates[1][1] = finalRow;
};

/**
 * Called when the user clicks on a tile
 * @param row of the clicked tile
 * @param column of the clicked tile
 * @param owner of the clicked tile
 */
export function onTileClick(
  actualBoard: TileOwner[][],
  row: number,
  column: number,
  owner: TileOwner,
  turn: Player,
  pieceToMove: TileOwner,
  startingCol: number,
  startingRow: number
) {
  console.log(`CLICK INFO row: ${row} column: ${column} owner: ${owner} to move: ${pieceToMove}`);

  if (owner !== "none" && pieceToMove !== "none") {
    setTile(coordinates[1][1], coordinates[1][0], pieceToMove);
    setPieceToMove("none");
    return;
  }

  if (owner.includes(turn) || pieceToMove.includes(turn)) {
    changeCoordinates(startingCol, startingRow, column, row);
    setStartingPoint(column, row);
    setPieceToMove(owner);
    setTile(row, column, "none");

    if (owner === "none") {
      let simpleMovement = checkSimpleMovement(pieceToMove);
      let rightKillingMovement = checkRightKillingMovement(actualBoard,pieceToMove);
      let leftKillingMovement = checkLeftKillingMovement(actualBoard,pieceToMove);

      if (simpleMovement === "allowed") {
        setTile(row, column, pieceToMove);
        turn = turn === "blue" ? "red" : "blue";
        setTurn(turn);
      } else if (rightKillingMovement === "blue-right") {
        setTile(row, column, pieceToMove);
        setTile(coordinates[0][1] + 1, coordinates[0][0] + 1, "none");
        //sumar puntaje
        turn = turn === "blue" ? "red" : "blue";
        setTurn(turn);
      } else if (leftKillingMovement === "blue-left") {
        setTile(row, column, pieceToMove);
        setTile(coordinates[0][1] + 1, coordinates[0][0] - 1, "none");
        //sumar puntaje
        turn = turn === "blue" ? "red" : "blue";
        setTurn(turn);
      } else if (rightKillingMovement === "red-right") {
        setTile(row, column, pieceToMove);
        setTile(coordinates[0][1] - 1, coordinates[0][0] + 1, "none");
        //sumar puntaje
        turn = turn === "blue" ? "red" : "blue";
        setTurn(turn);
      } else if (leftKillingMovement === "red-left") {
        setTile(row, column, pieceToMove);
        setTile(coordinates[0][1] - 1, coordinates[0][0] - 1, "none");
        //sumar puntaje
        turn = turn === "blue" ? "red" : "blue";
        setTurn(turn);
      } else {
        setTile(coordinates[0][1], coordinates[0][0], pieceToMove);
        setPieceToMove("none");
        return;
      }
    }
  }
}

const checkSimpleMovement = (pieceToMove: TileOwner) => {
  let colMovement =
    coordinates[1][0] === coordinates[0][0] + 1 ||
    coordinates[1][0] === coordinates[0][0] - 1;

  let rowMoventForBlue = coordinates[1][1] === coordinates[0][1] + 1;
  let rowMoventForRed = coordinates[1][1] === coordinates[0][1] - 1;

  if (pieceToMove.includes("blue")) {
    if (rowMoventForBlue && colMovement) {
      return "allowed";
    }
    return "not allowed";
  }

  if (pieceToMove.includes("red")) {
    if (rowMoventForRed && colMovement) {
      return "allowed";
    }
    return "not allowed";
  }
};

const checkRightKillingMovement = (
  actualBoard: TileOwner[][],
  pieceToMove: TileOwner
) => {
  let colMovement = coordinates[1][0] === coordinates[0][0] + 2;
  let rowMoventForBlue = coordinates[1][1] === coordinates[0][1] + 2;
  let rowMoventForRed = coordinates[1][1] === coordinates[0][1] - 2;

  if (pieceToMove.includes("blue") && rowMoventForBlue && colMovement) {
    if (actualBoard[coordinates[0][0] + 1][coordinates[0][1] + 1].includes("red")) {
      return "blue-right";
    }
    return "not apply";
  }

  if (pieceToMove.includes("red") && rowMoventForRed && colMovement) {
    if (actualBoard[coordinates[0][0] + 1][coordinates[0][1] - 1].includes("blue")) {
      return "red-right";
    }
    return "not apply";
  }
};

const checkLeftKillingMovement = (
  actualBoard: TileOwner[][],
  pieceToMove: TileOwner
) => {
  let colMovement = coordinates[1][0] === coordinates[0][0] - 2;
  let rowMoventForBlue = coordinates[1][1] === coordinates[0][1] + 2;
  let rowMoventForRed = coordinates[1][1] === coordinates[0][1] - 2;

  if (pieceToMove.includes("blue") && rowMoventForBlue && colMovement) {
    if (actualBoard[coordinates[0][0] - 1][coordinates[0][1] + 1].includes("red")) {
      return "blue-left";
    }
    return "not apply";
  }

  if (pieceToMove.includes("red") && rowMoventForRed && colMovement) {
    if (actualBoard[coordinates[0][0] - 1][coordinates[0][1] - 1].includes("blue")) {
      return "red-left";
    }
    return "not apply";
  }
};

/**
 * Called when the user clicks on the "restart" button
 */
export function onRestart() {
  setWinner(undefined);
  setTurn("blue");
  resetBoard();
}
