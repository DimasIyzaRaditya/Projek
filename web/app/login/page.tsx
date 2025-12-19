"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { API_AUTH_LOGIN } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (input: React.FormEvent) => {
    input.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Login via API
      const res = await fetch(`${API_AUTH_LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Username atau password salah")
        setLoading(false)
        return
      }

      const user = data.data

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify({
        id: user.id,
        name: user.name,
        username: user.username
      }))

      // Redirect based on username
      if (username.toLowerCase() === "admin") {
        router.push("/admin")
      } else {
        router.push("/seller")
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <Card className="w-full max-w-md border-neutral-800 bg-neutral-900/50">
        <CardHeader className="space-y-1">
          <div className="mb-4 flex justify-center">
            <img src="/favicon.ico" alt="Ahmeng Trade" className="h-12 w-12" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-neutral-50">
            Login
          </CardTitle>
          <CardDescription className="text-center text-neutral-400">
            Masuk ke akun Ahmeng Trade Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-neutral-50">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(input) => setUsername(input.target.value)}
                required
                className="border-neutral-700 bg-neutral-800 text-neutral-50 placeholder:text-neutral-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-50">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(input) => setPassword(input.target.value)}
                required
                className="border-neutral-700 bg-neutral-800 text-neutral-50 placeholder:text-neutral-500"
              />
            </div>

            {error && (
              <div className="rounded-md border border-red-800 bg-red-950/50 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-neutral-50 text-neutral-950 hover:bg-neutral-200"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Login"}
            </Button>

            <div className="text-center text-sm text-neutral-400">
              <Link href="/" className="text-neutral-50 hover:underline">
                Kembali ke beranda
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
