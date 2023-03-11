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
      if (checkMovement(pieceToMove) === "allowed") {
        setTile(row, column, pieceToMove);
        turn = turn === "blue" ? "red" : "blue";
        setTurn(turn);
      } else if (checkMovement(pieceToMove) === "not allowed") {
        setTile(coordinates[0][1], coordinates[0][0], pieceToMove);
        setPieceToMove("none");
        return;
      }
    }
  }
}

const checkMovement = (pieceToMove: TileOwner) => {
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

/**
 * Called when the user clicks on the "restart" button
 */
export function onRestart() {
  setWinner(undefined);
  setTurn("blue");
  resetBoard();
}
