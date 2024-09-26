import Nav from '@/app/components/nav'
import Footer from '@/app/components/footer'

function Layout({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <section className={className}>{children}</section>
      <Footer />
    </>
  )
}

export default Layout
