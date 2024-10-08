'use server'

import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'
import { updateProjectAction } from '@/actions'
import { env } from '@/env'
import { auth } from '@/auth'

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: { accessKeyId: env.AWS_ACCESS_ID, secretAccessKey: env.AWS_SECRET }
})

export async function deleteMultipleObjects({ projectId }: { projectId: string }) {
  try {
    // List all objects in the "folder" (objects with the projectId prefix)
    const listCommand = new ListObjectsV2Command({
      Bucket: env.AWS_BUCKET_NAME,
      Prefix: `${projectId}/`
    })

    const listedObjects = await s3Client.send(listCommand)

    if (listedObjects.Contents && listedObjects.Contents.length > 0) {
      const deleteParams = {
        Bucket: env.AWS_BUCKET_NAME,
        Delete: { Objects: listedObjects.Contents.map(({ Key }) => ({ Key })) }
      }

      const deleteCommand = new DeleteObjectsCommand(deleteParams)
      await s3Client.send(deleteCommand)

      // If there are more than 1000 objects, we need to make multiple delete requests
      if (listedObjects.IsTruncated) {
        // Recursive call to delete remaining objects, this will continue until all objects are deleted
        await deleteMultipleObjects({ projectId })
      }
    }

    return { success: true, message: 'All project files deleted successfully from S3' }
  } catch (error) {
    console.error('Error deleting files from S3:', error)
    return { success: false, message: 'Failed to delete project files from S3' }
  }
}

export async function deleteSingleObject({ imageUrl }: { imageUrl: string }) {
  try {
    // Authentication check
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return { success: false, message: 'Unauthorized' }
    }

    // Extract the key and projectId from the imageUrl
    const urlParts = imageUrl.split('/')
    const projectId = urlParts[3] // The part after 'com/'
    const key = urlParts.slice(3).join('/')

    if (!key || !projectId) {
      return { success: false, message: 'Invalid image URL' }
    }

    const deleteParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: key
    }

    const deleteCommand = new DeleteObjectCommand(deleteParams)
    await s3Client.send(deleteCommand)

    // Update the project by removing the deleted image URL
    const updateResult = await updateProjectAction({
      projectId,
      title: undefined,
      description: undefined,
      url: undefined,
      images: { removeImage: imageUrl }
    })

    if (!updateResult.success) {
      return { success: false, message: 'File deleted from S3, but failed to update project' }
    }

    return { success: true, message: 'File deleted from S3 and project updated successfully' }
  } catch (error) {
    console.error('Error deleting file from S3 or updating project:', error)
    return { success: false, message: 'Failed to delete file from S3 or update project' }
  }
}
