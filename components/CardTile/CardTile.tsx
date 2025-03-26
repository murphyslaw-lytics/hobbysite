import React, { useEffect } from 'react'
import { isString } from 'lodash'
import { Image, Link } from '@/components'
import { ImageCardItem } from '@/types/components'
import { classNames, equalHeight, resolveCardCta } from '@/utils'
import { LivePreviewTypeMapper } from '@/types/common'
import styles from './cardTile.module.css'

/**
 * CardTile component that displays an image, title, content, and call-to-action
 * @param {Object} props - Component props
 * @param {Object} props.$ - Optional object containing data-cslp attributes for live preview
 * @param {string|Object} props.image - Contentstack image object
 * @param {string} props.image_alt_text - Alt text for the image
 * @param {string} props.title - Card title
 * @param {string|Object} props.cta - Call-to-action object containing text and url information
 * @param {string} props.content - Card content
 * @param {number} props.count - Number of cards in the grid
 * @param {string|number} props.id - Unique identifier for the card
 * @param {boolean} props.is_thumbnail - Whether the card is a thumbnail
 * @param {number} props.index - Index of the card in the grid
 * @returns {JSX.Element} Card component
 * */
const CardTile: React.FC<ImageCardItem> = (props: ImageCardItem) => {
    const { $, image, image_alt_text, title, subtitle, cta, content, count, id, is_thumbnail, index } = props

    useEffect(() => {
        equalHeight('.card-tile-title') // onload
        window.addEventListener('resize', () => { // onResize
            equalHeight('.card-tile-title')
        })
    })

    {/* eslint-disable-next-line jsx-a11y/alt-text */ }
    const cardImage = <Image
        image={image}
        $={$}
        image_alt_text={image_alt_text}
        is_thumbnail={is_thumbnail}
        className={classNames(
            count === 1 ? 'h-[24rem] w-auto'
                : count === 2 ? 'h-[24rem]'
                    : count === 3 ? 'h-48 lg:h-52'
                        : count && count >= 4 ? 'h-48 lg:h-52'
                            : '',
            'w-full object-center object-fit object-cover hover:opacity-90 hover:cursor-pointer rounded mt-6'
        )}
    />

    return (
        <div
            id={`card-tile-${id}-${index}`}
            key={`card-tile-${id}-${index}`}
            className={`group h-full relative flex flex-col justify-between ${styles.card}`}
            {...$?.[`card__${index}` as keyof LivePreviewTypeMapper<ImageCardItem>] }
        >
            <div className='flex flex-col'>
                <div className='text-xl text-gray-500 dark:text-white text-center'>
                    {title
                        && <h4
                            data-id='h4-text'
                            className='block text-4xl font-montserrat font-semibold text-black card-tile-title'
                            {...$?.title}>
                            {title}
                        </h4>
                    }
                </div>

                {
                    subtitle && <div className='mt-4 text-center'>
                        <span
                            data-id='span-text'
                            className='text-2xl font-montserrat text-black font-normal card-subtitle'
                            {...$?.subtitle}>
                            {subtitle ? subtitle : '\xa0'}
                        </span>
                    </div>
                }

                {cta ? <Link
                    url={resolveCardCta(cta)}
                    className='rounded'
                >
                    {cardImage}
                </Link> : <>
                    {cardImage}
                </>}

                {content && <p data-id='paragraph-text' className='mt-6 p-0 text-base leading-5 text-black dark:text-white card-content whitespace-break-spaces'
                    {...$?.content}
                >
                    {content}
                </p>
                }
            </div>
            <div>
                {cta?.text && cta?.link && !isString(cta) && cta?.text && <p className='mt-6 text-base font-semibold !text-black/50 flex flex-row items-center gap-[8px]' {...cta?.$?.link}>
                    <Link
                        url={resolveCardCta(cta)}
                        className='!text-black/50 font-montserrat text-sm border-b-2 border-transparent hover:border-black/50 !leading-[20px]'
                    >
                        {cta.text && cta.text !== '' ? <span {...cta?.$?.text}>{(cta.text).toUpperCase()}</span> : <span {...cta?.$?.text}>CTA PLACEHOLDER</span>}
                    </Link>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        aria-hidden='true'
                        className='h-5 text-sm text-black/50 !leading-[20px]'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75'
                        />
                    </svg>
                </p>
                }
            </div>
        </div>
    )
}

export { CardTile }