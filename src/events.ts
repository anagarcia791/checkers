import { Player, TileOwner } from "./types";
import {
  setTile,
  setTurn,
  setWinner,
  setPieceToMove,
  resetBoard,
} from "./UI/state";

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
  pieceToMove: TileOwner
) {
  console.log(`CLICK INFO row: ${row} column: ${column} owner: ${owner}`);

  if (owner.includes(turn) || pieceToMove.includes(turn)) {
    setPieceToMove(owner);
    setTile(row, column, "none");
    
    if (owner === "none") {
      setTile(row, column, pieceToMove);
      turn = turn === "blue" ? "red" : "blue";
      setTurn(turn);
    }
  }
}

/**
 * Called when the user clicks on the "restart" button
 */
export function onRestart() {
  setWinner(undefined);
  setTurn("blue");
  resetBoard();
}
