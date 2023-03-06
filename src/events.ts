// SE PUEDE MODIFICAR

import { Player, TileOwner } from "./types";
import { setTile, setTurn, setWinner, resetBoard } from "./UI/state";

let turn: Player = "blue";

/**
 * Called when the user clicks on a tile
 * @param row of the clicked tile
 * @param column of the clicked tile
 * @param owner of the clicked tile
 */
export function onTileClick(row: number, column: number, owner: TileOwner) {
  console.log(`row: ${row} column: ${column} owner: ${owner}`);
  setTile(row, column, "none");
  setWinner(undefined); //MODIFICAR depende de quien alcanza la mayoria de fichas en el otro lado del tablero
  turn = turn === "blue" ? "red" : "blue";
  setTurn(turn);
}

/**
 * Called when the user clicks on the "restart" button
 */
export function onRestart() {
  setWinner(undefined);
  setTurn(undefined);
  resetBoard();
}
