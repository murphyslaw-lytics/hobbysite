'use client'

import React, { useEffect, useState } from 'react'
import { Footer, Header } from '@/components'
import { App } from '@/types'

import { onEntryChange } from '@/config'
import useRouterHook from '@/hooks/useRouterHook'
import { LocaleContext, usePersonalization } from '@/context'
import { footerJsonRtePathIncludes, footerReferenceIncludes, getEntries, navigationReferenceIncludes } from '@/services'
import { LyticsTracking } from '@/components/LyticsTracking'

const MainLayout: React.FC<App.MainLayout> = (
    props: React.PropsWithChildren<App.MainLayout>
) => {  

    const [webConfig, setWebConfig] = useState<App.WebConfig>()
    const { locale } = useRouterHook()
    const {personalizationSDK} = usePersonalization()

    const fetchAppConfig = async () => {
        try {
            const refUids = [
                ...navigationReferenceIncludes,
                ...footerReferenceIncludes
            ]
            const jsonRtePaths = [
                ...footerJsonRtePathIncludes
            ]
        
            const webConfigRes = await getEntries('web_configuration', locale, refUids, jsonRtePaths, {}, personalizationSDK) as App.WebConfig[]

            if (webConfigRes && webConfigRes?.length > 0) {

                setWebConfig(webConfigRes[0])

            } else {

                throw 'Unable to fetch Web Config | 404'

            }

        } catch (err) {
            console.error('Main Layout failed to load,\n', err)
        }
    }

    useEffect(() => {
        onEntryChange(fetchAppConfig)
    }, [])

    return (
        <>
            {locale && <LocaleContext.Provider
                value={{
                    currentLocale: locale
                }}
            >
                {
                    webConfig?.main_navigation?.[0] && webConfig?.logo
                    && <Header
                        {...webConfig.main_navigation[0]}
                        logo={webConfig.logo}
                    />
                }
                <LyticsTracking></LyticsTracking>
                <div className='main-layout mx-auto h-screen min-h-screen justify-center relative'>
                    {props.children}
                </div>
                {
                    webConfig?.footer_navigation?.[0] && webConfig?.logo
                    && <Footer
                        {...webConfig.footer_navigation[0]}
                        logo={webConfig.logo}
                    />
                }
            </LocaleContext.Provider>}
        </>
    )
}

export { MainLayout }