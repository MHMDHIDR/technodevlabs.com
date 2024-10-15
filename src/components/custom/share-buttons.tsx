'use client'
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

  return (
    <div className='inline-flex justify-center gap-x-4'>
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={title}>
        <XIcon size={32} round />
      </TwitterShareButton>

      <TelegramShareButton url={shareUrl} title={title}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>

      <WhatsappShareButton url={shareUrl} title={title} separator=': '>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <EmailShareButton url={decodeURIComponent(url)} subject={title}>
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  )
}
