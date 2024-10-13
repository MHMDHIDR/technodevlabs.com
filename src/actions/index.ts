export { emailAction } from '@/actions/private/email'

export { getProjectByIdAction } from '@/actions/projects/get-project-by-id'
export { getPostByIdAction } from '@/actions/posts/get-post-by-id'
export { getPostBySlugAction } from '@/actions/posts/get-post-by-slug'
export { getAnalyticsAction } from '@/actions/private/get-analytics'

export { addNewPostAction } from '@/actions/posts/add-new-post'
export { addNewProjectAction } from '@/actions/projects/add-new-project'

export { updateProjectAction } from '@/actions/projects/update-project'
export { updatePostAction } from '@/actions/posts/update-post'
export { updateLayoutAction } from '@/actions/settings/layout'

export { deleteProjectAction } from '@/actions/projects/delete-project'
export { deletePostAction } from '@/actions/posts/delete-post'
export { deleteCookieAction } from '@/actions/private/delete-cookie'
export { deleteEntryAndRevalidateAction } from '@/actions/private/delete-entry-and-revalidate'
export { deleteSingleObject, deleteMultipleObjects } from '@/actions/s3/delete'

export { uploadFiles } from '@/actions/s3/upload'
export { optimizeImage, isImageFile } from '@/actions/s3/optimize-image'
