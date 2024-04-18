import React, { FC } from 'react'
import img from '/public/images/team-image.png'
import classes from './artists.module.scss'

interface ArtistsProps {
  artists: string[]
}

export const Artists: FC<ArtistsProps> = ({ artists }) => {
  const setClassNameForName = (index: number): string => {
    let className = classes.name;
    index === 0 || index === 5 || index === 8 ?
    (className += ' ' + classes.left_center) :
    index === 1 || index === 4 || index === 7 ?
    (className += ' ' + classes.left) :
    index === 2 || index === 9 ?
    (className += ' ' + classes.right_name) :
    index === 3 || index === 6 ?
    (className += ' ' + classes.right_center) :
    className;
    return className;
  };
  
    
  return (
    <div className={classes.team}>
      <div className={classes.title_container}>
        <h1 className={classes.title}>Команда</h1>
      </div>

      <div className={classes.image_container}>
        <img className={classes.image} src={img.src} alt="image" />
      </div>

      <div className={classes.list_container}>
        <div className={classes.list}>
          {
            artists.map((item, index) => {
              return(
                <div className={classes.item} key={index}>
                  <div className={setClassNameForName(index)}>{item}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}