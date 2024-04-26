import { useAppDispatch } from 'shared/hooks/redux';
import classes from './videoDesktop.module.scss'
import { useRef } from 'react';
import { setShow, setVideoLoaded } from "store/slices/loading";

const VideoDesktop = () => {
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={classes.video_container}>
    <video
      autoPlay
      muted
      className={classes.video}
      loop
      controls={false}
      playsInline
      onCanPlayThrough={() => {
        console.log("can play");
        videoRef.current?.play();
        dispatch(setVideoLoaded(true));
      }}
    >
        <source src='/videos/introsectionvid_desktop.mp4' type="video/mp4"/>
      </video>
    </div>

  )
}

export default VideoDesktop