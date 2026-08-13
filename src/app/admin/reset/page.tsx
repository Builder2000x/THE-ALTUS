'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

export default function ResetAdminPassword(){const [password,setPassword]=useState('');const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);async function updatePassword(event:FormEvent){event.preventDefault();setBusy(true);const {error}=await createBrowserSupabaseClient().auth.updateUser({password});setBusy(false);setMessage(error?error.message:'Password updated. You can now sign in to the publishing desk.')}return <main className="admin-shell"><section className="admin-card"><p className="eyebrow">Altus publishing desk</p><h1>Choose a new<br/><em>password.</em></h1><form onSubmit={updatePassword} className="admin-form"><label>New password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength={8} required/></label><button className="buy-button" disabled={busy}>{busy?'Updating…':'Update password'}</button></form>{message&&<p className="admin-message">{message}</p>}<Link className="admin-switch" href="/admin">Back to sign in</Link></section></main>}
