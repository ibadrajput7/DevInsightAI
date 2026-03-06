import LoginPage from "@/components/auth/loginform"

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>
}) {
  const { mode } = await searchParams
  return <LoginPage defaultTab={mode === "signup" ? "signup" : "login"} />
}