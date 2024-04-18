/* eslint-disable jsx-a11y/alt-text */

import * as THREE from "three";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";

import { Center, Image, Text } from "@react-three/drei";
import { useAppSelector } from "shared/hooks/redux";
import { Gallery } from "shared/types/gallery";

import getUuid from "uuid-by-string";
import { extend, useFrame } from "@react-three/fiber";

import { easing } from "maath";
import { getPositionAndRotation, splitArray } from "./galleryHelpers";

interface FrameProps {
  url: string[];
  c?: any;
  index: number;
  gallery: Gallery[];
  backImage: string;
}

const GOLDENRATIO = 1.61803398875;

const Frame: FC<FrameProps> = memo(
  ({ url, c = new THREE.Color(), gallery, index, backImage }) => {
    const defaults = [0.25, 0.3, 0.15, 0.35, 0.5, 0.25, 0.3, 0.15];
    const image = useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[],
        THREE.Object3DEventMap
      >
    >(null);

    const frame = useRef<any>(null);

    const galleryDatas = useAppSelector((state) => state.gallery);
    
    const [rotation, setRotation] = useState<[number, number, number]>([
      0,
      0,
      0,
    ]);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [clicked, setClicked] = useState(false);
    const [rnd] = useState(() => Math.random());
    const [defaultRandom] = useState<number>(
      defaults[Math.floor(Math.random() * defaults.length)]
    );

    const currentImage = url?.[currentImageIndex];

    const name = getUuid(`${gallery?.[index]?.id}`);
    const isActive = galleryDatas.id === name;
    const text = gallery?.[index - 1]?.name;

    const rotationFunc = useCallback(() => {
      if (!isActive || !clicked) {
        return setRotation(() => [0, 0, 0]);
      }
      if (clicked && rotation[1] > -2.99) {
        setRotation(() => [0, rotation[1] - 0.08, 0]);
      }
    }, [clicked, isActive, rotation]);

    useFrame((state, dt) => {
      if (image.current) {
        const imageWidth = image.current.visible;
        const imageHeight = image.current.userData.height;
        rotationFunc();
        easing.damp3(image?.current?.scale, [1.4, 1, 1], 0.15, dt);
        easing.damp3(frame?.current?.scale, [1.4, 1, 0.9], 0.15, dt);
      }
    });

    useEffect(() => {
      setTimeout(() => setClicked(true), 2000)
      
      const func = () => {
        if (!isActive) {
          return setClicked(() => false);
        }
        return setRotation(() => [0, 0, 0]);
      };
      return () => func();

    }, [isActive, setClicked, clicked]);

    const { left, center, right } = splitArray(gallery);

    return (
      <group
        position={
          getPositionAndRotation(index, { center, left, right }, defaultRandom)
            ?.position
        }
        rotation={
          getPositionAndRotation(index, { center, left, right }, defaultRandom)
            ?.rotation
        }
      >
        <mesh
          name={name}
          onPointerEnter={(e) => {
            e.stopPropagation();
            if (isActive) {
              if (currentImageIndex !== url.length - 1) {
                return setCurrentImageIndex(() => 1);
              }
              return setCurrentImageIndex(() => 0);
            }
          }}
          onPointerDown={() => {
            if (isActive) {
              setClicked(() => true);
            }
          }}
          onPointerOut={() => {
            setCurrentImageIndex(() => 0);
            if (!isActive) {
              setClicked(() => false);
            }
          }}
          scale={[0.7, GOLDENRATIO, 0.05]}
          // scale={[0.7, 2, 0.05]}
          rotation={rotation}
          position={[0, 1, -0.4]}
        >
          <boxGeometry />
          <meshStandardMaterial
            color="#151515"
            metalness={0.5}
            roughness={0.5}
            envMapIntensity={2}
          />
          <mesh
            ref={frame}
            raycast={() => null}
            scale={[0.9, 0.93, 0.9]}
            position={[0, 0, 0.2]}
          >
            <boxGeometry />
            <meshStandardMaterial
              color="#151515"
              metalness={0.5}
              roughness={0.5}
              envMapIntensity={2}
            />
          </mesh>
          <mesh
            raycast={() => null}
            scale={[2.3, 1, 1]}
            position={[0, 0, 0.2]}
            
          >
          <Image
            ref={image}
            raycast={() => null}
            rotation={[0, -3, 0]}
            position={[0, 0, -1]}
            url={backImage}
            scale={[0.6, 1]}
          />
          </mesh>

          <Image
            raycast={() => null}
            ref={image}
            position={[0, 0, 0.7]}
            url={currentImage}
            scale={[-1.2, -2]}
          />
        </mesh>
      </group>
    );
  }
);

Frame.displayName = "Frame";

export default Frame;
