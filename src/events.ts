import { Player, TileOwner } from "./types";
import {
  scores,
  coordinates,
  changeCoordinates,
  checkSimpleMovement,
  checkLeftKillingMovement,
  checkRightKillingMovement,
} from "./controllers/logic";
import {
  setTile,
  setTurn,
  setWinner,
  setPieceToMove,
  setStartingPoint,
  resetBoard,
} from "./UI/state";

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
  console.log(
    `CLICK INFO row: ${row} column: ${column} owner: ${owner} to move: ${pieceToMove}`
  );

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
      checkMovement(pieceToMove, actualBoard, row, column, turn);
    }
  }

  checkWinner();
}

const checkMovement = (
  pieceToMove: TileOwner,
  actualBoard: TileOwner[][],
  row: number,
  column: number,
  turn: Player
) => {
  let simpleMovement = checkSimpleMovement(pieceToMove);
  let rightKillingMovement = checkRightKillingMovement(actualBoard,pieceToMove);
  let leftKillingMovement = checkLeftKillingMovement(actualBoard, pieceToMove);

  if (simpleMovement === "allowed") {
    setTile(row, column, pieceToMove);
    turn = turn === "blue" ? "red" : "blue";
    setTurn(turn);
  } else if (rightKillingMovement === "blue-right") {
    killingMovement(row, column, pieceToMove, turn, +1, +1);
    scores.blue += 1;
  } else if (leftKillingMovement === "blue-left") {
    killingMovement(row, column, pieceToMove, turn, +1, -1);
    scores.blue += 1;
  } else if (rightKillingMovement === "red-right") {
    killingMovement(row, column, pieceToMove, turn, -1, +1);
    scores.red += 1;
  } else if (leftKillingMovement === "red-left") {
    killingMovement(row, column, pieceToMove, turn, -1, -1);
    scores.red += 1;
  } else {
    setTile(coordinates[0][1], coordinates[0][0], pieceToMove);
    setPieceToMove("none");
    return;
  }
};

const killingMovement = (
  row: number,
  column: number,
  pieceToMove: TileOwner,
  turn: Player,
  rowDirection: number,
  columDirection: number
) => {
  setTile(row, column, pieceToMove);
  setTile(
    coordinates[0][1] + rowDirection,
    coordinates[0][0] + columDirection,
    "none"
  );
  turn = turn === "blue" ? "red" : "blue";
  setTurn(turn);
};

const checkWinner = () => {
  if (scores.blue > scores.red) {
    console.log("GANA AZULLLLLL");
  } else if (scores.red > scores.blue) {
    console.log("GANA ROJOOOOOOO");
  } else {
    console.log("EMPATEEEEE");
  }
};

/**
 * Called when the user clicks on the "restart" button
 */
export function onRestart() {
  setWinner(undefined);
  setTurn("blue");
  resetBoard();
  scores.blue = 0;
  scores.red = 0;
}
