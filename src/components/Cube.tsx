import { useBox } from '@react-three/cannon';
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from 'three';
import * as textures from '../images/textures';
import { useStore } from '../hooks/useStore';
import { useState } from 'react';

export const Cube = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref] = useBox<
    Mesh<
      BufferGeometry<NormalBufferAttributes>,
      Material | Material[],
      Object3DEventMap
    >
  >(() => ({
    type: 'Static',
    position,
  }));

  const activeTexture = textures[texture + 'Texture'];
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  return (
    <mesh
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        const clickFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current.position;
        if (e.altKey) {
          removeCube(x, y, z);
          return;
        }
        if (clickFace === 0) {
          addCube(x + 1, y, z);
          return;
        } else if (clickFace === 1) {
          addCube(x - 1, y, z);
          return;
        } else if (clickFace === 2) {
          addCube(x, y + 1, z);
          return;
        } else if (clickFace === 3) {
          addCube(x, y - 1, z);
          return;
        } else if (clickFace === 4) {
          addCube(x, y, z + 1);
          return;
        } else if (clickFace === 5) {
          addCube(x, y, z - 1);
          return;
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? 'gray' : 'white'}
        map={activeTexture}
        transparent={true}
        opacity={activeTexture === 'glass' ? 0.6 : 1}
        attach="material"
      />
    </mesh>
  );
};
