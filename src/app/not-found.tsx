import Error from 'next/error'

export default function RootNotFoundPage() {
  return <Error statusCode={404} />
}
