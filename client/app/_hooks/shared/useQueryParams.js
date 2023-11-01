import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function useQueryParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlSearchParams = new URLSearchParams(searchParams.toString())

  return { urlSearchParams, router, pathname }
}
