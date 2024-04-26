import { FC, useState } from 'react'
import classes from './galleryImagePage.module.scss'
import { teamGallery } from "data/teamGallery"
import { Feedback } from './Feedback/Feedback'

interface props {
    id: any
}

const GalleryImagePage: FC<props> = ({id}) => {
    const [showImages, setShowImages] = useState(false)
    const [Cor, setCor] = useState<{ x: number; y: number }[]>([])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (Cor.length < 12) {
            setCor(prevImagesLocation => [
                ...prevImagesLocation,
                { x: e.clientX, y: e.clientY },
            ])
        } else { Cor.shift() }
    }

  const handleMouseEnter = () => { setShowImages(true) }
  const handleMouseLeave = () => { setShowImages(false), setCor([])
}

    return(
        <div className={classes.wrapper}>

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
            <Feedback/>
        </div>
    )
}

export default GalleryImagePage