import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import EmptyState from './empty-state'
import { IconX } from '@tabler/icons-react'

type FileUploadProps = {
  onFilesSelected(files: Array<File>): void
  ignoreRequired?: boolean
}

export function FileUpload({ onFilesSelected }: FileUploadProps) {
  const [files, setFiles] = useState<Array<File>>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles]
      setFiles(newFiles)
      onFilesSelected(newFiles)
    },
    [files, onFilesSelected]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const removeFile = (fileToRemove: File) => {
    const updatedFiles = files.filter(file => file !== fileToRemove)
    setFiles(updatedFiles)
    onFilesSelected(updatedFiles)
  }

  return (
    <div className='w-full'>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${
          isDragActive ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        {files.length > 0 ? (
          <p>{`${files.length} ${files.length > 1 ? 'files' : 'file'} selected`}</p>
        ) : (
          <EmptyState isSmall>
            {isDragActive
              ? 'Drop files here'
              : 'Drag and drop files here, or click to select files'}
          </EmptyState>
        )}
      </div>

      {files.length > 0 && (
        <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {files.map((file, index) => (
            <div key={index} className='relative group'>
              <div className='aspect-square relative overflow-hidden rounded-lg'>
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <button
                onClick={() => removeFile(file)}
                type='button'
                className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
              >
                <IconX size={16} />
              </button>
              <p className='text-xs mt-1 truncate'>{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
