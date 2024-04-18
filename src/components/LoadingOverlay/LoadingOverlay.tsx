import { FC, useEffect, useState } from "react";
import s from "./loadingOverlay.module.scss";

import Head from "next/head";

const LoadingOverlay: FC = () => {
  return (
    <>
      <Head>
        <title>
          Loading || extensi.one – Qualitatively New Level of Entertainment
        </title>
      </Head>
      <div className={s.loadingOverlay}>
        <div className={s.container}>
          <div className={s.loading}>
            <div id="first">
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div>
                              <div>
                                <div></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingOverlay;
