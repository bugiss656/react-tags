import { LabelHTMLAttributes } from "react"


interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor: string,
    label: string,
}

export const Label = ({ htmlFor, label, ...props }: LabelProps) => {
    return (
        <label htmlFor={htmlFor} {...props}>{label}</label>
    )
}