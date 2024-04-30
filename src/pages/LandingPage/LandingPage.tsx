import { FC, useState } from "react";

import s from "./landingPage.module.scss";
import { AboutSection } from "./AboutSection/AboutSection";
import { GallerySection } from "./GallerySection/GallerySection";
import { ContactsSection } from "./ContactsSection/Contacts";
import { Artists } from "features/Artists/Artists";
import { IntroSection } from "./IntroSection/IntroSection";
import { menu } from "data/menu";
import { TextSection } from "./TextSection/TextSection";
import { NewsSection } from "./NewsSection";
import { news } from "data/news";
import { artists } from "data/artists";
import { Element } from "react-scroll";
import { gallery } from "data/gallery";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";
import { useAppSelector } from "shared/hooks/redux";
import TeamGallerySection from "./TeamGallerySection/TeamGallerySection";

export const LandingPage: FC = () => {
  const [isDescriptionHidden, setIsDescriptionHidden] = useState<boolean>(true);
  const { show } = useAppSelector(state => state.loading);

  return (
    <div className={s.landingPage}>
      { show ? <LoadingOverlay/> : null}

      <IntroSection menu={menu}/>
      <Element name='about'>
        <AboutSection
          isDescriptionHidden={isDescriptionHidden}
          setIsDescriptionHidden={setIsDescriptionHidden}
        />
      </Element>

      <TextSection state={isDescriptionHidden}/>
      <Element name='cases'>
        <GallerySection images={gallery}/>
      </Element>
      <Element name='team'>
        <Artists artists={artists} />
      </Element>
      <ContactsSection />
      <Element name='news'>
        <NewsSection news={news} />
      </Element>
      <Element name='gallery'>
        <TeamGallerySection/>
      </Element>
    </div>
  );
};
