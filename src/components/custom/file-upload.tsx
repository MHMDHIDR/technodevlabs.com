import { Label } from '@/components/ui/label'
import React, { useCallback, useState } from 'react'
import EmptyState from './empty-state'

type FileUploadProps = {
  onFilesSelected: (files: File[]) => void
  ignoreRequired?: boolean
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const [files, setFiles] = useState<File[]>([])

  const onFileAdd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files)
        setFiles(prevFiles => [...prevFiles, ...newFiles])
        onFilesSelected([...files, ...newFiles])
      }
    },
    [files, onFilesSelected]
  )

  return (
    <>
      <Label
        htmlFor='projectImg'
        className='grid col-span-full h-fit place-items-center justify-center gap-5 p-3 overflow-y-auto border border-gray-200 hover:bg-gray-100 rounded-lg cursor-pointer dark:bg-gray-700 hover:dark:bg-gray-600 transition-colors duration-300'
      >
        {files.length ? (
          <div>{`${files.length} ${files.length > 1 ? 'files' : 'file'} selected`}</div>
        ) : (
          <EmptyState isSmall>Please select files to upload</EmptyState>
        )}

        <input
          type='file'
          name='projectImg'
          id='projectImg'
          className='hidden'
          accept='image/*'
          onChange={onFileAdd}
          multiple
        />
      </Label>

      {files.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default FileUpload
