export default function Hero() {
  return (
    <section>
      {/* two columns grid with one raw using Tailwindcss */}
      <div className='grid grid-cols-2'>
        <div>
          <img src='/logo.svg' alt='Logo' className='w-64 h-64' />
        </div>
      </div>
      <div>
        <h1 className='text-4xl font-bold'>Welcome to the Next.js Starter</h1>
        <p className='text-lg'>
          This is a Next.js starter with TypeScript, ESLint, Prettier, Tailwind CSS, Jest,
          and Husky.
        </p>
      </div>
    </section>
  )
}
