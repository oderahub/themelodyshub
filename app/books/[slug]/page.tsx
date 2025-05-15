'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getBookBySlug, getAllBooks, type Book } from '@/lib/books'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import {
  BookOpen,
  ShoppingCart,
  Star,
  ChevronLeft,
  Calendar,
  BookText,
  Globe,
  Hash
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { Separator } from '@/components/ui/separator'
import { notFound } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'

export default function BookDetailsPage() {
  console.log('BookDetailsPage component rendering')

  const params = useParams()
  const slug = params?.slug as string
  const [book, setBook] = useState<Book | null>(null)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (slug) {
      const foundBook = getBookBySlug(slug)
      if (!foundBook) {
        notFound()
      }
      setBook(foundBook)
    }
  }, [slug])

  if (!book) {
    return <div className="container py-20 text-center">Loading...</div>
  }

  const handleAddToCart = () => {
    addItem(book, quantity)
    toast({
      title: 'Added to cart',
      description: `${quantity} ${quantity === 1 ? 'copy' : 'copies'} of "${
        book.title
      }" added to your cart`,
      duration: 3000
    })
    setQuantity(1)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Preview</DialogTitle>
            <DialogDescription>
              Preview of {book.title} by {book.author}
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-lg max-w-none">
            {book.previewContent ? (
              <div dangerouslySetInnerHTML={{ __html: book.previewContent }} />
            ) : (
              <p>Preview content not available for this book.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="container">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-[#5c87c7] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#books" className="hover:text-[#5c87c7] transition-colors">
              Books
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{book.title}</span>
          </div>
        </div>
      </div>

      {/* Book Details */}
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Book Image */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-[#92c4e4] to-[#6055b0] opacity-20 blur-xl"></div>
            <div className="relative book-display perspective">
              <div className="book-3d transform-style preserve-3d rotate-y-30 hover:rotate-y-20 transition-transform duration-700 mx-auto">
                <Image
                  src={book.coverImage || '/placeholder.svg'}
                  alt={book.title}
                  width={350}
                  height={525}
                  className="rounded-md shadow-2xl object-cover w-auto"
                />
                {/* <div className="book-3d-spine"></div>
                <div className="book-3d-side"></div> */}
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <Button
                className="bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] text-white hover:opacity-90 shadow-md"
                onClick={() => setIsPreviewOpen(true)}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Preview Book
              </Button>
            </div>
          </div>

          {/* Book Info */}
          <div className="space-y-6">
            <div>
              <Badge className={`${book.badgeColor} text-white mb-4`}>{book.badge}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-lg text-gray-600 mb-4">
                by <span className="text-[#5c87c7] font-medium">{book.author}</span>
              </p>

              <div className="flex items-center mb-6">
                {Array(book.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#5c87c7] text-[#5c87c7]" />
                  ))}
                <span className="ml-2 text-gray-600">({book.reviewCount} reviews)</span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">{book.description}</p>

              <div className="flex items-center mb-8">
                <span className="text-3xl font-bold text-[#6055b0]">${book.price.toFixed(2)}</span>
                {book.originalPrice > book.price && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                )}
                {book.originalPrice > book.price && (
                  <Badge className="ml-3 bg-green-500 text-white">
                    Save ${(book.originalPrice - book.price).toFixed(2)}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex border rounded-md">
                  <Button
                    variant="ghost"
                    className="h-12 w-12 rounded-none border-r"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <div className="h-12 w-12 flex items-center justify-center text-lg font-medium">
                    {quantity}
                  </div>
                  <Button
                    variant="ghost"
                    className="h-12 w-12 rounded-none border-l"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>

                <Button
                  className="bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-lg hover:translate-y-0.5 px-8 h-12 text-lg relative transition-all duration-300"
                  onClick={handleAddToCart}
                >
                  <div className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </div>
                </Button>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-[#5c87c7] mr-2" />
                <span className="text-gray-700">
                  Published: <span className="font-medium">{book.publishDate}</span>
                </span>
              </div>
              <div className="flex items-center">
                <BookText className="h-5 w-5 text-[#5c87c7] mr-2" />
                <span className="text-gray-700">
                  Pages: <span className="font-medium">{book.pages}</span>
                </span>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-[#5c87c7] mr-2" />
                <span className="text-gray-700">
                  Language: <span className="font-medium">{book.language}</span>
                </span>
              </div>
              <div className="flex items-center">
                <Hash className="h-5 w-5 text-[#5c87c7] mr-2" />
                <span className="text-gray-700">
                  ISBN: <span className="font-medium">{book.isbn}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {book.categories.map((category, index) => (
                <Badge key={index} variant="outline" className="border-[#92c4e4] text-[#5c87c7]">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs for additional information */}
        <div className="mt-16">
          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto">
              <TabsTrigger value="details">Description</TabsTrigger>
              <TabsTrigger value="contents">Table of Contents</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <div className="mt-8">
              <TabsContent value="details" className="text-gray-700 leading-relaxed space-y-4">
                {book.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </TabsContent>
              <TabsContent value="contents">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Table of Contents</h3>
                  <ul className="space-y-3">
                    {book.tableOfContents.map((chapter, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#5c87c7] font-medium mr-2">{index + 1}.</span>
                        <span className="text-gray-700">{chapter}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="reviews">
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                    <div className="flex items-center">
                      {Array(book.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-[#5c87c7] text-[#5c87c7]" />
                        ))}
                      <span className="ml-2 text-gray-600">
                        {book.rating}.0 ({book.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Sample reviews */}
                    {[
                      {
                        name: 'Thompson Ohaegbulam',
                        date: '2 months ago',
                        rating: 5,
                        comment:
                          'This book completely changed my approach to parenting my teenage son. The practical advice was easy to implement and I saw results almost immediately. Highly recommended for any parent struggling with communication issues.'
                      },
                      {
                        name: 'Jamie Sammuel',
                        date: '3 months ago',
                        rating: 5,
                        comment:
                          'I was skeptical at first, but this book offers genuine solutions that work in the real world. The author clearly understands the challenges of modern parenting. The chapter on digital boundaries was particularly helpful for our family.'
                      },
                      {
                        name: 'Taylor Darlington',
                        date: '4 months ago',
                        rating: 5,
                        comment:
                          "As an educator, I've recommended this book to countless parents. It bridges the communication gap between parents and teens in a way that respects both perspectives. The real-life examples make the strategies easy to understand and apply."
                      }
                    ].map((review, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-medium text-gray-900">{review.name}</p>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                            <div className="flex">
                              {Array(review.rating)
                                .fill(0)
                                .map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-[#5c87c7] text-[#5c87c7]" />
                                ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}

                    <Button className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200">
                      Load More Reviews
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Related Books */}
      <div className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#5c87c7] to-[#6055b0] bg-clip-text text-transparent">
            You May Also Like
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Just showing the other book as related */}
            {getAllBooks()
              .filter((relatedBook) => relatedBook.id !== book.id)
              .map((relatedBook) => (
                <Card
                  key={relatedBook.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative h-[300px] bg-gradient-to-br from-[#92c4e4] to-[#5c87c7] overflow-hidden p-6 flex items-center justify-center">
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/20 blur-xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#6055b0]/30 blur-xl"></div>
                      </div>
                      <Image
                        src={relatedBook.coverImage || '/placeholder.svg'}
                        alt={relatedBook.title}
                        width={150}
                        height={225}
                        className="shadow-lg rounded-sm"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col justify-between">
                      <div>
                        <Badge className={`${relatedBook.badgeColor} text-white mb-2`}>
                          {relatedBook.badge}
                        </Badge>
                        <h3 className="font-bold text-xl mb-2 text-gray-800 hover:text-[#5c87c7] transition-colors">
                          <Link href={`/books/${relatedBook.slug}`}>{relatedBook.title}</Link>
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{relatedBook.description}</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-bold text-xl text-[#6055b0]">
                            ${relatedBook.price.toFixed(2)}
                          </span>
                          {relatedBook.originalPrice > relatedBook.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${relatedBook.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <Link href={`/books/${relatedBook.slug}`}>
                          <Button className="w-full bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 border-0 shadow-md">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>

      {/* Back to Books */}
      <div className="container py-12">
        <Link href="/#books" className="inline-flex items-center text-[#5c87c7] hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Books
        </Link>
      </div>
    </div>
  )
}
