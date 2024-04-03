import styles from "./styles.module.css"


interface LoaderProps {
    /**
     * Loader width (optional)
     */
    width?: string,
    /**
     * Loader height (optional)
     */
    height?: string,
    /**
     * Loader color (optional)
     */
    color?: string
}

export const Loader = ({ width='45px', height='45px', color='3px solid #000000' }: LoaderProps) => {
    return (
        <div 
            className={styles.loader} 
            style={{ width: width, height: height, borderTop: color }}
        ></div>
    )
}