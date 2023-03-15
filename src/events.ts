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

  checkWinner(actualBoard);
}

const checkMovement = (
  pieceToMove: TileOwner,
  actualBoard: TileOwner[][],
  row: number,
  column: number,
  turn: Player
) => {
  let simpleMovement = checkSimpleMovement(pieceToMove);
  let rightKillingMovement = checkRightKillingMovement(actualBoard, pieceToMove);
  let leftKillingMovement = checkLeftKillingMovement(actualBoard, pieceToMove);

  if (simpleMovement === "allowed") {
    setTile(row, column, pieceToMove);
    turn = turn === "blue" ? "red" : "blue";
    setTurn(turn);
  } else if (rightKillingMovement === "blue-right") {
    killingMovement(actualBoard, row, column, pieceToMove, turn, +1, +1);
    scores.blue += 1;
  } else if (leftKillingMovement === "blue-left") {
    killingMovement(actualBoard, row, column, pieceToMove, turn, +1, -1);
    scores.blue += 1;
  } else if (rightKillingMovement === "blue-queen-right-back") {
    killingMovement(actualBoard, row, column, pieceToMove, turn, -1, +1);
    scores.blue += 1;
  } else if (leftKillingMovement === "blue-queen-left-back") {
    killingMovement(actualBoard, row, column, pieceToMove, turn, -1, -1);
    scores.blue += 1;
  } else if (rightKillingMovement === "red-right") {
    killingMovement(actualBoard, row, column, pieceToMove, turn, -1, +1);
    scores.red += 1;
  } else if (leftKillingMovement === "red-left") {
    killingMovement(actualBoard, row, column, pieceToMove, turn, -1, -1);
    scores.red += 1;
  } else if (rightKillingMovement === "red-queen-right-forward") {
    killingMovement(actualBoard, row, column, pieceToMove, turn, +1, +1);
    scores.red += 1;
  } else if (leftKillingMovement === "red-queen-left-forward") {
    killingMovement(actualBoard, row, column, pieceToMove, turn, +1, -1);
    scores.red += 1;
  } else {
    setTile(coordinates[0][1], coordinates[0][0], pieceToMove);
    setPieceToMove("none");
    return;
  }
};

const killingMovement = (
  actualBoard: TileOwner[][],
  row: number,
  column: number,
  pieceToMove: TileOwner,
  turn: Player,
  rowDirection: number,
  columDirection: number
) => {
  setTile(row, column, pieceToMove);

  let pieceToKill =
    actualBoard[coordinates[0][0] + columDirection][coordinates[0][1] + rowDirection];

  actionIfQueenIsKilled(actualBoard, pieceToKill);

  setTile(coordinates[0][1] + rowDirection, coordinates[0][0] + columDirection, "none");

  turn = turn === "blue" ? "red" : "blue";
  setTurn(turn);
};

const actionIfQueenIsKilled = (
  actualBoard: TileOwner[][],
  pieceToKill: string
) => {
  if (pieceToKill.includes("blue queen")) {
    let queen = 0;

    for (let ic = 0; ic < 8; ic++) {
      for (let ir = 0; ir < 8; ir++) {
        if (queen < 1 && actualBoard[ic][ir] === "blue pawn") {
          setTile(ir, ic, "blue queen");
          queen++;
        }
      }
    }
  }

  if (pieceToKill.includes("red queen")) {
    let queen = 0;

    for (let ic = 0; ic < 8; ic++) {
      for (let ir = 0; ir < 8; ir++) {
        if (queen < 1 && actualBoard[ic][ir] === "red pawn") {
          setTile(ir, ic, "red queen");
          queen++;
        }
      }
    }
  }
};

const checkWinner = (actualBoard: TileOwner[][]) => {
  for (let ic = 0; ic < 8; ic++) {
    for (let ir = 0; ir < 8; ir++) {
      if (actualBoard[ic][0] === "red queen" && scores.red > scores.blue) {
        setWinner("red");
      }
      if (actualBoard[ic][7] === "blue queen" && scores.blue > scores.red) {
        setWinner("blue");
      }
    }
  }
};

export function onRestart() {
  setWinner(undefined);
  setTurn("blue");
  resetBoard();
  scores.blue = 0;
  scores.red = 0;
}
