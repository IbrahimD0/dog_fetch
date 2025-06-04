"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Search, LogOut, Sparkles } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

interface SearchResult {
  resultIds: string[]
  total: number
  next?: string
  prev?: string
}

export default function SearchPage() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [breeds, setBreeds] = useState<string[]>([])
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [ageMin, setAgeMin] = useState("")
  const [ageMax, setAgeMax] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [match, setMatch] = useState<Dog | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchBreeds()
    performSearch()
  }, [])

  const fetchBreeds = async () => {
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
        credentials: "include",
      })
      if (response.ok) {
        const breedData = await response.json()
        setBreeds(breedData)
      }
    } catch (error) {
      console.error("Failed to fetch breeds:", error)
    }
  }

  const performSearch = async (from?: string) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()

      if (selectedBreeds.length > 0) {
        selectedBreeds.forEach((breed) => params.append("breeds", breed))
      }
      if (ageMin) params.append("ageMin", ageMin)
      if (ageMax) params.append("ageMax", ageMax)
      if (zipCode) params.append("zipCodes", zipCode)
      if (from) params.append("from", from)

      params.append("sort", `breed:${sortOrder}`)
      params.append("size", "25")

      const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${params}`, {
        credentials: "include",
      })

      if (response.ok) {
        const result: SearchResult = await response.json()
        setSearchResult(result)

        if (result.resultIds.length > 0) {
          const dogsResponse = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(result.resultIds),
          })

          if (dogsResponse.ok) {
            const dogsData = await dogsResponse.json()
            setDogs(dogsData)
          }
        } else {
          setDogs([])
        }
      }
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBreedChange = (breed: string, checked: boolean) => {
    if (checked) {
      setSelectedBreeds([...selectedBreeds, breed])
    } else {
      setSelectedBreeds(selectedBreeds.filter((b) => b !== breed))
    }
  }

  const toggleFavorite = (dogId: string) => {
    if (favorites.includes(dogId)) {
      setFavorites(favorites.filter((id) => id !== dogId))
    } else {
      setFavorites([...favorites, dogId])
    }
  }

  const generateMatch = async () => {
    if (favorites.length === 0) {
      toast({
        title: "No Favorites",
        description: "Please add some dogs to your favorites first!",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(favorites),
      })

      if (response.ok) {
        const matchResult = await response.json()
        const matchedDog = dogs.find((dog) => dog.id === matchResult.match)
        if (matchedDog) {
          setMatch(matchedDog)
          toast({
            title: "Match Found!",
            description: `You've been matched with ${matchedDog.name}!`,
          })
        }
      }
    } catch (error) {
      toast({
        title: "Match Failed",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Find Your Perfect Dog</h1>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{favorites.length} Favorites</Badge>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {match && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Your Perfect Match!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={match.img || "/placeholder.svg"}
                  alt={match.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-green-800">{match.name}</h3>
                  <p className="text-green-600">
                    {match.breed} • {match.age} years old
                  </p>
                  <p className="text-green-600">Location: {match.zip_code}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Age Range</Label>
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="Min" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} type="number" />
                    <Input placeholder="Max" value={ageMax} onChange={(e) => setAgeMax(e.target.value)} type="number" />
                  </div>
                </div>

                <div>
                  <Label>Zip Code</Label>
                  <Input
                    placeholder="Enter zip code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Sort Order</Label>
                  <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">A-Z</SelectItem>
                      <SelectItem value="desc">Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Breeds</Label>
                  <div className="mt-2 max-h-48 overflow-y-auto space-y-2">
                    {breeds.map((breed) => (
                      <div key={breed} className="flex items-center space-x-2">
                        <Checkbox
                          id={breed}
                          checked={selectedBreeds.includes(breed)}
                          onCheckedChange={(checked) => handleBreedChange(breed, checked as boolean)}
                        />
                        <Label htmlFor={breed} className="text-sm">
                          {breed}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={() => performSearch()} className="w-full" disabled={isLoading}>
                  <Search className="h-4 w-4 mr-2" />
                  {isLoading ? "Searching..." : "Search"}
                </Button>

                {favorites.length > 0 && (
                  <Button onClick={generateMatch} variant="outline" className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Find My Match
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {searchResult && (
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">
                  Showing {dogs.length} of {searchResult.total} dogs
                </p>
                <div className="flex gap-2">
                  {searchResult.prev && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => performSearch(searchResult.prev?.split("from=")[1])}
                    >
                      Previous
                    </Button>
                  )}
                  {searchResult.next && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => performSearch(searchResult.next?.split("from=")[1])}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {dogs.map((dog) => (
                <Card key={dog.id} className="overflow-hidden">
                  <div className="relative">
                    <img src={dog.img || "/placeholder.svg"} alt={dog.name} className="w-full h-48 object-cover" />
                    <Button
                      size="sm"
                      variant={favorites.includes(dog.id) ? "default" : "secondary"}
                      className="absolute top-2 right-2"
                      onClick={() => toggleFavorite(dog.id)}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(dog.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{dog.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <strong>Breed:</strong> {dog.breed}
                      </p>
                      <p>
                        <strong>Age:</strong> {dog.age} years old
                      </p>
                      <p>
                        <strong>Location:</strong> {dog.zip_code}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {dogs.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No dogs found matching your criteria.</p>
                <p className="text-gray-400">Try adjusting your filters and search again.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
