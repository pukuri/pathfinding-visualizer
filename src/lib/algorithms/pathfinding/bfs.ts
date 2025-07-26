import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual } from "../../../utils/helpers";
import { isInQueue } from "../../../utils/isInQueue";
import type { GridType, TileType } from "../../../utils/types";

export const bfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
  const traversedTiles: TileType[] = [];
  const base = grid[startTile.row][startTile.col]
  base.distance = 0
  base.isTraversed = true
  const unTraversed = [base]

  while (unTraversed.length) {
    const tile = unTraversed.shift()!
    if (tile.isWall) continue
    if (tile.distance === Infinity) break
    tile.isTraversed = true
    traversedTiles.push(tile)
    if (isEqual(tile, endTile)) break;

    const neighbors = getUntraversedNeighbors(grid, tile);
    for (let i = 0; i < neighbors.length; i += 1) {
      if (!isInQueue(neighbors[i], unTraversed)) {
        const nei = neighbors[i]; 
        nei.distance = tile.distance + 1; 
        nei.parent = tile;
        unTraversed.push(nei); 
      }
    }
  }

  const path = []; 
  let tile = grid[endTile.row][endTile.col]; 
  while (tile !== null) {
    tile.isPath = true;
    path.unshift(tile);
    tile = tile.parent!;
  }

  return { traversedTiles, path }; 
}