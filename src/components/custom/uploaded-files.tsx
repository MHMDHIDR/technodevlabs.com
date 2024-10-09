import Image from 'next/image'
import { IconTrash } from '@tabler/icons-react'
import { Modal } from './modal'
import { DeleteButton } from './delete-button'
import { useLocale, useTranslations } from 'next-intl'
import type { ProjectImagesGridProps } from '@/types'

export function UploadedFiles({
  projectId,
  projectImages,
  onImageDelete,
  type
}: ProjectImagesGridProps) {
  const t = useTranslations('dashboard.project')
  const currentLocale = useLocale()

  return (
    <div className='mt-4'>
      <h3 className='text-lg font-semibold mb-2 select-none'>{t('projectImages')}</h3>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {projectImages.map((imageUrl, index) => (
          <div key={index} className='relative group'>
            <Modal
              title={currentLocale === 'en' ? `Delete image` : 'حذف الصورة'}
              description={
                currentLocale === 'en'
                  ? `Are you sure you want to delete this image?`
                  : 'هل أنت متأكد أنك تريد حذف هذه الصورة؟'
              }
              className='peer border-none'
              trigger={<IconTrash className='w-5 h-5 text-white' />}
              isSmallButton
            >
              <DeleteButton
                entryId={imageUrl}
                type={type}
                projectId={projectId}
                onSuccess={() => onImageDelete(imageUrl)}
              />
            </Modal>
            <Image
              src={imageUrl}
              alt={`Project image ${index + 1}`}
              width={200}
              height={200}
              className='object-cover rounded-lg peer-hover:opacity-40 transition-opacity'
            />
          </div>
        ))}
      </div>
    </div>
  )
}
