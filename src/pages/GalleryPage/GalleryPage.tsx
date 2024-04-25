import { MyButton } from 'components/myButton/myButton';
import classes from './galleryPage.module.scss'
import { teamGallery } from 'data/teamGallery';
import { teamGalleryMobile } from 'data/teamGallery-mobile';
import { useEffect, useState } from 'react'
import { TeamGallery } from 'shared/types/teamGallery';
import Link from 'next/link';


export const GalleryPage = () => {
  const [windowWidth, setWindowWidth] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(1)
  const [mobileArr, setMobileArr] = useState<TeamGallery[]>(teamGalleryMobile)

  const filteredMobileImages = () => {
    setMobileArr(teamGalleryMobile.slice(
      (currentIndex === 1)? 0 : (currentIndex === 2)? 5 : 10,
      (currentIndex === 1)? 5 : (currentIndex === 2)? 10 : 15
    ))
  }
  const changeCurrentIndex = () => { setCurrentIndex(currentIndex === 1 ? 2 : currentIndex === 2 ? 3 : 1) }
  
  const calcStyle = (id: number) => {
    let width = '44.69vw'
    if (currentIndex === 1) {
      width = (id === 1 || id === 2 || id === 3 ? '39.69vw' : '47.19vw')
    } else if (currentIndex === 2) {
      width = (id === 6 || id === 7 ? '46.56vw' : '38.75vw')
    }
    return width
  }
  useEffect(() => {
    filteredMobileImages()
    setWindowWidth(window.innerWidth <= 450)
    const handleResize = () => {
      setWindowWidth(window.innerWidth <= 450)
      filteredMobileImages()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [windowWidth, currentIndex]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.header}>
        <div className={windowWidth && currentIndex == 2 ? classes.hidden : classes.text}>
          Реклама, лидеры мнений, современное искусство, стриминговые платформы, виртуальная реальность, медиа, свобода, киберспорт, контент, геймификация, цифровое искусство, метавселенные, дизайн, CG, motion, продвижение, разработка
        </div>
        <div className={windowWidth && currentIndex !== 2 ? classes.hidden : classes.text}>
          Мода, стиль, технологии, влияние, тренды, самовыражение, культура, диджитал, индивидуальность, сообщество, творчество, музыка, вдохновение, бренды, креатив
        </div>
          <h1 className={classes.title}>Галерея</h1>
          <h2 className={classes.subTitle}>
            Знакомимся ближе
          </h2>
        </div>

        <div className={classes.images_container}>
            {
              windowWidth ? 
              mobileArr.map((item: TeamGallery, index) => {               
                return(
                  <Link key={item.id} href={`./gallery/${item.id}`}>
                    <img style={{width: `${calcStyle(item.id)}`}} src={item.src}/>
                  </Link>
                )
              })
              :
              teamGallery.map(item => { 
                return(
                  <div className={classes.image_container} key={item.id}>
                    {
                      <Link key={item.id} href={`./gallery/${item.id}`}>
                        <img src={item.src} alt='image' className={classes.image} />
                      </Link>
                    }
                  </div>
                ) 
              })
            }
            <MyButton classNames={classes.button} onClick={changeCurrentIndex}/>
          </div>
      </div>
    </div>
  )
}