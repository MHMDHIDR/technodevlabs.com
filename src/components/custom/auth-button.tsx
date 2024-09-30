import { getUser } from '@/lib/lucia'
import { SignIn, SignOut } from '@/components/custom/auth-buttons'

export default async function AuthButton() {
  const user = await getUser()

  return user ? <SignOut /> : <SignIn />
}
