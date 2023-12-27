export type Cube = {
  key: string;
  pos: [number, number, number];
  texture: string;
};

export type MinecraftStore = {
  texture: string;
  cubes: Cube[];
};

export type MinecraftActions = {
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
  setTexture: (texture: string) => void;
  saveWorld: (cubes: unknown[]) => void;
  resetWorld: () => void;
};
