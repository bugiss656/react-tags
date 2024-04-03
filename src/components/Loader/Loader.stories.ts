import type { Meta, StoryObj } from '@storybook/react'
import { Loader } from './Loader'


const meta = {
    title: 'Library/Loader/Loader',
    component: Loader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        width: '45px',
        height: '45px',
        color: '3px solid #000000'
    }
}