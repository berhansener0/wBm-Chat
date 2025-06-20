'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        birthDate,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      setSuccess('✅ Kayıt başarılı! 2 saniye içinde giriş sayfasına yönlendiriliyorsunuz...')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      setError(data.message || 'Bir hata oluştu.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8 drop-shadow-sm tracking-wider">
        <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
          wBm
        </span>
      </h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Ad"
            className="p-3 border border-gray-300 rounded-lg"
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Soyad"
            className="p-3 border border-gray-300 rounded-lg"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            className="p-3 border border-gray-300 rounded-lg"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="date"
            className="p-3 border border-gray-300 rounded-lg"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm font-medium">{success}</p>}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Kayıt Ol
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Zaten hesabın var mı?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Giriş yap
          </a>
        </p>
      </div>
    </div>
  )
}