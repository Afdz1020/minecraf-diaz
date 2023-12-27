import { usePlane } from '@react-three/cannon';
import { groundTexture } from '../images/textures';
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from 'three';
import { useStore } from '../hooks/useStore';

export const Ground = () => {
  const [ref] = usePlane<
    Mesh<
      BufferGeometry<NormalBufferAttributes>,
      Material | Material[],
      Object3DEventMap
    >
  >(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  const [addCube] = useStore((state) => [state.addCube]);

  groundTexture.repeat.set(100, 100);

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val));
        addCube(x, y, z);
      }}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};
