'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/app/contact/submit-button'
import { Label } from '@/components/ui/label'
import LabelInputContainer from '@/components/custom/label-input-container'
import { addNewPostAction } from '@/app/actions/add-new-post'

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className='flex flex-wrap gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-t-md'>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('heading')
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
      >
        H1
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('heading')
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
      >
        H2
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('heading')
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
      >
        H3
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('code')
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
      >
        Code
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('codeBlock')
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
      >
        Code Block
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('blockquote')
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
      >
        Blockquote
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('bold')
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
      >
        Bold
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('italic')
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
      >
        Italic
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('bulletList')
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
      >
        Bullet List
      </Button>
      <Button
        type='button'
        onClick={addImage}
        className='px-2 py-1 text-sm bg-white dark:bg-gray-700'
      >
        Add Image
      </Button>
    </div>
  )
}

export default function DashboardPostAdd() {
  const [title, setTitle] = useState('')

  /**
   * Using the fantastic tiptap editor
   * @see https://tiptap.dev/docs/examples/basics/default-text-editor
   */
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
      }
    }
  })

  // Convert this into a server action with a name of addNewPostAction()
  const addPost = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editor) return
    const content = editor.getHTML() ?? ''

    await addNewPostAction({ title, content })

    // Reset form after submission
    setTitle('')
    editor?.commands.setContent('')
  }

  return (
    <section className='max-w-4xl p-6 mx-auto'>
      <h3 className='mb-6 text-2xl font-bold text-center'>Add New Post</h3>

      <form onSubmit={addPost} className='space-y-6'>
        <LabelInputContainer>
          <Label htmlFor='title'>Post Title</Label>
          <Input
            type='text'
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor='content'>Post Content</Label>
          <MenuBar editor={editor} />
          <div className='h-[200px] [margin-top:-0.1rem_!important] overflow-y-auto rounded-md shadow-sm'>
            <EditorContent
              editor={editor}
              className='p-4 bg-neutral-50 dark:bg-neutral-800 min-h-52 text-lg'
            />
          </div>
        </LabelInputContainer>

        <SubmitButton>Add Post</SubmitButton>
      </form>
    </section>
  )
}
