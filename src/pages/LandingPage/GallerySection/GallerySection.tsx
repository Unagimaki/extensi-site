import { FC, Suspense, memo, useEffect, useMemo, useState } from "react";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

import s from "./gallerySection.module.scss";
import { Gallery } from "shared/types/gallery";

import { InView, useInView } from "react-intersection-observer";
import useViewportSizes from "use-viewport-sizes";
import Frames from "./components/Frames";
import {
  Bvh,
  Environment,
  MeshReflectorMaterial,
  Preload,
  PresentationControls,
  Stars,
  Text,
} from "@react-three/drei";
import CanvasLoader from "components/CanvasLoader/CanvasLoader";

interface GallerySectionProps {
  classNames?: string;
  images: Gallery[];
}

const DisableRender: FC = () => {
  useFrame(() => null, 0);
  return <></>;
};

export const GallerySection: FC<GallerySectionProps> = memo(({ images }) => {
  const [width] = useViewportSizes({ dimension: "w" });
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [loaderActive, setLoaderActive] = useState(true);

  useEffect(() => {
    if (inView) {
      const timeoutId = setTimeout(() => {
        if (loaderActive) {
          setLoaderActive(false);
        }
      }, 2500);

      return () => clearTimeout(timeoutId);
    }
  }, [inView, loaderActive]);

  return (
    <div id="gallerySection" className={s.gallerySection} ref={ref}>
      <div className={s.gallery}>
        <Canvas
          camera={{ fov: 70, position: [0, 2, 10] }}
          onCreated={({ gl, size, camera }) => {
            if (size.width < 600) {
              camera.position.z = 35;
            }
            gl.setClearColor(new THREE.Color("#020207"));
          }}
        >
          <Suspense fallback={loaderActive && <CanvasLoader />}>
            <Text
              fontSize={1}
              color={"#333333"}
              anchorX="center"
              anchorY="middle"
              position={[0, 2, -1]}
              font="/assets/fonts/Montserrat/Montserrat-Bold.ttf"
              >
              Кейсы
            </Text>

            <Bvh firstHitOnly>
              <PresentationControls
                enabled
                global
                speed={2}
                zoom={1}
                cursor={false}
                rotation={[0, 0, 0]}
              >
                {!inView ? (
                  <DisableRender />
                ) : (
                  <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                  />
                )}
                <group position={[0, -2, 0]}>
                  {!InView ? (
                    <DisableRender />
                  ) : (
                    <Frames gallery={images.slice(0, 20)} />
                  )}
                  <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[50, 50]} />

                    <MeshReflectorMaterial
                      mirror={0}
                      blur={[300, 100]}
                      mixBlur={1}
                      mixStrength={80}
                      roughness={1}
                      depthScale={1.2}
                      minDepthThreshold={0.4}
                      maxDepthThreshold={1.4}
                      color="#050505"
                      metalness={1}
                    />
                  </mesh>
                </group>
              </PresentationControls>
            </Bvh>
            <Preload all />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
});

GallerySection.displayName = "GallerySection";
