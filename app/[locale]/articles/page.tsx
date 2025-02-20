'use client'
import { useEffect, useState } from 'react'
import { isNull } from 'lodash'
import { CardCollection, NoArticles, PageWrapper, Pagination } from '@/components'
import { RenderComponents } from '@/components'
import { ImageCardItem } from '@/types/components'
import {  Page } from '@/types'
import { onEntryChange } from '@/config'
import useRouterHook from '@/hooks/useRouterHook'
import { setDataForChromeExtension } from '@/utils'
import { imageCardsReferenceIncludes, teaserReferenceIncludes, textAndImageReferenceIncludes, textJSONRtePaths } from '@/services/helper'
import { getEntries, getEntryByUrl } from '@/services'
import { usePersonalization } from '@/context'

/**
 * @component ArticleListing - ArticleListing Component
 * 
 * @route '/{locale}/articles'
 * @description Component that renders the all articles page
 * 
 * @returns {JSX.Element}
 */
export default function ArticleListing () { 

    const [data, setData] = useState<Page.ArticleListingPage['entry'] | null>(null)
    const [articles, setArticles] = useState<Page.ArticleListingPage['articles'] | null>(null)
    const [cards, setCards] = useState<ImageCardItem[] | []>([])
    const noArticles = articles && articles?.length > 0 ? false : true
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [articlesPerPage] = useState<number>(12)
    const {path, locale} = useRouterHook()
    const {personalizationSDK} = usePersonalization()

    /**
     * @method RenderCardCollection
     * 
     * @description Method that renders the card collection based on the restructured data
     * @returns {JSX.Element} Card collections or Not Found component conditionally
     * */ 
    const RenderCardCollection = () => {
        const lastIndex = currentPage * articlesPerPage
        const firstIndex = lastIndex - articlesPerPage
        const articlesList: ImageCardItem[] | [] = cards?.slice(firstIndex, lastIndex)
        return(
            !isNull(articles) && noArticles ? <NoArticles />
                : <>
                    {cards?.length > 0
                    && <CardCollection
                        id='articles-card-collection'
                        cards={articlesList}
                        count={cards?.length}
                    /> }
                </> 
        )

    }

    /**
     * @method fetchData
     * @description method that fetches data of the article listing page itself, primarily for setting data for the Chrome extension
     * 
     * @async
     * */ 
    const fetchData = async () => {
        try{
            const refUids = [
                ...textAndImageReferenceIncludes,
                ...teaserReferenceIncludes,
                ...imageCardsReferenceIncludes
            ]
            const jsonRtePaths = [
                ...textJSONRtePaths
            ]
            // fetch article listing page content by page Url
            const res = await getEntryByUrl('article_listing_page', locale, path, refUids, jsonRtePaths, personalizationSDK) as Page.ArticleListingPage['entry']
            setData(res)
            setDataForChromeExtension({ entryUid: res?.uid || '', contenttype: 'article_listing_page', locale: locale })
        } catch(error) {
            console.error('Error while fetching ArticleListingPage:', error)
        }
    }

    /**
     * @method fetchArticles
     * @description method that fetches all the articles
     * 
     * @async
     */
    const fetchArticles = async () => {
        try{
            // fetch all articles to list
            const articleCollection = await getEntries('article', locale, [], [], {}, personalizationSDK) as Page.Article['articles'][]
            setArticles(articleCollection)
        } catch(error) {
            console.error('Error while fetching Articles:', error)
        }
    }

    /**
     * useEffect that populates the data initially and during live preein
     * */ 
    useEffect(() => {
        fetchArticles()
        onEntryChange(fetchData)
    }, [])

    /**
     * useEffect that maps over the fetched articles data and structure them as cards to display on the page
     * */ 
    useEffect(() => {
        const cardsData: ImageCardItem[] | []  =  articles?.map((article) => {
            return ({
                title: article?.title,
                content: article?.summary,
                image: article?.cover_image,
                $: article?.$,
                cta: article?.url
            })
        }) as ImageCardItem[] | [] 
        setCards(cardsData)
    }, [articles])

    return ( <>
        {data && <PageWrapper {...data}>
            {data?.title && <div className='pt-16 px-8 mb-16 bg-background-primary dark:bg-white text-center max-w-7xl mx-auto'>
                <h1 data-id='h1' className='mx-auto text-black' {...data?.$?.title}>{data?.title}</h1>
            </div>}
            {data?.components ? (
                <RenderComponents $={data?.$}
                    components={data?.components}
                />
            ) : <></>}
        </PageWrapper>}
        <div className='card-collection mt-16' id='pagination-scroll-anchor'>
            <RenderCardCollection />
            { // Paginaion component
                cards?.length > 12 && <div className='py-8 px-8 xl:px-0 bg-background-primary dark:bg-transparent text-center max-w-7xl mx-auto'>
                    <Pagination
                        length={cards?.length}
                        dataPerPage={articlesPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            }
        </div>
    </>
    )
}