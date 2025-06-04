"use client"

import type React from "react"
import { useState} from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bone, Heart } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      toast({
        title: "Error",
        description: "Please enter both name and email",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email }),
      })

      if (response.ok) {
        toast({
          title: "Woof! Success!",
          description: "Welcome to Fetch Dog Adoption!",
        })
        router.push("/search")
      } else {
        throw new Error("Login failed")
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your information and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4 overflow-hidden">
     

      <div

      >
        <Card className="w-full max-w-md border-amber-200 shadow-xl">
          <CardHeader className="text-center">
            <div
              className="flex justify-center mb-4"
            
            >
              <div className="bg-amber-100 p-3 rounded-full">
                <Bone className="h-10 w-10 text-amber-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-amber-800">Find your dog companion</CardTitle>
            <CardDescription className="text-amber-700">
              Enter your details to start browsing adoptable dogs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-amber-800">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-amber-800">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
              <div>
                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isLoading}>
                  {isLoading ? "Fetching..." : "Start Searching"}
                  <Heart className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
