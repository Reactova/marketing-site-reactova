import { creatorsMetadata } from '@/config/metadata'

export const metadata = creatorsMetadata

export default function CreatorsProgramLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
