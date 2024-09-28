import Nav from '@/components/custom/nav'
import Footer from '@/components/custom/footer'

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
