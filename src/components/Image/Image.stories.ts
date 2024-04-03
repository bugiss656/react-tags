import type { Meta, StoryObj } from '@storybook/react'
import { Image } from './Image'


const meta = {
    title: 'Library/Image/Image',
    component: Image,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        src: 'src/assets/logo.png',
        alt: 'Image alternative text',
        width: '200px',
        height: '60px',
    }
}