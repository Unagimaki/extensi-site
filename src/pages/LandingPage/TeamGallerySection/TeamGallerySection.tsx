import { Button } from 'components'
import classes from './TeamGallerySection.module.scss'
import { useRouter } from 'next/router'

const TeamGallerySection = () => {
    const router = useRouter()

    return(
        <section className={classes.wrapper}>
      
            <img className={classes.image} src="/images/gallery-section/vimosh.png" alt="vimosh" />
    
            <div className={classes.container}>
    
                <div className={classes.text}>
                    <div className={classes.title}>Галерея</div>
                    <div className={classes.subtitle}>познакомимся?</div>
                </div>
        
                <div className={classes.images}>
                    <img src="/images/gallery/2.png" alt="#"/>
                    <img src="/images/gallery/1.png" alt="#"/>
                </div>
    
            </div>
                <div className={classes.button_container}>
                <Button withArrowIcon={true} variant='black' onClick={() => router.push('./gallery')}/>
            </div>
        </section>
    )
}

export default TeamGallerySection