/* eslint-disable react/prop-types */

import React from 'react'

import { CardCollection as CardCollectionProps } from '@/types/components'
import { CardCollectionHeader } from './CardCollectionHeader'
import { CardCollectionBody } from './CardCollectionBody'

import { CardTiles } from './CardTiles'

/**
 * React component that renders a collection of cards or card tiles based on the number of cards provided.
 * 
 * @param {CardCollectionProps} props - Component props
 * @param {string} props.header - Header object containing heading and sub-heading
 * @param {Array} props.cards - Array of card objects
 * @param {number} props.count - Total number of cards
 * @param {string} props.id - Unique identifier for the card collection
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @returns {JSX.Element} Collection of cards or card tiles
 */
const CardCollection: React.FC<CardCollectionProps> = (props: CardCollectionProps): JSX.Element => {
    const { header, cards, count, id, $ } = props

    /**
     * ? Method to conditionally render the card collection or card tiles based on the total number of cards
     * ? INFO: If the number of cards is less than or equal to 2, then it will be rendered as cards tiles. 
     * ?       Else it will be rendered as card collection
    */
    const CardCollectionHandler = () => {
        
        if ((count && count > 2) || cards && cards?.length > 2) {

            return (
                <CardCollectionBody
                    id={id}
                    cards={cards}
                    count={count ? count : (cards ? cards?.length : 0)}
                    $={$}
                />
            )

        }

        return (
            <CardTiles
                id={id}
                cards={cards}
                count={cards?.length || 0}
                $={$}
            />
        )

    }

    if ((!cards || cards.length === 0) && (!header || (header.heading === '' && header.sub_heading === ''))) {
        return <></>
    }


    return (

        <div
            id={id}
            className={'pb-8 px-8 sm:pb-12'}
        >
            <div className='max-w-7xl mx-auto '>

                {header && (header.heading != '' || header.sub_heading != '') && <CardCollectionHeader
                    id={id}
                    heading={header?.heading}
                    sub_heading={header?.sub_heading}
                    $={{ ...header?.$ }}
                />}

                <CardCollectionHandler />
            </div>
        </div>

    )
}

export { CardCollection }