import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        //debug: true,
        //lng:'zh_CN',

        /*interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },*/
        // we init with resources
        resources: {
            de_de: {
                translation: {
                    "Page": "Seite",
                    "of": "von"
                }
            },
            es_419: {
                translation: {
                    "Page": "Página",
                    "of": "de"
                }
            },
            en: {
                translation: {
                    "Page": "Page",
                    "of": "of"
                }
            },
            fr: {
                translation:{
                    "Page": "Page",
                    "of": "de"
                }
            },
            it_it: {
                translation: {
                    "Page": "Pagina",
                    "of": "di"
                }
            },
            pt_br: {
                translation:{
                    "Page": "Página",
                    "of": "de"
                }
            },
            zh_cn: {
                translation:{
                    "Page": "第",
                    "of": "页,共"
                }
            }
        },


        // have a common namespace used around the full app
        //ns: ["translations"],
        //defaultNS: "translations",

        //keySeparator: false, // we use content as keys


    });

export default i18n;
