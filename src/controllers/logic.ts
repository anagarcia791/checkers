import { TileOwner } from "../types";

export const checkSimpleMovement = (
  pieceToMove: TileOwner,
  coordinates: number[][]
) => {
  let colMovement =
    coordinates[1][0] === coordinates[0][0] + 1 ||
    coordinates[1][0] === coordinates[0][0] - 1;

  let rowMoventForBlue = coordinates[1][1] === coordinates[0][1] + 1;
  let rowMoventForRed = coordinates[1][1] === coordinates[0][1] - 1;

  if (pieceToMove.includes("blue") && rowMoventForBlue && colMovement) {
    return "allowed";
  }

  if (pieceToMove.includes("red") && rowMoventForRed && colMovement) {
    return "allowed";
  }

  return "not allowed";
};

export const checkRightKillingMovement = (
  actualBoard: TileOwner[][],
  pieceToMove: TileOwner,
  coordinates: number[][]
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

export const checkLeftKillingMovement = (
  actualBoard: TileOwner[][],
  pieceToMove: TileOwner,
  coordinates: number[][]
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
