import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { Label } from './Label'
import { Box } from '@mui/material'


const meta = {
    title: 'Library/Input/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        type: 'text',
        name: 'textInput',
    }
}

export const Number: Story = {
    args: {
        type: 'number',
        name: 'numberInput',
    }
}

export const WithLabel: Story = {
    args: {
        type: 'text',
        name: 'textInput',
    },
    render: () => (
        <Box display="flex" flexDirection="column">
            <Label 
                htmlFor="textInput"
                label="Text input"
            />
            <Input
                type="text"
                name="textInput" 
            />
        </Box>
    )
}