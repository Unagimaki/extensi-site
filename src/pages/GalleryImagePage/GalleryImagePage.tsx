import { FC, useEffect, useState } from 'react'
import classes from './galleryImagePage.module.scss'
import { teamGallery } from "data/teamGallery"
import { Feedback } from './Feedback/Feedback'
import Link from 'next/link'

interface props { id: any }

const GalleryImagePage: FC<props> = ({id}) => {
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [showImages, setShowImages] = useState(false)
    const [Cor, setCor] = useState<{ x: number; y: number }[]>([])

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        const handleResize = () => { setWindowWidth(window.innerWidth), console.log(windowWidth);
         }
        window.addEventListener('resize', handleResize)
        return () => { window.removeEventListener('resize', handleResize) }
    }, [windowWidth]);

    const calcPositionX = () => {
        let x = 0
        if (windowWidth >= 1920) {
            return x - 150
        } else if (windowWidth >= 1440 && x < 1920) {
            return x - 100
        }      
        return x
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (Cor.length < 12) {
            setCor(prevImagesLocation => [
                ...prevImagesLocation,
                { x: e.clientX, y: e.clientY },
            ])
        } else { Cor.shift() }
    }

  const handleMouseEnter = () => { setShowImages(true) }
  const handleMouseLeave = () => { setShowImages(false), setCor([]) }



    return(
        <section className={classes.wrapper}>
            <div className={classes.section_container}>


            <h1 className={classes.title}>Галерея</h1>

            <div className={classes.container}>

                <div className={classes.left}>
                    <img className={classes.left_image} src={teamGallery[id-1].src} alt="" />
                    <div className={classes.left_subtitle}>Это мы</div>
                    <div className={classes.left_title}>Любовь с: <br/>EXTENSI.ONE</div>
                </div>

                <div
                    className={classes.right}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {
                        showImages ? Cor.map((item, index) => {
                            return(
                                <img
                                    key={index}
                                    src={teamGallery[Number(id-1)].src}
                                    alt="img"
                                    style={{
                                        top: `${item.y}px`,
                                        left: `${item.x}px`,
                                        width: '25vw',
                                        height: 'auto'
                                    }}
                                    className={classes.animate}
                                />
                            )
                        }) : <img className={classes.image} src={teamGallery[Number(id-1)].src}/>
                    }

                </div>
                <div>

                </div>
            </div>
            </div>
            <Feedback/>
            <div className={classes.images_wrapper}>
                <div className={classes.images_container}>

                <div className={classes.text}>Больше нас:</div>
                <div className={classes.images_list}>
                    {
                        teamGallery.map(item => { 
                        return(
                            item.id > 8 &&
                            <div className={classes.image_container} key={item.id}>
                            {
                                <Link key={item.id} href={`./gallery/${item.id}`}>
                                    <img src={item.src} alt='image' className={classes.img}/>
                                </Link>
                            }
                            </div>
                        ) 
                        })
                    }
                </div>
                </div>

            </div>

        </section>
    )
}

export default GalleryImagePage