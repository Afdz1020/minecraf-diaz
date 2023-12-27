import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { MinecraftActions, MinecraftStore } from '../types/minecraft';

type Store = MinecraftStore & MinecraftActions;

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const useStore = create<Store>((set) => ({
  texture: 'dirt',
  cubes: getLocalStorage('cubes') || [],
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prev.texture,
        },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: (cubes) => {
    setLocalStorage('cubes', cubes);
    // //set((prev) => {
    //   return setLocalStorage('cubes', prev.cubes);
    // });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
