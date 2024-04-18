import { Button } from 'components'
import React, { FC, useState } from 'react'
import img from '/public/images/team-image.png'
import classes from './artists.module.scss'

interface ArtistsProps {
  artists: string[]
}

export const Artists: FC<ArtistsProps> = ({ artists }) => {
  const [state, setState] = useState(false)

  const handleAddArtists = () => {
    setState(() => !state)
  }

  const setClassNameForName = (index: number): string => {
    let className = classes.name;
    index === 0 || index === 5 || index === 8 ?
    (className += ' ' + classes.left_center) :
    index === 1 || index === 4 || index === 7 ?
    (className += ' ' + classes.left) :
    index === 2 ?
    (className += ' ' + classes.right_name) :
    index === 3 || index === 6 ?
    (className += ' ' + classes.right_center) :
    className;
    return className;
  };
  
  // const setClassNameForNumber = (index: number): string => {
  //   let className = classes.number;
  //   index === 0 || index === 5 || index === 8
  //     ? (className += ' ' + classes.left)
  //     : index === 1 || index === 6
  //     ? (className += ' ' + classes.right)
  //     : index === 3
  //     ? (className += ' ' + classes.left_number)
  //     : index === 4
  //     ? (className += ' ' + classes.right_number)
  //     : index === 2 || index === 7
  //     ? (className += ' ' + classes.center_number)
  //     : className;
  //   return className;
  // };
  let filteredArtists = !state ? artists.slice(0, -2) : artists.filter((item, index) => index !== 7 && index !== 8)
    
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
            filteredArtists.map((item, index) => {
              return(
                <div className={classes.item} key={index}>
                  {/* <div className={setClassNameForNumber(index)}>
                    {
                      index === 0 || index === 1 || index === 2 || index === 3 ? '(co-founder)' :
                      (state && index === 7 || state && index === 8) ? `(${index + 3})` : `(0${index + 1})`
                    }
                  </div> */}
                  <div className={setClassNameForName(index)}>{item}</div>
                </div>
              )
            })
          }
        </div>
          <Button classNames={classes.button} variant='black' onClick={handleAddArtists} />
      </div>
    </div>
  )
}