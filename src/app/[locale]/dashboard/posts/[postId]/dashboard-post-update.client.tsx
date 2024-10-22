'use client'

import { Image } from '@tiptap/extension-image'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { getPostByIdAction, updatePostAction } from '@/actions'
import { SubmitButton } from '@/app/[locale]/contact/submit-button'
import { AddButton } from '@/components/custom/add-button'
import { Button } from '@/components/custom/button'
import EmptyState from '@/components/custom/empty-state'
import LabelInputContainer from '@/components/custom/label-input-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from '@/i18n/routing'
import type { Post } from '@/types'

function MenuBar({ editor }: { editor: any }) {
  const postTranslations = useTranslations('dashboard.post')

  if (!editor) {
    return null
  }

  function addImage() {
    const url = window.prompt('Enter the URL of the image:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className='flex flex-wrap gap-2 p-2 bg-gray-100 rounded-t-md dark:bg-gray-700'>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive('heading', { level: 1 })
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        type='button'
      >
        {postTranslations('editor.h1')}
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive('heading', { level: 2 })
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        type='button'
      >
        {postTranslations('editor.h2')}
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive('heading', { level: 3 })
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        type='button'
      >
        {postTranslations('editor.h3')}
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive('code') ? 'bg-gray-300 dark:bg-gray-900' : 'bg-white dark:bg-gray-700'
        }`}
        onClick={() => editor.chain().focus().toggleCode().run()}
        type='button'
      >
        {postTranslations('editor.code')}
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive('codeBlock')
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        type='button'
      >
        {postTranslations('editor.codeBlock')}
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive('blockquote')
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        type='button'
      >
        {postTranslations('editor.blockquote')}
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive('bold') ? 'bg-gray-300 dark:bg-gray-900' : 'bg-white dark:bg-gray-700'
        }`}
        onClick={() => editor.chain().focus().toggleBold().run()}
        type='button'
      >
        {postTranslations('editor.bold')}
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive('italic') ? 'bg-gray-300 dark:bg-gray-900' : 'bg-white dark:bg-gray-700'
        }`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        type='button'
      >
        {postTranslations('editor.italic')}
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive('bulletList')
            ? 'bg-gray-300 dark:bg-gray-900'
            : 'bg-white dark:bg-gray-700'
        }`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        type='button'
      >
        {postTranslations('editor.bulletList')}
      </Button>
      <Button
        className='px-2 py-1 text-sm bg-white dark:bg-gray-700'
        onClick={addImage}
        type='button'
      >
        {postTranslations('editor.addImage')}
      </Button>
    </div>
  )
}

export default function DashboardPostUpdateClient({ postId }: { postId: string }) {
  const [post, setPost] = useState<{
    title: Post['title']
    titleAr: Post['titleAr']
    content: Post['content']
    contentAr: Post['contentAr']
    isPublished: Post['isPublished']
  } | null>({
    title: '',
    titleAr: '',
    content: '',
    contentAr: '',
    isPublished: false
  })
  const { replace } = useRouter()
  const postTranslations = useTranslations('dashboard.post')
  const toast = useToast()

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostByIdAction({ postId })
      if (!post) {
        setPost(null)
        return
      }

      setPost({
        title: post.title,
        titleAr: post.titleAr,
        content: post.content,
        contentAr: post.contentAr,
        isPublished: post.isPublished
      })
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

  const editorAr = useEditor({
    extensions: [StarterKit, Image],
    content: post && post.contentAr,
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
    if (editorAr && post) {
      editorAr.commands.setContent(post.contentAr)
    }
  }, [post, editor, editorAr])

  const editPost = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editor || !editorAr || !post) return
    const content = editor.getHTML()
    const contentAr = editorAr.getHTML()

    const { message, success } = await updatePostAction({
      id: postId,
      title: post.title,
      titleAr: post.titleAr,
      content,
      contentAr,
      isPublished: post.isPublished
    })

    if (!success) {
      return toast.error(message)
    }

    toast.success(message)

    editor.commands.setContent('')
    editorAr.commands.setContent('')
    replace('/dashboard/posts')
  }

  return (
    <section className='p-6 mx-auto max-w-4xl'>
      {post === null ? (
        <EmptyState>
          <p className='mt-4 text-lg text-gray-500 dark:text-gray-400'>
            {postTranslations('noPosts')}
          </p>
          <AddButton href='/dashboard/posts/add'>{postTranslations('addPost')}</AddButton>
        </EmptyState>
      ) : (
        <>
          <h3 className='mb-6 text-2xl font-bold text-center select-none'>{post.title}</h3>

          <form className='space-y-6' onSubmit={editPost}>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <LabelInputContainer>
                <Label htmlFor='title'>
                  {postTranslations('postTitle')} (English Post / عنوان المقالة باللغة الإنجليزية)
                </Label>
                <Input
                  className='block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  id='title'
                  onChange={e => setPost({ ...post, title: e.target.value })}
                  required
                  type='text'
                  value={post.title}
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor='titleAr'>
                  {postTranslations('postTitle')} (Arabic Post / عنوان المقالة بالعربي)
                </Label>
                <Input
                  className='block mt-1 w-full rounded-md border-gray-300 shadow-sm rtl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  id='titleAr'
                  onChange={e => setPost({ ...post, titleAr: e.target.value })}
                  required
                  type='text'
                  value={post.titleAr}
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer>
              <Label htmlFor='content'>{postTranslations('postContent')} (English)</Label>
              <MenuBar editor={editor} />
              <div className='h-[200px] overflow-y-auto rounded-md shadow-sm'>
                <EditorContent
                  className='p-4 text-lg leading-loose rounded-md border border-gray-300 bg-neutral-50 dark:bg-neutral-800 min-h-60'
                  editor={editor}
                />
              </div>
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor='contentAr'>
                {postTranslations('postContent')} (محتوى المقالة بالعربي)
              </Label>
              <MenuBar editor={editorAr} />
              <div className='h-[200px] overflow-y-auto rounded-md shadow-sm'>
                <EditorContent
                  className='p-4 text-lg leading-loose rounded-md border border-gray-300 rtl bg-neutral-50 dark:bg-neutral-800 min-h-60'
                  editor={editorAr}
                />
              </div>
            </LabelInputContainer>

            <div className='flex items-center gap-x-2'>
              <Switch
                id='isPublished'
                checked={post.isPublished}
                onCheckedChange={checked => setPost({ ...post, isPublished: checked })}
              />
              <Label htmlFor='isPublished'>
                <strong className={`${post.isPublished ? 'text-green-500' : 'text-red-500'}`}>
                  {postTranslations(post.isPublished ? 'isPublished' : 'isUnpublished')}
                </strong>
              </Label>
            </div>

            <SubmitButton>{postTranslations('updatePost')}</SubmitButton>
          </form>
        </>
      )}
    </section>
  )
}
