import { InputHTMLAttributes } from "react"
import styles from "./styles.module.css"


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * Input type
     */
    type: 'text' | 'number',
    /**
     * Name attribute for input
     */
    name: string,
    /**
     * Minimum value for number input
     */
    min?: string,
    /**
     * Maximum value for number input
     */
    max?: string
}

export const Input = ({ 
    type, 
    name,
    min,
    max,
    ...props 
}: InputProps) => {
    return (
        <input 
            type={type} 
            name={name}
            min={min}
            max={max}
            className={styles.input}
            {...props}
        />
    )
}