/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import { Component } from '@/types'
import { Image, Link } from '@/components'
import { classNames, resolveCta } from '@/utils'

/**
 * TextAndImage Component
 * 
 * A component that displays text content alongside an image with various layout options.
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @param {string} props.heading - The main heading text
 * @param {string} props.content - The main content text
 * @param {Object} props.image - Image object containing URL and other image properties
 * @param {string} props.image_alt_text - Alternative text for the image
 * @param {Array} props.cta - Call-to-action button configuration
 * @param {Object} props.styles - Styling configuration
 * @param {('left'|'right'|'top'|'bottom')} props.styles.image_position - Position of the image relative to text
 * @param {('light'|'dark')} props.styles.theme - Theme variant
 * @param {Object} props.icon - Optional icon object containing URL and title
 * @param {string} props.id - Unique identifier for the component
 * @param {boolean} props.is_thumbnail - Flag to indicate if image should be rendered as thumbnail
 * @returns {JSX.Element} Rendered TextAndImage component
 */

export function TextAndImage (props: Component.TextAndImage) {
    const { $, heading, content, image, image_alt_text, cta, styles: { image_position, theme }, icon, id, is_thumbnail } = props

    const ctaLink = resolveCta(cta)
    const TextBlock = () => (
        <div
            className={classNames(
                image_position === 'right' ? 'lg:ml:0 pr-4 lg:pr-8' : 'xs:ml-4 md:ml-8',
                'mx-auto my-auto w-2xl'
            )}
        >
            {icon?.url && <Image
                image={icon}
                $={$}
                image_alt_text={icon?.title}
                className={'h-16 mb-8'}
            />}
            {heading && <h2
                data-id='h2-text'
                className='xs:text-3xl sm:text-5xl mt-8 text-black dark:text-white break-words font-normal'
                {...$?.heading}>
                {heading}
            </h2>}
            {content && <p
                data-id='paragraph-text'
                className='mt-8 text-lg leading-5 text-black dark:text-white whitespace-break-spaces'
                {...$?.content}>
                {content}
            </p>}
            <div
                className={classNames(
                    image_position === 'right' && cta?.[0]?.text ? 'my-8 xs:mt-8 xs:mb-0' : 'mt-8',
                    'flex items-center gap-x-6'
                )}
            >
                <div {...cta?.[0]?.$?.link}>
                    {cta?.[0]?.text && ctaLink && <Link
                        url={ctaLink}
                        className='dark:btnPrimary btnSecondary'
                    >
                        <span {...cta?.[0]?.$?.text}>{cta[0].text}</span>
                    </Link>}
                </div>
            </div>

        </div>
    )

    return (
        <div
            id={id}
            className={`${theme === 'dark' ? 'dark' : ''}`}
        >
            <div className={`relative my-32 px-8 mx-auto bg-white dark:bg-[#424656] text-black dark:text-white ${theme === 'dark' ? 'py-16' : ''}`}>
                {image_position && ['top', 'bottom'].includes(image_position) ? <div
                    className={classNames(
                        `${image_position === 'top' ? 'flex-col-reverse'
                            : image_position === 'bottom' ? 'flex-col'
                                : ''}`,
                        'flex container'
                    )}
                >
                    <div className='max-w-7xl lg:mx-0'>
                        {icon?.url && <Image
                            image={icon}
                            $={$}
                            image_alt_text={icon?.title}
                            className={'h-16 mb-8'}
                        />}
                        {heading && <h2 data-id='h2-text' className='text-black xs:text-3xl sm:text-5xl font-normal dark:text-white break-words' {...$?.heading}>{heading}</h2>}
                        {content && <p data-id='paragraph-text' className='mt-6 text-lg leading-5 text-black dark:text-white whitespace-break-spaces' {...$?.content}>
                            {content}
                        </p>}
                        {cta?.[0]?.text && ctaLink && <div className='mt-6 flex items-center gap-x-6'>
                            <Link
                                url={ctaLink}
                                className='dark:btnPrimary btnSecondary px-6 py-2.5'
                                {...cta?.[0]?.$?.link}
                            >
                                <span {...cta?.[0]?.$?.text}>{cta[0].text}</span>
                            </Link>
                        </div>}
                    </div>
                    <div className={`relative overflow-hidden ${image_position === 'top' ? 'mb-8' : 'mt-8'}`}>
                        <div className='mx-auto'>
                            <Image
                                image={image}
                                $={$}
                                image_alt_text={image_alt_text}
                                is_thumbnail={is_thumbnail}
                                className={'w-full object-cover aspect-[2] md:aspect-[3/1] object-center bg-white/5 shadow-2xl ring-1 ring-white/10 dark:text-white'}
                            />
                        </div>
                    </div>
                </div>
                    : image_position && ['right', 'left'].includes(image_position) ? <div
                        className={classNames(
                            `${image_position === 'right' ? 'xs:flex-row flex-col'
                                : image_position === 'left' ? 'xs:flex-row-reverse flex-col-reverse'
                                    : ''}`,
                            'flex container'
                        )}
                    >
                        <div className='w-full xs:w-[50%] max-w-7xl'>
                            <TextBlock />
                        </div>
                        <div className={'relative flex-[0_0_50%]'}>
                            <Image
                                image={image}
                                $={$}
                                image_alt_text={image_alt_text}
                                is_thumbnail={is_thumbnail}
                                className={'mb-8 xs:mb-0 w-full h-full xl:aspect-[6/3] aspect-[3/2] bg-white/5 shadow-2xl ring-1 ring-white/10 object-cover object-center dark:text-white'}
                            />
                        </div>
                    </div> : <></>

                }

            </div>
        </div>
    )
}
