import { auth } from '@/auth'
import { SignIn, SignOut } from '@/components/custom/auth-buttons'

export default async function AuthButton() {
  const session = await auth()

  return !session || !session.user ? <SignIn /> : <SignOut />
}
