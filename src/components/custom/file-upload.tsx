import React, { useCallback, useState } from 'react'
import EmptyState from './empty-state'
import { Label } from '@/components/ui/label'

type FileUploadProps = {
  onFilesSelected(files: Array<File>): void
  ignoreRequired?: boolean
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const [files, setFiles] = useState<Array<File>>([])

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
        className='grid col-span-full h-fit place-items-center justify-center gap-5 p-3 overflow-y-auto border border-gray-200 hover:bg-gray-100 rounded-lg cursor-pointer dark:bg-gray-700 hover:dark:bg-gray-600 transition-colors duration-300'
        htmlFor='projectImg'
      >
        {files.length > 0 ? (
          <div>{`${files.length} ${files.length > 1 ? 'files' : 'file'} selected`}</div>
        ) : (
          <EmptyState isSmall>Please select files to upload</EmptyState>
        )}

        <input
          accept='image/*'
          className='hidden'
          id='projectImg'
          multiple
          name='projectImg'
          onChange={onFileAdd}
          type='file'
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
