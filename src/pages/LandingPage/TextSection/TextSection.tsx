import React, { FC } from 'react'
import classes from './textSection.module.scss'

interface props {
    state: boolean
}

export const TextSection: FC<props> = ({state}) => {
    return(
        <section className={!state ?  classes.wrapper : classes.wrapper_hidden}>
            <div className={!state ?  classes.container : classes.container_hidden}>

                <div className={classes.first_paragraph_container}>
                    <div className={classes.text}>
                        Мы - бутиковое агентство и студия разработки, объединяющие <br/> 
                        экспертизы для реализации ярких, но эффективных проектов. <br/> Мы создаем продукты и консультируем, как разрабатывать и <br/> монетизировать приложения, боты, сервисы, медиа проекты. <br/> Мы разрабатываем долгосрочные стратегии продвижения и  <br/> 
                    </div>
                </div>
                <div className={classes.second_paragraph_container}>
                    <div>
                        эффективно управляем маркетинговыми
                    </div>
                </div> 
                <div className={classes.last_paragraph_container}>
                    <div>
                        бюджетами брендов: определяем цели и задачи, тактику, коммуникационную платформу, собираем команду, анализируем результаты и бизнес показатели.
                        <br/>Мы любим креатив: генерируем запоминающиеся механики для спецпроектов, идеи для видеопродуктов, размещений у лидеров мнений, в соцсетях или СМИ.
                        <br/> Мы работаем с инфлюенсерами: сотни проектов на YouTube, Twitch, постов в TG и VK, а также многолетний опыт ведения спонсорских контрактов и амбассадорств.
                        <br/>Мы создаем контент: тексты, дизайн, игры, AR маски, видео, социальные сети.
                        <br/>Мы воплощаем любые идеи сильной командой аккаунтов, креаторов, стратегов, продюсеров, менеджеров по работе с блогерами, дизайнеров и разработчиков.
                    </div>
                </div>

            </div>
        </section>
    )
}
