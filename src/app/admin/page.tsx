import type { Metadata } from 'next'
import AdminDashboard from '@/components/AdminDashboard'

export const metadata: Metadata = { title: 'Publishing desk', robots: { index: false, follow: false } }
export default function AdminPage() { return <AdminDashboard /> }
