import classes from './galleryPage.module.scss'
import { Button } from 'components'
import { teamGallery } from 'data/teamGallery';
import { useEffect, useState } from 'react'


export const GalleryPage = () => {
  const [windiwWidth, setWindowWidth] = useState<boolean>(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth <= 425);
    const handleResize = () => {
      setWindowWidth(window.innerWidth <= 425);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>



        <div className={classes.header}>
        <div className={classes.text}>
          Реклама, лидеры мнений, современное искусство, стриминговые платформы, виртуальная реальность, медиа, свобода, киберспорт, контент, геймификация, цифровое искусство, метавселенные, дизайн, CG, motion, продвижение, разработка
        </div>
        <div className={classes.text}>
          Мода, стиль, технологии, влияние, тренды, самовыражение, культура, диджитал, индивидуальность, сообщество, творчество, музыка, вдохновение, бренды, креатив
        </div>
          <h1 className={classes.title}>Галерея</h1>
          <h2 className={classes.subTitle}>
            Знакомимся ближе
          </h2>
        </div>

        <div className={windiwWidth ? classes.images_column : classes.images_container}>
            {
              teamGallery.map(item => { 
                return(
                  <div className={!windiwWidth ? classes.image_container : classes.image_column} key={item.id}>
                    {
                      !windiwWidth && item.src ?
                      ( <img src={item.src} alt='image' className={classes.image} />) : !windiwWidth && !item.src ?
                      ( <div className={classes.image} style={{backgroundColor: '#fff'}}/> ) : windiwWidth && item.src ?
                      ( <img src={item.src} alt='image' className={classes.image} />) : null
                    }
                  </div>
                ) 
              })
            }
          </div>

        <div className={classes.button_container}>
          {/* <Button
            variant='black'
          /> */}
        </div>

      </div>
    </div>
  )
}