import { TileOwner } from "../types";

export let scores = {
  red: 0,
  blue: 0,
};

export let coordinates = [
  [0, 0],
  [0, 0],
];

export const changeCoordinates = (
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

export const checkSimpleMovement = (pieceToMove: TileOwner) => {
  let colMovement =
    coordinates[1][0] === coordinates[0][0] + 1 ||
    coordinates[1][0] === coordinates[0][0] - 1;

  let rowMovementForward = coordinates[1][1] === coordinates[0][1] + 1;
  let rowMovementBackwards = coordinates[1][1] === coordinates[0][1] - 1;

  if (pieceToMove.includes("blue pawn") && rowMovementForward && colMovement) {
    return "allowed";
  }

  if (pieceToMove.includes("red pawn") && rowMovementBackwards && colMovement) {
    return "allowed";
  }

  if (pieceToMove.includes("queen") && colMovement) {
    if (rowMovementForward || rowMovementBackwards) {
      return "allowed";
    }
  }

  return "not allowed";
};

export const checkRightKillingMovement = (
  actualBoard: TileOwner[][],
  pieceToMove: TileOwner
) => {
  let colMovement = coordinates[1][0] === coordinates[0][0] + 2;
  let rowMovementForward = coordinates[1][1] === coordinates[0][1] + 2;
  let rowMovementBackwards = coordinates[1][1] === coordinates[0][1] - 2;

  if (pieceToMove.includes("blue pawn") && rowMovementForward && colMovement) {
    if (actualBoard[coordinates[0][0] + 1][coordinates[0][1] + 1].includes("red")) {
      return "blue-right";
    }
    return "not apply";
  }

  if (pieceToMove.includes("red pawn") && rowMovementBackwards && colMovement) {
    if (actualBoard[coordinates[0][0] + 1][coordinates[0][1] - 1].includes("blue")) {
      return "red-right";
    }
    return "not apply";
  }

  if (pieceToMove.includes("blue queen") && colMovement) {
    if (rowMovementForward && actualBoard[coordinates[0][0] + 1][coordinates[0][1] + 1].includes("red")) {
      return "blue-right";
    }

    if (rowMovementBackwards && actualBoard[coordinates[0][0] + 1][coordinates[0][1] - 1].includes("red")) {
      return "blue-right-back";
    }

    return "not apply";
  }
};

export const checkLeftKillingMovement = (
  actualBoard: TileOwner[][],
  pieceToMove: TileOwner
) => {
  let colMovement = coordinates[1][0] === coordinates[0][0] - 2;
  let rowMovementForward = coordinates[1][1] === coordinates[0][1] + 2;
  let rowMovementBackwards = coordinates[1][1] === coordinates[0][1] - 2;

  if (pieceToMove.includes("blue pawn") && rowMovementForward && colMovement) {
    if (actualBoard[coordinates[0][0] - 1][coordinates[0][1] + 1].includes("red")) {
      return "blue-left";
    }
    return "not apply";
  }

  if (pieceToMove.includes("red pawn") && rowMovementBackwards && colMovement) {
    if (actualBoard[coordinates[0][0] - 1][coordinates[0][1] - 1].includes("blue")) {
      return "red-left";
    }
    return "not apply";
  }
};
