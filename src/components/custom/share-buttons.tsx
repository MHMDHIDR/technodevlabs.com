'use client'

import { FloatingDock } from '@/components/ui/floating-dock'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon
} from 'react-share'

export const ShareButtons = ({ url, title }: { url: string; title: string }) => {
  const shareUrl = decodeURIComponent(url)

  const links = [
    {
      title: 'Facebook',
      icon: (
        <FacebookShareButton
          url={shareUrl}
          className='flex justify-center items-center w-full h-full'
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      ),
      href: '#'
    },
    {
      title: 'Twitter',
      icon: (
        <TwitterShareButton
          url={shareUrl}
          title={title}
          className='flex justify-center items-center w-full h-full'
        >
          <XIcon size={32} round />
        </TwitterShareButton>
      ),
      href: '#'
    },
    {
      title: 'Telegram',
      icon: (
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className='flex justify-center items-center w-full h-full'
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      ),
      href: '#'
    },
    {
      title: 'WhatsApp',
      icon: (
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=': '
          className='flex justify-center items-center w-full h-full'
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      ),
      href: '#'
    },
    {
      title: 'LinkedIn',
      icon: (
        <LinkedinShareButton
          url={shareUrl}
          className='flex justify-center items-center w-full h-full'
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      ),
      href: '#'
    },
    {
      title: 'Email',
      icon: (
        <EmailShareButton
          url={shareUrl}
          subject={title}
          className='flex justify-center items-center w-full h-full'
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
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
