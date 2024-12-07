'use client'

import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconBrandX,
  IconMail
} from '@tabler/icons-react'
import { FloatingDock } from '@/components/ui/floating-dock'

// Social share functions
const shareFacebook = (url: string) => {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  window.open(shareUrl, '_blank', 'width=600,height=400')
}

const shareTwitter = (url: string, text: string) => {
  const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  window.open(shareUrl, '_blank', 'width=600,height=400')
}

const shareTelegram = (url: string, text: string) => {
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  window.open(shareUrl, '_blank', 'width=600,height=400')
}

const shareWhatsApp = (url: string, text: string) => {
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`
  window.open(shareUrl, '_blank', 'width=600,height=400')
}

const shareLinkedIn = (url: string) => {
  const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`
  window.open(shareUrl, '_blank', 'width=600,height=400')
}

const shareEmail = (url: string, subject: string) => {
  const shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(url)}`
  window.location.href = shareUrl
}

export const ShareButtons = ({ url, title }: { url: string; title: string }) => {
  const shareUrl = decodeURIComponent(url)

  const links = [
    {
      title: 'Facebook',
      icon: (
        <div
          onClick={() => shareFacebook(shareUrl)}
          className='flex justify-center items-center w-full h-full cursor-pointer'
        >
          <IconBrandFacebook className='w-6 h-5 text-blue-700 dark:text-blue-500' />
        </div>
      ),
      href: '#'
    },
    {
      title: 'Twitter',
      icon: (
        <div
          onClick={() => shareTwitter(shareUrl, title)}
          className='flex justify-center items-center w-full h-full cursor-pointer'
        >
          <IconBrandX className='w-6 h-5 text-neutral-500 dark:text-neutral-400' />
        </div>
      ),
      href: '#'
    },
    {
      title: 'Telegram',
      icon: (
        <div
          onClick={() => shareTelegram(shareUrl, title)}
          className='flex justify-center items-center w-full h-full cursor-pointer'
        >
          <IconBrandTelegram className='w-6 h-6 text-blue-400 dark:text-blue-300' />
        </div>
      ),
      href: '#'
    },
    {
      title: 'WhatsApp',
      icon: (
        <div
          onClick={() => shareWhatsApp(shareUrl, title)}
          className='flex justify-center items-center w-full h-full cursor-pointer'
        >
          <IconBrandWhatsapp className='w-6 h-5 text-green-400 dark:text-green-300' />
        </div>
      ),
      href: '#'
    },
    {
      title: 'LinkedIn',
      icon: (
        <div
          onClick={() => shareLinkedIn(shareUrl)}
          className='flex justify-center items-center w-full h-full cursor-pointer'
        >
          <IconBrandLinkedin className='w-6 h-5 text-blue-700 dark:text-blue-500' />
        </div>
      ),
      href: '#'
    },
    {
      title: 'Email',
      icon: (
        <div
          onClick={() => shareEmail(shareUrl, title)}
          className='flex justify-center items-center w-full h-full cursor-pointer'
        >
          <IconMail className='w-6 h-5 text-neutral-500 dark:text-neutral-400' />
        </div>
      ),
      href: '#'
    }
  ]

  return (
    <div className='flex justify-center items-center w-full'>
      <FloatingDock mobileClassName='translate-y-10' items={links} />
    </div>
  )
}
