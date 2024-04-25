import { NextPage } from "next"
import { useRouter } from "next/router"
import GalleryImagePage from "pages/GalleryImagePage/GalleryImagePage"
import { useEffect, useState } from "react"

const Image: NextPage = () => {
    const router = useRouter()
    const [ready, setReady] = useState<boolean>(false)

    useEffect(() => {
        router.isReady && setReady(true)
    }, [router.isReady])
    
    return(
        <>
            {
                ready &&
                <GalleryImagePage id={router.query.id}/>
            }
        </>
    )
}

export default Image