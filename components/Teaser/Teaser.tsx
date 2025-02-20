'use client'
import { useEffect } from 'react'
import { Teaser as TeaserProps } from '@/types/components'
import { Image, Link, Video } from '@/components'
import { isDataInLiveEdit, resolveCta } from '@/utils'

/**
 * Teaser Component
 * 
 * A React component that displays a teaser section with background media (image or video),
 * heading, content, and a call-to-action button.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @param {string} props.heading - The main heading text
 * @param {string} props.content - The content text
 * @param {Array} props.cta - Call-to-action button configuration
 * @param {Array} props.image - Image configuration for background
 * @param {Object} props.video - Video configuration for background
 * @param {Object} props.styles - Styling configuration object
 * @param {string} props.styles.text_align - Text alignment position (e.g., 'Top Left', 'Middle Center', etc.)
 * @param {string} props.id - Unique identifier for the teaser
 * @param {boolean} props.isABEnabled - Flag for A/B testing functionality
 * 
 * @returns {React.ReactElement} A teaser section with background media and content
 */

const Teaser: React.FC<TeaserProps> = (props: TeaserProps) => {
    const { $, heading, content, cta, image, video, styles, id, isABEnabled } = props

    const ctaLink = resolveCta(cta)
    let position_css

    if (styles && styles?.text_align === 'Top Left'){
        position_css = 'pt-16 ml-8 items-start justify-start'
    }
    else if (styles && styles?.text_align === 'Top Center') {
        position_css = 'pt-16 mx-auto text-center items-start justify-center'
    }
    else if (styles && styles?.text_align === 'Top Right') {
        position_css = 'pt-16 ml-auto mr-8 text-right items-start justify-end'
    }
    else if (styles && styles?.text_align === 'Middle Left') {
        position_css = 'ml-8  items-center justify-start'
    }
    else if (styles && styles?.text_align === 'Middle Center') {
        position_css = 'mx-auto text-center items-center justify-center'
    }
    else if (styles && styles?.text_align === 'Middle Right') {
        position_css = 'ml-auto mr-8 text-right items-center justify-end'
    }
    else if (styles && styles?.text_align === 'Bottom Left') {
        position_css = 'ml-8 pb-16 items-end justify-start'
    }
    else if (styles && styles?.text_align === 'Bottom Center') {
        position_css = 'mx-auto pb-16 text-center items-end justify-center'
    }
    else if (styles && styles?.text_align === 'Bottom Right') {
        position_css = 'ml-auto pb-16 mr-8 text-right items-end justify-end'
    }


    /* this below useEffect is to set the height of the teaser container based on the poision of the teaser
       in modular blocks of home_page, this will check if the teaser is the first one in the page 
       then it will set the height of the teaser container to the height of the screen (full viewport)
    */
    useEffect(() => {
        document.querySelectorAll('.teaser-container').forEach((element)=>{
            if(element.getAttribute('id')=='teaser-0'){
                element?.classList.add('h-[calc(100vh-0px)]', 'mt-0')
            } else {
                element?.classList.add('h-[67vh]')
            }
        })
    })

    
    return (
        <div
            id={id}
            className={'teaser-container relative bg-cover bg-no-repeat mb-24'}
        >
            <div className='absolute inset-0 overflow-hidden'>
                {!image?.[0]?.image?.url && video?.video?.url 
                    ? <Video
                        {...video}
                        addDataCslp={isDataInLiveEdit()}
                        className='h-full w-full object-cover object-center opacity-100'    
                    />
                    // eslint-disable-next-line jsx-a11y/alt-text
                    : <Image
                        {...image?.[0]}
                        $={image?.[0]?.$}
                        addDataCslp={isDataInLiveEdit()}
                        className='h-full w-full object-cover object-center opacity-100'
                    />}
                
            </div>
            <div className={`h-full max-w-3xl flex flex-row ${position_css}`}>
                <div>
                    {heading && <h2 data-id='h2-text' {...$?.heading} className={'text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'}>{heading}</h2>}
                    {content && <p data-id='paragraph-text' {...$?.content} className={'font-medium text-lg !leading-8 text-white mb-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] line-clamp-5 whitespace-break-spaces'}>
                        {content}
                    </p>}
                    {cta?.[0]?.text && ctaLink && <span {...cta?.[0]?.$?.link}><Link
                        url={ctaLink}
                        isABEnabled={isABEnabled}
                        className={'relative max-w-full w-max btnPrimary py-3'}
                    >
                        <span {...cta?.[0]?.$?.text}>{cta[0].text}</span>
                    </Link></span>}
                </div>
            </div>
        </div>
    )
}

export { Teaser }