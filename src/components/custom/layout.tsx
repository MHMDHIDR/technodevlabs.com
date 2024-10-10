import Footer from '@/components/custom/footer'
import Nav from '@/components/custom/nav'

function Layout({ children, className }: { className?: string; children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <section className={className}>{children}</section>
      <Footer />
    </>
  )
}

export default Layout
