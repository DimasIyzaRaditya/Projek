"use client"

import { Download, Star, BookOpen, Code2, Palette, Layout } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  id: string
  title: string
  description: string
  price: number
  rating?: number
  downloads?: number
  imageUrl?: string
  category?: string
}

const getIconByTitle = (title: string) => {
  const lowerTitle = title.toLowerCase()
  
  if (lowerTitle.includes("ebook") || lowerTitle.includes("e-book") || lowerTitle.includes("buku")) {
    return <BookOpen className="h-12 w-12" />
  }
  if (lowerTitle.includes("source code") || lowerTitle.includes("script") || lowerTitle.includes("code")) {
    return <Code2 className="h-12 w-12" />
  }
  if (lowerTitle.includes("icon") || lowerTitle.includes("design") || lowerTitle.includes("ilustrasi") || lowerTitle.includes("font")) {
    return <Palette className="h-12 w-12" />
  }
  if (lowerTitle.includes("template") || lowerTitle.includes("ui") || lowerTitle.includes("ux") || lowerTitle.includes("dashboard")) {
    return <Layout className="h-12 w-12" />
  }
  
  return <Download className="h-12 w-12" />
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  rating = 0,
  downloads = 0,
  imageUrl,
  category,
}: ProductCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/detail/${id}`)
  }

  return (
    <Card 
      onClick={handleCardClick}
      className="group overflow-hidden transition-all duration-300 hover:border-neutral-500 hover:shadow-[0_0_40px_rgba(150,150,150,0.5)] hover:-translate-y-2 hover:bg-neutral-900/80 hover:ring-2 hover:ring-neutral-500/60 cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-600">
            {getIconByTitle(title)}
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-neutral-50">
            Rp {price.toLocaleString("id-ID")}
          </div>
          <div className="flex items-center space-x-4 text-sm text-neutral-400">
            {rating > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
            {downloads > 0 && (
              <div className="flex items-center space-x-1">
                <Download className="h-4 w-4" />
                <span>{downloads}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={(e) => {
            e.stopPropagation()
            handleCardClick()
          }}
          className="w-full bg-neutral-50 text-neutral-900 hover:bg-white shadow-sm transition-all duration-300 font-medium cursor-pointer"
        >
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  )
}
