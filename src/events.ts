import { Player, TileOwner } from "./types";
import {
  checkLeftKillingMovement,
  checkRightKillingMovement,
  checkSimpleMovement,
} from "./controllers/logic";
import {
  setTile,
  setTurn,
  setWinner,
  setPieceToMove,
  setStartingPoint,
  resetBoard,
} from "./UI/state";

let scores = {
  red: 0,
  blue: 0,
};

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
      let simpleMovement = checkSimpleMovement(pieceToMove, coordinates);
      let rightKillingMovement = checkRightKillingMovement(actualBoard,pieceToMove,coordinates);
      let leftKillingMovement = checkLeftKillingMovement(actualBoard,pieceToMove,coordinates);

      if (simpleMovement === "allowed") {
        setTile(row, column, pieceToMove);
        turn = turn === "blue" ? "red" : "blue";
        setTurn(turn);
      } else if (rightKillingMovement === "blue-right") {
        setTile(row, column, pieceToMove);
        setTile(coordinates[0][1] + 1, coordinates[0][0] + 1, "none");
        scores.blue += 1;
        turn = turn === "blue" ? "red" : "blue";
        setTurn(turn);
      } else if (leftKillingMovement === "blue-left") {
        setTile(row, column, pieceToMove);
        setTile(coordinates[0][1] + 1, coordinates[0][0] - 1, "none");
        scores.blue += 1;
        turn = turn === "blue" ? "red" : "blue";
        setTurn(turn);
      } else if (rightKillingMovement === "red-right") {
        setTile(row, column, pieceToMove);
        setTile(coordinates[0][1] - 1, coordinates[0][0] + 1, "none");
        scores.red += 1;
        turn = turn === "blue" ? "red" : "blue";
        setTurn(turn);
      } else if (leftKillingMovement === "red-left") {
        setTile(row, column, pieceToMove);
        setTile(coordinates[0][1] - 1, coordinates[0][0] - 1, "none");
        scores.red += 1;
        turn = turn === "blue" ? "red" : "blue";
        setTurn(turn);
      } else {
        setTile(coordinates[0][1], coordinates[0][0], pieceToMove);
        setPieceToMove("none");
        return;
      }
    }
  }

  checkWinner();

}

const checkWinner = ()=>{
  if (scores.blue > scores.red) {
    console.log("GANA AZULLLLLL");
  } else if (scores.red > scores.blue) {
    console.log("GANA ROJOOOOOOO");
  } else {
    console.log("EMPATEEEEE");
  }
}

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
