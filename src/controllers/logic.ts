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

const isMovementForward = (positions: number) => {
  return coordinates[1][1] === coordinates[0][1] + positions;
};

const isMovementBackwards = (positions: number) => {
  return coordinates[1][1] === coordinates[0][1] - positions;
};

export const checkSimpleMovement = (pieceToMove: TileOwner) => {
  let colMovement =
    coordinates[1][0] === coordinates[0][0] + 1 ||
    coordinates[1][0] === coordinates[0][0] - 1;

  let rowMovementForward = isMovementForward(1);
  let rowMovementBackwards = isMovementBackwards(1);

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

const isColorInPosition = (
  actualBoard: TileOwner[][],
  columDirection: number,
  rowDirection: number,
  colorToCheck: string
) => {
  return actualBoard[coordinates[0][0] + columDirection][coordinates[0][1] + rowDirection].includes(`${colorToCheck}`);
};

export const checkRightKillingMovement = (
  actualBoard: TileOwner[][],
  pieceToMove: TileOwner
) => {
  let colMovement = coordinates[1][0] === coordinates[0][0] + 2;
  let rowMovementForward = isMovementForward(2);
  let rowMovementBackwards = isMovementBackwards(2);

  if (pieceToMove.includes("blue pawn") && colMovement) {
    if (rowMovementForward && isColorInPosition(actualBoard, 1, 1, "red")) {
      return "blue-right";
    }
    return "not apply";
  }

  if (pieceToMove.includes("red pawn") && colMovement) {
    if (rowMovementBackwards && isColorInPosition(actualBoard, 1, -1, "blue")) {
      return "red-right";
    }
    return "not apply";
  }

  if (pieceToMove.includes("blue queen") && colMovement) {
    if (rowMovementForward && isColorInPosition(actualBoard, 1, 1, "red")) {
      return "blue-right";
    }

    if (rowMovementBackwards && isColorInPosition(actualBoard, 1, -1, "red")) {
      return "blue-queen-right-back";
    }

    return "not apply";
  }

  if (pieceToMove.includes("red queen") && colMovement) {
    if (rowMovementForward && isColorInPosition(actualBoard, 1, 1, "blue")) {
      return "red-queen-right-forward";
    }

    if (rowMovementBackwards && isColorInPosition(actualBoard, 1, -1, "blue")) {
      return "red-right";
    }

    return "not apply";
  }
};

export const checkLeftKillingMovement = (
  actualBoard: TileOwner[][],
  pieceToMove: TileOwner
) => {
  let colMovement = coordinates[1][0] === coordinates[0][0] - 2;
  let rowMovementForward = isMovementForward(2);
  let rowMovementBackwards = isMovementBackwards(2);

  if (pieceToMove.includes("blue pawn") && colMovement) {
    if (rowMovementForward && isColorInPosition(actualBoard, -1, 1, "red")) {
      return "blue-left";
    }
    return "not apply";
  }

  if (pieceToMove.includes("red pawn") && colMovement) {
    if (rowMovementBackwards && isColorInPosition(actualBoard, -1, -1, "blue")) {
      return "red-left";
    }
    return "not apply";
  }

  if (pieceToMove.includes("blue queen") && colMovement) {
    if (rowMovementForward && isColorInPosition(actualBoard, -1, 1, "red")) {
      return "blue-left";
    }

    if (rowMovementBackwards && isColorInPosition(actualBoard, -1, -1, "red")) {
      return "blue-queen-left-back";
    }

    return "not apply";
  }

  if (pieceToMove.includes("red queen") && colMovement) {
    if (rowMovementForward && isColorInPosition(actualBoard, -1, 1, "blue")) {
      return "red-queen-left-forward";
    }

    if (rowMovementBackwards && isColorInPosition(actualBoard, -1, -1, "blue")) {
      return "red-left";
    }

    return "not apply";
  }
};
