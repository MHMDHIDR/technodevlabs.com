export { emailAction } from '@/actions/email'

export { getProjectByIdAction } from '@/actions/get-project/get-project-by-id'

export { addNewPostAction } from '@/actions/add-new-post'
export { addNewProjectAction } from '@/actions/add-new-project'

export { updateProjectAction } from '@/actions/update-project'
export { updatePostAction } from '@/actions/update-post'
export { updateLayoutAction } from '@/actions/settings/layout'

export { deleteProjectAction } from '@/actions/delete-project'
export { deletePostAction } from '@/actions/delete-post'
export { deleteCookieAction } from '@/actions/delete-cookie'
export { deleteEntryAndRevalidateAction } from '@/actions/delete-entry-and-revalidate'
export { deleteSingleObject, deleteMultipleObjects } from '@/actions/s3/delete'

export { uploadFiles } from '@/actions/s3/upload'
export { optimizeImage, isImageFile } from '@/actions/optimize-image'
