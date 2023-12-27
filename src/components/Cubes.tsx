import { useStore } from '../hooks/useStore';
import { Cube } from '../types/minecraft';
import { Cube as CubeComponent } from './Cube';

export const Cubes = () => {
  const [cubes] = useStore((state) => [state.cubes]);

  return cubes.map(({ key, pos, texture }: Cube) => {
    return <CubeComponent key={key} position={pos} texture={texture} />;
  });
};
