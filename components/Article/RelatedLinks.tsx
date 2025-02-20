import React from 'react'
import { Link } from '@/components'
import { RelatedLinksComponent } from '@/types/components'

/**
 * RelatedLinks component displays a list of related links with an optional label
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.relatedLinks - Array of related link objects containing url and title
 * @param {Object} props.relatedLinksLabel - Label object containing text and metadata
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @returns {JSX.Element} RelatedLinks component
 */

const RelatedLinks: React.FC<RelatedLinksComponent> = (props: RelatedLinksComponent) => {
    const { relatedLinks, relatedLinksLabel, $ } = props

    return (<div className={'px-8 my-16'} id='related-region-topics'>
        <div className='container mx-auto'>
            {relatedLinks && <div><span {...relatedLinksLabel?.$?.text} data-id='span-text' className='font-semibold text-sm inline-block mt-2'>{relatedLinksLabel?.text || 'Related Links'}: &nbsp;</span>
                {relatedLinks.map((elem, ind: number) => (
                    <span key={`related-link-${ind}`} {...$?.[`taxonomies__${ind}`]}>
                        <Link url={elem?.url}
                            className='font-montserrat border-b-2 border-transparent text-purple hover:border-purple cursor-pointer font-semibold text-sm capitalize'
                        >
                            {elem?.title ?? ''}
                        </Link>
                        <span className='mr-2'>{relatedLinks[ind + 1] ? ',' : ''}</span>
                    </span>
                ))}
            </div>}

        </div>
    </div>)
}

export { RelatedLinks }