import React, { FC } from 'react'
import cn from 'classnames'
import classes from './introSection.module.scss'
import { Link } from 'react-scroll';
import { IMenuItem } from 'shared/types/menu';
import { useWindowDimensions } from 'shared/hooks/useWindowDimensions';
import VideoMobile from '../VideoMobile/VideoMobile';
import VideoDesktop from '../VideoDesktop/VideoDesktop';

export interface IntroSectionProps {
  classNames?: string
  menu: Array<IMenuItem>
}

export const IntroSection: FC<IntroSectionProps> = ({ classNames, menu }) => {
  const { width: windowWidth } = useWindowDimensions()
  
  return (
    <div className={cn(classes.introSection, classNames)}>
      {
        windowWidth <= 1140 ? <VideoMobile/> : <VideoDesktop/>
      }
      <div className={classes.link_container}>

        {
          menu.map((item, index) => {
            return(
              <div key={index}>
                <Link smooth={true} duration={500} to={item.link}><span className={classes.link_item}>{item.name}</span></Link>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}
