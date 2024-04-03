

interface ImageProps {
    /**
     * Path to the image
     */
    src: string,
    /**
     * Alternate text for an image
     */
    alt: string,
    /**
     * Image width (optional)
     */
    width?: string,
    /**
     * Image height (optional)
     */
    height?: string
    /**
     * Image classes
     */
    className?: string
}

/**
 * Image component
 */
export const Image = ({ src, alt, width, height, className, ...props }: ImageProps) => {
    return (
        <img 
            src={src} 
            alt={alt}
            width={width}
            height={height}
            className={className}
            {...props} 
        />
    )
}