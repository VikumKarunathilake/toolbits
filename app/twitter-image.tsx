import { ImageResponse } from 'next/og'
import { SharedImage, size, contentType } from '@/components/shared-og-image'

export const runtime = 'edge'
export const alt = 'ToolBits - Tools Collection'
export { size, contentType }

export default async function Image() {
  return new ImageResponse(<SharedImage />, {
    ...size,
  })
}
