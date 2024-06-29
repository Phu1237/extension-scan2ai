import dragAndDrop from "./drag-n-drop";
import clickToStartAndEnd from "./click-to-start-n-end";

/**
 * Mode 1: Click and hold
 * Mode 2: Click to start and click to end
 */
export default function () {
  return {
    selectingDragAndDrop: dragAndDrop,
    selectingClickToStartAndEnd: clickToStartAndEnd
  }
}
