'use client'

import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userId = sessionStorage.getItem('userId')
    if (!userId) return

    fetch(`/api/profile/${userId}`)
      .then(res => res.json())
      .then(setUser)
  }, [])

  if (!user) return <div>Yükleniyor...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profil</h1>
      <p><strong>Ad:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* diğer bilgiler */}
    </div>
  )
}
