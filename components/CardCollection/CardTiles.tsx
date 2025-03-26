'use client'
import { Fragment} from 'react'
import { classNames } from '@/utils'
import { CardCollectionBody, ImageCardItem } from '@/types/components'
import { CardTile } from '../CardTile'


/**
 * Renders a collection of cards in a grid layout of card tiles.
 * 
 * @param {CardCollectionBody} props - Component props
 * @param {Array<ImageCardItem>} props.cards - Array of card objects
 * @param {number} props.count - Total number of cards
 * @param {string} props.id - Unique identifier for the card collection
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @returns {JSX.Element} Collection of cards in a grid layout of card tiles
 */
const CardTiles = ({cards, count, id, $}: CardCollectionBody): JSX.Element => {

    /**
     * Determines the grid column configuration based on number of cards
     * @returns {string} CSS classes for grid columns
     */
    const gridConfigurator  = () => {

        if(count && count > 12) return 'sm:grid-cols-2 lg:grid-cols-3'

        switch(cards?.length) {
        case 1:
            return 'lg:grid-cols-1'

        case 2:
            return 'sm:grid-cols-2 lg:grid-cols-2'

        case 3: 
            return 'sm:grid-cols-2 lg:grid-cols-3'

        default:
            return 'sm:grid-cols-2 lg:grid-cols-3'
        }

    }

    return (
        cards && cards?.length > 0 ? <div
            className={
                classNames(
                    gridConfigurator(),
                    'sm:grid-cols-2 lg:grid-cols-2 grid grid-cols-1 gap-y-12 sm:gap-x-6 xl:gap-x-8'
                )
            }
            {...$?.cards}
            key={`cards-${id}`}
        >
            {cards?.map((cardData: ImageCardItem, idx: number) => {
                return (<Fragment key={`card-tile-${id}-${idx}`}>
                    <CardTile
                        id={id}
                        {...cardData}
                        count={count}
                        $ = {cardData.$ && $ ? { ...cardData.$, ...$ } : undefined}
                        index={idx}
                    />
                </Fragment>)
            })
            }
        </div> : <></>
    )
}

export {CardTiles}