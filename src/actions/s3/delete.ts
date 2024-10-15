'use server'

import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'
import { getTranslations } from 'next-intl/server'
import { updateProjectAction } from '@/actions'
import { env } from '@/env'

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: { accessKeyId: env.AWS_ACCESS_ID, secretAccessKey: env.AWS_SECRET }
})

export async function deleteMultipleObjects({ projectId }: { projectId: string }) {
  const projectsTranslations = await getTranslations('dashboard.project.images')

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

    return { success: true, message: projectsTranslations('imgsFailedDelete') }
  } catch (error) {
    console.error('Error deleting files from S3:', error)
    return { success: false, message: projectsTranslations('imgsFailedDelete') }
  }
}

export async function deleteSingleObject({ imageUrl }: { imageUrl: string }) {
  const projectsTranslations = await getTranslations('dashboard.project.images')

  try {
    // Extract the key and projectId from the imageUrl
    const urlParts = imageUrl.split('/')
    const projectId = urlParts[3] // The part after 'com/'
    const key = urlParts.slice(3).join('/')

    if (!key || !projectId) {
      return { success: false, message: projectsTranslations('invalidURL') }
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
      title: '',
      titleAr: '',
      description: '',
      descriptionAr: '',
      url: '',
      images: { removeImage: imageUrl }
    })

    if (!updateResult.success) {
      return { success: false, message: projectsTranslations('projectFailedUpdate') }
    }

    return { success: true, message: projectsTranslations('imgDeleted') }
  } catch (error) {
    console.error('Error deleting file from S3 or updating project:', error)
    return { success: false, message: projectsTranslations('imgFailedDelete') }
  }
}
