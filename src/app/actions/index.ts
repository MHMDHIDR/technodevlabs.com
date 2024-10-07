export { emailAction } from '@/app/actions/email'

export { getProjectByIdAction } from '@/app/actions/get-project/get-project-by-id'

export { addNewPostAction } from '@/app/actions/add-new-post'
export { addNewProjectAction } from '@/app/actions/add-new-project'

export { updateProjectAction } from '@/app/actions/update-project'
export { updatePostAction } from '@/app/actions/update-post'
export { updateLayoutAction } from '@/app/actions/settings/layout'

export { deleteProjectAction } from '@/app/actions/delete-project'
export { deletePostAction } from '@/app/actions/delete-post'
export { deleteCookieAction } from '@/app/actions/delete-cookie'
export { deleteEntryAndRevalidateAction } from '@/app/actions/delete-entry-and-revalidate'
export { deleteSingleObject, deleteMultipleObjects } from '@/app/actions/s3/delete'

export { uploadFiles } from '@/app/actions/s3/upload'
export { optimizeImage, isImageFile } from '@/app/actions/optimize-image'
