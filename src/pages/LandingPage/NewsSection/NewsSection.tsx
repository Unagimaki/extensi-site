import { FC } from "react";
import { News } from "shared/types/news";
import classes from './newsSection.module.scss'
import { Button } from "components";
import { useRouter } from "next/router";

interface NewsSectionProps {
  news: News[];
}

export const NewsSection: FC<NewsSectionProps> = ({ news }) => {
  const router = useRouter()
  return (
    <section className={classes.wrapper}>

      <div className={classes.title_container}>
        <h1 className={classes.title}>Новости</h1>
      </div>

      <div className={classes.container}>
        <div className={classes.news_wrapper}>

          <div className={classes.news_item_side}>

            <div className={classes.image_container}/>

            <div className={classes.news_item}>
              <div className={classes.news_title}> { news[0].title } </div>
              <div className={classes.news_text}> { news[0].subtitle } </div>
            </div>
          </div>

          <div className={classes.news_line_container}>
            <div className={classes.news_line}>
              {
                news.slice(1, -1).map(item => {
                  
                  return(
                    item.id !== 5 && 
                    <div key={item.id} className={classes.news_item}>
                      <div className={classes.news_title}> { item.title } </div>
                      <div className={classes.news_text}> { item.subtitle } </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className={classes.news_item_side}>
            <div className={classes.news_item}>
              <div className={classes.news_title}> { news[news.length-1].title } </div>
              <div className={classes.news_text}> { news[news.length-1].subtitle } </div>
            </div>

            <div className={classes.image_container}/>

          </div>

        </div>
      </div>
      {/* <div className={classes.button_container}>
        <Button variant="white" withArrowIcon={true} onClick={() => router.push('./news')}/>
      </div> */}

    </section>
  );
};
