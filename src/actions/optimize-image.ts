'use server'

import sharp from 'sharp'

export async function optimizeImage(base64: string, quality = 80): Promise<string> {
  try {
    // Remove the data URI prefix if present
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    const optimizedBuffer = await sharp(buffer).webp({ quality }).toBuffer()

    return `data:image/webp;base64,${optimizedBuffer.toString('base64')}`
  } catch (error) {
    console.error('Error optimizing image:', error)
    throw new Error('Failed to optimize image')
  }
}

export async function isImageFile(type: string): Promise<boolean> {
  const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  return imageTypes.includes(type)
}
