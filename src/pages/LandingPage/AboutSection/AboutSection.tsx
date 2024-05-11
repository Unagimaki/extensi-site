import {
  Dispatch,
  FC,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react'
import cn from 'classnames'

import s from './aboutSection.module.scss'
import { Canvas } from '@react-three/fiber'
import { Environment, Preload, useProgress } from '@react-three/drei'
import CameraRig from './ThreeDElements/CameraRig'
import ThreeDImages from './ThreeDElements/ThreeDImages'
import { useWindowDimensions } from 'shared/hooks/useWindowDimensions'
import { MyButton } from 'components/myButton/myButton'
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux'
import { setModelsLoaded } from 'store/slices/loading'

export interface AboutSectionProps {
  classNames?: string
    setIsDescriptionHidden: Dispatch<SetStateAction<boolean>>
    isDescriptionHidden: boolean
}

const CanvasLoader: FC<{
  onChangeProgress?: (progress: number, item: string) => void
}> = ({ onChangeProgress }) => {
  const { item, progress } = useProgress()
  useEffect(() => {
    onChangeProgress?.(progress, item)
  }, [item, progress])
  return <></>
}

export const AboutSection: FC<AboutSectionProps> = ({
  classNames,
  setIsDescriptionHidden,
  isDescriptionHidden,
}) => {
  const { width: windowWidth } = useWindowDimensions()
  const sectionRef = useRef<HTMLElement>()
  const changeVisible = () => { setIsDescriptionHidden(!isDescriptionHidden) }
  const dispatch = useAppDispatch()

  return (
    <div className={cn(s.aboutSection, classNames)}>
      <div className={s.canvas}>
        <Canvas
          camera={{ position: [0, 0, 0], fov: 100 }}
          className={s.canvas}
          gl={{ preserveDrawingBuffer: true }}
          eventSource={sectionRef?.current}
          eventPrefix='client'
        >
          <Suspense
            fallback={
              <CanvasLoader
                onChangeProgress={progress => {
                  console.log(progress);
                  // setTimeout(() => {dispatch(setModelsLoaded(true)), alert('loaded timeout')}, 9000)

                  if (progress >= 99) {
                    console.log('loaded');
                    
                    setTimeout(() => {dispatch(setModelsLoaded(true))}, 2000) 
                    alert('loaded')
                  }
                }}
              />
            }
          >
            <CameraRig targetPosition={[-1, 0, 2]}>
              <ThreeDImages
                gltfPath='3d_about_pic1.glb'
                position={
                  windowWidth <= 425 && windowWidth > 320 ? [-0.4, 0.6, -0.2] : windowWidth <= 320 ? [-0.5, 0.5, -0.2] : [-0.3, 0.8, -0.2] 
                }
                rotation={[-0.1, 0, -0.1]}
              />
              <ThreeDImages
                gltfPath='3d_about_pic2.gltf'
                position={
                  windowWidth <= 425 ? [-2.4, -1.25, -1] : [-2.6, -1.25, -1] 
                }
                rotation={[0, 0, 0.2]}
              />
              <ThreeDImages
                gltfPath='3d_about_pic3.glb'
                position={
                  windowWidth <= 320 ? [-0.1, -1, 0.2] : [-0, -1.1, 0.2] 
                }
                rotation={[0, 0, 0.2]}
              />
            </CameraRig>
            <Environment preset='city' />
            <Preload all={true}/>
          </Suspense>
        </Canvas>
      </div>
      <div className={s.container}>
        <h1 className={s.title}>О нас</h1>
        <div className={s.stroke_container}>
          <div className={s.stroke}>Эксперты</div>
          <div className={s.stroke}>в рекламных <span className={s.stroke_span}>проектах</span></div>
          <div className={s.stroke}>для брендов <span className={s.stroke_span}>на стыке</span></div>
          <div className={s.stroke}>маркетинга, IT разработки</div>
          <div className={s.stroke}>и развлечений.</div>
          <div className={s.stroke}>Мы предлагаем</div>
          <div className={s.stroke}>актуальные</div>
          <div className={s.stroke}>диджитал</div>
          <div className={s.stroke}>решения</div>
        </div>
          <MyButton classNames={s.button} onClick={changeVisible}/>
      </div>
    </div>
  )
}
