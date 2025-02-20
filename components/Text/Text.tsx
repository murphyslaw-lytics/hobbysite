import { FunctionComponent } from 'react'
import parse from 'html-react-parser'

import { Text as TextType } from '@/types/components'

/**
 * Text component that renders content with styling
 * @param {Object} props - Component props
 * @param {Object} props.$ - Optional object containing data-cslp attributes
 * @param {string} props.content - The HTML content to be rendered
 * @param {Object} props.styles - Styling options
 * @param {string} props.styles.background_color - Background color option ('primary' or 'secondary')
 * @param {string|number} [props.id] - Optional ID for the text container
 * @returns {JSX.Element} Rendered text component
 */

const Text: FunctionComponent<TextType> = (props: TextType) => {
    const { $, content, styles, id } = props

    return (
        content && typeof content === 'string'
            ? <div 
                id={id?.toString()} 
                className={`my-16 px-8 ${styles?.background_color === 'secondary' ? 'bg-background-secondary' : 'bg-background-primary'} dark:bg-transparent`}> 
                <div className='text max-w-7xl mx-auto whitespace-break-spaces' {...$?.content}>{parse(content)}</div>
            </div> 
            : <></>
    )
}

export { Text }