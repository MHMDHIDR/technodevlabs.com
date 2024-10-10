import { IconTrash } from '@tabler/icons-react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { DeleteButton } from './delete-button'
import { Modal } from './modal'
import type { ProjectImagesGridProps } from '@/types'

export function UploadedFiles({
  onImageDelete,
  projectId,
  projectImages,
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
              className='peer border-none'
              description={
                currentLocale === 'en'
                  ? `Are you sure you want to delete this image?`
                  : 'هل أنت متأكد أنك تريد حذف هذه الصورة؟'
              }
              isSmallButton
              title={currentLocale === 'en' ? `Delete image` : 'حذف الصورة'}
              trigger={<IconTrash className='w-5 h-5 text-white' />}
            >
              <DeleteButton
                entryId={imageUrl}
                onSuccess={() => onImageDelete(imageUrl)}
                projectId={projectId}
                type={type}
              />
            </Modal>
            <Image
              alt={`Project image ${index + 1}`}
              className='object-cover rounded-lg peer-hover:opacity-40 transition-opacity'
              height={200}
              src={imageUrl}
              width={200}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
