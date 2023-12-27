import { useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';
import { useKeyboard } from '../hooks/usekeyboard';
import { dirtImg, grassImg, glassImg, logImg, woodImg } from '../images/images';

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pressedTexture = Object.entries(textures).find(([_, val]) => val);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [dirt, grass, glass, wood, log, setTexture]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);
    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    visible && (
      <div className="absolute centered texture-selector">
        {Object.entries(images).map(([k, src]) => {
          return (
            <img
              key={k}
              src={src}
              alt={k}
              className={`${k === activeTexture ? 'active' : ''}`}
            />
          );
        })}
      </div>
    )
  );
};
