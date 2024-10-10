'use client'

import { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { updatePostAction } from '@/actions'
import { useRouter } from 'next/navigation'
import { getPostByIdAction } from '@/actions/get-post'
import { SubmitButton } from '@/app/[locale]/contact/submit-button'
import { AddButton } from '@/components/custom/add-button'
import { Button } from '@/components/custom/button'
import EmptyState from '@/components/custom/empty-state'
import LabelInputContainer from '@/components/custom/label-input-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Error, Success } from '@/components/custom/icons'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import type { Post } from '@/types'

const MenuBar = ({ editor }: { editor: any }) => {
  const t = useTranslations('dashboard.post')

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
    <div className='flex flex-wrap p-2 bg-gray-100 gap-2 dark:bg-gray-700 rounded-t-md'>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('heading', { level: 1 })
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
      >
        {t('editor.h1')}
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('heading', { level: 2 })
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
      >
        {t('editor.h2')}
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('heading', { level: 3 })
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
      >
        {t('editor.h3')}
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('code') ? 'bg-gray-300 dark:bg-gray-900' : 'bg-white dark:bg-gray-700'
        }`}
      >
        {t('editor.code')}
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
        {t('editor.codeBlock')}
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
        {t('editor.blockquote')}
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('bold') ? 'bg-gray-300 dark:bg-gray-900' : 'bg-white dark:bg-gray-700'
        }`}
      >
        {t('editor.bold')}
      </Button>
      <Button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 text-sm ${
          editor.isActive('italic') ? 'bg-gray-300 dark:bg-gray-900' : 'bg-white dark:bg-gray-700'
        }`}
      >
        {t('editor.italic')}
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
        {t('editor.bulletList')}
      </Button>
      <Button
        type='button'
        onClick={addImage}
        className='px-2 py-1 text-sm bg-white dark:bg-gray-700'
      >
        {t('editor.addImage')}
      </Button>
    </div>
  )
}

export default function DashboardPostUpdate({
  params: { postId }
}: {
  params: { postId: string }
}) {
  const [post, setPost] = useState<{
    title: Post['title']
    content: Post['content']
  } | null>({
    title: '',
    content: ''
  })
  const { replace } = useRouter()
  const t = useTranslations('dashboard.post')

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostByIdAction({ postId })
      if (!post) {
        setPost(null)
        return
      }

      setPost({ title: post.title, content: post.content })
    }
    fetchPost()
  }, [postId])

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: post && post.content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
      }
    },
    immediatelyRender: false
  })

  useEffect(() => {
    if (editor && post) {
      editor.commands.setContent(post.content)
    }
  }, [post, editor])

  const editPost = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editor || !post) return
    const content = editor.getHTML()

    const { success, message } = await updatePostAction({ postId, title: post.title, content })

    if (!success) {
      toast(message, {
        icon: <Error className='inline-block' />,
        position: 'bottom-center',
        className: 'text-center rtl select-none',
        style: {
          backgroundColor: '#FDE7E7',
          color: '#C53030',
          border: '1px solid #C53030',
          gap: '1.5rem',
          textAlign: 'justify'
        }
      })
      return
    }

    toast(message, {
      icon: <Success className='inline-block' />,
      position: 'bottom-center',
      className: 'text-center rtl select-none',
      style: {
        backgroundColor: '#F0FAF0',
        color: '#367E18',
        border: '1px solid #367E18',
        gap: '1.5rem',
        textAlign: 'justify'
      }
    })

    setPost({ title: '', content: '' })
    editor.commands.setContent('')
    replace('/dashboard/posts')
  }

  return (
    <section className='max-w-4xl p-6 mx-auto'>
      {post === null ? (
        <EmptyState>
          <p className='mt-4 text-lg text-gray-500 dark:text-gray-400'>{t('noPosts')}</p>
          <AddButton href='/dashboard/posts/add'>{t('addPost')}</AddButton>
        </EmptyState>
      ) : (
        <>
          <h3 className='mb-6 text-2xl font-bold text-center select-none'>{post.title}</h3>

          <form onSubmit={editPost} className='space-y-6'>
            <LabelInputContainer>
              <Label htmlFor='title'>{t('postTitle')}</Label>
              <Input
                type='text'
                id='title'
                value={post.title}
                onChange={e => setPost({ ...post, title: e.target.value })}
                className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor='content'>{t('postContent')}</Label>
              <MenuBar editor={editor} />
              <div className='h-[200px] overflow-y-auto rounded-md shadow-sm'>
                <EditorContent
                  editor={editor}
                  className='p-4 text-lg bg-neutral-50 dark:bg-neutral-800 min-h-52 border border-gray-300 rounded-md'
                />
              </div>
            </LabelInputContainer>

            <SubmitButton>{t('updatePost')}</SubmitButton>
          </form>
        </>
      )}
    </section>
  )
}
