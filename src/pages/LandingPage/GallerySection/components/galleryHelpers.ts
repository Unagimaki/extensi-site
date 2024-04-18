import { Gallery } from "shared/types/gallery";

type TPositionsName = "center" | "left" | "right";

type TPositions = Record<TPositionsName, Gallery[]>;

export const findIndex = (arr: Gallery[], id: number | string) =>
  arr.findIndex((item) => item.id === id);

export function splitArray(array: Gallery[]): TPositions {
  const centerSize = 8; // Размер центральной части
  const chunkSize = Math.floor((array.length - centerSize) / 2); // Размер каждой из оставшихся частей

  const left = array.slice(0, chunkSize);
  const center = array.slice(chunkSize, chunkSize + centerSize);
  const right = array.slice(chunkSize + centerSize);

  return { left, center, right };
}

export const getPositionAndRotation = (
  id: number | string,
  {
    left,
    center,
    right,
  }: { left: Gallery[]; center: Gallery[]; right: Gallery[] },
  defaultRandom: number
): {
  position: [number, number, number];
  rotation: [number, number, number];
} => {
  const leftIndex = findIndex(left, id) + 1 || findIndex(left, id);
  const centerIndex = findIndex(center, id) + 1 || findIndex(center, id);
  const rightIndex = findIndex(right, id) + 1 || findIndex(right, id);

  if (leftIndex !== -1) {
    if (leftIndex % 2 === 0) {
      return {
        position: [-((leftIndex + 3.5) * 0.46), 1.25, (leftIndex - 5) * 0.4],
        rotation: [0, Math.PI / 6, 0],
      };
    }

    return {
      position: [-(((leftIndex + 5) / 1.5) * 0.6), 0, (leftIndex - 2) * 0.4],
      rotation: [0, Math.PI / 6, 0],
    };
  } else if (rightIndex !== -1) {
    if (rightIndex % 2 === 0) {
      return {
        position: [(rightIndex + 6) * 0.46, 1.25, (rightIndex - 4) * 0.4],
        rotation: [0, -(Math.PI / 4), 0],
      };
    }
    return {
      position: [((rightIndex + 7) / 1.5) * 0.6, 0, (rightIndex - 2) * 0.4],
      rotation: [0, -(Math.PI / 6), 0],
    };
  } else if (centerIndex !== -1) {
    if (centerIndex % 2 === 0) {
      return {
        position: [((centerIndex - 4) / 2) * 1.2, 1.25, -3.5],
        rotation: [0, 0, 0],
      };
    }
    return {
      position: [((centerIndex - 2) / 2) * 1.2, 0, -2.5],
      rotation: [0, 0, 0],
    };
  }
  return {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  };
};
