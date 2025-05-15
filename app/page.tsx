'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpen,
  ShoppingCart,
  Star,
  ChevronRight,
  Mail,
  Instagram,
  Twitter,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getAllBooks } from '@/lib/books'
import { CartButton } from '@/components/cart-button'
import { useCart } from '@/context/cart-context'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [startScatter, setStartScatter] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<{
    books: boolean
    features: boolean
    about: boolean
    testimonials: boolean
    newsletter: boolean
    contact: boolean
  }>({
    books: false,
    features: false,
    about: false,
    testimonials: false,
    newsletter: false,
    contact: false
  })
  const { addItem } = useCart()
  const books = getAllBooks()

  // Refs for intersection observer
  const sectionsRef = useRef([])

  useEffect(() => {
    // Hide splash screen after 4 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 4000)

    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)

    // Set up intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements((prev) => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.2 }
    )

    // Observe all section elements
    document.querySelectorAll('section[id]').forEach((section) => {
      if (section) observer.observe(section)
    })

    // Start scatter animation after 3 seconds
    const scatterTimer = setTimeout(() => {
      setStartScatter(true)
    }, 3000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      clearTimeout(scatterTimer)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans">
      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 bg-background flex items-center justify-center z-50 transition-opacity duration-500">
          <h1
            className="title animate-pulse"
            style={{
              color: 'rgb(16, 16, 240)',
              fontSize: '70px',
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'lowercase',
              textAlign: 'center',
              background: 'linear-gradient(to right, #fc72ff, #8f68ff, #487bff, #8f68ff, #fc72ff)',
              backgroundSize: '200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'animate-gradient 2.5s linear infinite'
            }}
          >
            themelodyshub
          </h1>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`${showSplash ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
      >
        {/* Header */}
        <header
          className={`sticky top-0 z-50 w-full transition-all duration-500 ${
            scrollPosition > 50 ? 'bg-background/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
          }`}
        >
          <div className="container flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 z-10 group hover-lift">
              <div className="relative transition-all duration-300 group-hover:scale-110 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] rounded-full blur-md opacity-80 group-hover:opacity-100 transition-all duration-300"></div>
                <Image
                  src="/logo1.png"
                  alt="MelodysHub Logo"
                  width={80}
                  height={80}
                  className="relative z-10"
                />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-[#5c87c7] to-[#6055b0] bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wide gradient-animate">
                MelodysHub
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden z-50 text-foreground p-2 rounded-full hover:bg-background/10 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Mobile menu */}
            <div
              className={`fixed inset-0 bg-gradient-to-br from-[#92c4e4] to-[#5c87c7] z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
                isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Link
                href="#books"
                className="text-xl font-bold text-foreground hover:text-foreground/90 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-foreground hover:after:w-full after:transition-all after:duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Books
              </Link>
              <Link
                href="#about"
                className="text-xl font-bold text-foreground hover:text-foreground/90 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-foreground hover:after:w-full after:transition-all after:duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About Author
              </Link>
              <Link
                href="#testimonials"
                className="text-xl font-bold text-foreground hover:text-foreground/90 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-foreground hover:after:w-full after:transition-all after:duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="text-xl font-bold text-foreground hover:text-foreground/90 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-foreground hover:after:w-full after:transition-all after:duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="mt-4">
                <CartButton />
              </div>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex gap-8 z-10">
              <Link
                href="#books"
                className="text-md font-medium text-foreground hover:text-[#5c87c7] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#5c87c7] hover:after:w-full after:transition-all after:duration-300"
              >
                Books
              </Link>
              <Link
                href="#about"
                className="text-md font-medium text-foreground hover:text-[#5c87c7] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#5c87c7] hover:after:w-full after:transition-all after:duration-300"
              >
                About Author
              </Link>
              <Link
                href="#testimonials"
                className="text-md font-medium text-foreground hover:text-[#5c87c7] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#5c87c7] hover:after:w-full after:transition-all after:duration-300"
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="text-md font-medium text-foreground hover:text-[#5c87c7] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#5c87c7] hover:after:w-full after:transition-all after:duration-300"
              >
                Contact
              </Link>
            </nav>

            <div className="hidden md:block z-10">
              <CartButton />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden" id="hero">
          <div className="absolute inset-0 bg-gradient-to-br from-[#92c4e4] to-[#5c87c7] opacity-15"></div>

          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
          <div className="absolute -left-64 -top-64 w-96 h-96 rounded-full bg-[#92c4e4]/20 blur-3xl"></div>
          <div className="absolute -right-64 top-32 w-96 h-96 rounded-full bg-[#6055b0]/20 blur-3xl"></div>

          <div className="container relative grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-8 z-10 animate-fadeIn" ref={useRef(0)}>
              <Badge className="bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] text-foreground hover:opacity-90 px-4 py-1.5 text-sm border-0 shadow-md animate-pulse">
                Bestseller
              </Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                <span className="block text-foreground opacity-90 animate-slideInUp scatter-animation scatter-animation-1">
                  Discover
                </span>
                <span className="block bg-gradient-to-r from-[#5c87c7] to-[#6055b0] bg-clip-text text-transparent animate-slideInUp scatter-animation scatter-animation-2">
                  Life-Changing
                </span>
                <span className="block text-foreground opacity-90 animate-slideInUp scatter-animation scatter-animation-3">
                  E-Books
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-md leading-relaxed animate-fadeIn delay-500">
                Practical solutions for teens and scholarship seekers looking to transform their
                lives.
              </p>
              <div className="flex flex-wrap gap-4 animate-fadeIn delay-300">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-foreground hover:opacity-90 hover:shadow-xl hover:translate-y-0.5 border-0 text-lg px-8 py-6 shadow-lg transition-all duration-300"
                  onClick={() => {
                    const booksSection = document.getElementById('books')
                    if (booksSection) {
                      booksSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  Explore Collection
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#5c87c7] text-[#5c87c7] hover:bg-[#5c87c7]/10 text-lg px-8 py-6 transition-all duration-300"
                  onClick={() => {
                    const aboutSection = document.getElementById('about')
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  About the Author
                </Button> */}
              </div>
            </div>
            <div className="relative z-10">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#92c4e4] to-[#6055b0] opacity-30 blur-3xl"></div>
              <div className="relative flex justify-center perspective">
                <div className="book-container">
                  <div className="book">
                    <div className="book-cover">
                      <Image
                        src={books[0].coverImage || '/placeholder.svg'}
                        alt={books[0].title}
                        className="h-full w-full object-cover rounded-lg shadow-2xl"
                        width={300}
                        height={450}
                      />
                    </div>
                    {/* <div className="book-spine"></div>
                    <div className="book-side"></div> */}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-foreground p-4 rounded-full shadow-lg animate-pulse">
                  <Badge className="bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-foreground hover:opacity-90 border-0 px-3 py-1">
                    #1 Bestseller
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          {/* Floating elements */}
          <div
            className="absolute top-1/4 left-10 w-20 h-20 rounded-full border-2 border-[#92c4e4]/30 animate-float"
            style={{ animationDuration: '5s' }}
          ></div>
          <div
            className="absolute bottom-1/4 right-10 w-12 h-12 rounded-full border-2 border-[#5c87c7]/30 animate-float"
            style={{ animationDuration: '4s', animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute top-3/4 left-1/4 w-16 h-16 rounded-full border-2 border-[#6055b0]/30 animate-float"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          ></div>
        </section>

        {/* Featured Books */}
        <section id="books" className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#92c4e4] to-[#6055b0] opacity-5"></div>
          <div className="container relative z-10">
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                animatedElements['books'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Badge className="bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] text-white hover:opacity-90 px-4 py-1.5 text-sm border-0 mb-4 shadow-md">
                Featured Books
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#5c87c7] to-[#6055b0] bg-clip-text text-transparent">
                Our Collection
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Explore our collection of practical guides that will help you navigate life's
                challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <div
                  key={book.id}
                  className={`group relative bg-card rounded-xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ${
                    animatedElements['books']
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="p-6">
                    <div className="book-display mb-6">
                      <div className="book-3d">
                        <Image
                          src={book.coverImage || '/placeholder.svg'}
                          alt={book.title}
                          width={250}
                          height={375}
                          className="rounded-lg shadow-xl hover-scale"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{book.description}</p>
                    <div className="flex gap-4 relative z-50 pointer-events-auto">
                      <Button
                        className="flex-1 bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-foreground hover:opacity-90 hover:shadow-lg hover:translate-y-0.5 border-0 py-6 shadow-md transition-all duration-300 cursor-pointer pointer-events-auto"
                        onClick={(e) => {
                          console.log('Button clicked - event received')
                          e.preventDefault()
                          e.stopPropagation()
                          console.log('Add to Cart clicked for book:', book.title)
                          try {
                            addItem(book)
                            console.log('addItem function called successfully')
                          } catch (error) {
                            console.error('Error adding item to cart:', error)
                          }
                        }}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                      </Button>
                      <Link href={`/books/${book.slug}`} className="pointer-events-auto">
                        <Button
                          variant="outline"
                          className="flex-1 border-2 border-[#5c87c7] text-[#5c87c7] hover:bg-[#5c87c7]/10 py-6 transition-all duration-300 cursor-pointer pointer-events-auto"
                          onClick={() => {
                            console.log('Learn More clicked for book:', book.title)
                          }}
                        >
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`mt-16 text-center transition-all duration-1000 delay-500 ${
                animatedElements['books'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-xl hover:translate-y-0.5 border-0 text-lg px-8 py-6 shadow-lg transition-all duration-300 group"
              >
                View All Books
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </section>

        {/* Rest of the page content remains the same */}
        {/* Book Features */}
        <section
          id="features"
          className="py-20 bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          {/* Decorative circles */}
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#6055b0]/20 blur-3xl"></div>

          <div className="container relative z-10">
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                animatedElements['features']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
                Why Our E-Books Stand Out
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto text-lg">
                Our books are designed to provide practical, actionable advice that you can
                implement immediately.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Research-Based',
                  description:
                    'All advice is backed by extensive research and real-world case studies.',
                  icon: '📊'
                },
                {
                  title: 'Practical Solutions',
                  description: 'Step-by-step guides that you can implement immediately.',
                  icon: '🛠️'
                },
                {
                  title: 'Success Stories',
                  description: 'Real examples of people who have successfully applied our methods.',
                  icon: '🏆'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 delay-${index * 200} ${
                    animatedElements['features']
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                  <Card className="bg-white/90 backdrop-blur-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 group overflow-hidden">
                    <CardContent className="p-8 text-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#5c87c7]/5 to-[#6055b0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-[#6055b0] group-hover:text-[#5c87c7] transition-colors duration-300 relative z-10">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 relative z-10 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Author Section */}
        <section id="about" className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#92c4e4] to-[#6055b0] opacity-5"></div>
          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div
                className={`relative transition-all duration-1000 ${
                  animatedElements['about']
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-20'
                }`}
              >
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] opacity-30 blur-3xl"></div>
                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border-4 border-[#92c4e4]/50 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.02] transition-transform duration-700">
                  <Image
                    src="/main.jpg"
                    alt="Author"
                    className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-700"
                    width={600}
                    height={600}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 border-t-4 border-l-4 border-[#5c87c7]/50 rounded-tl-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-4 border-r-4 border-[#5c87c7]/50 rounded-br-3xl"></div>
              </div>
              <div
                className={`space-y-8 transition-all duration-1000 delay-300 ${
                  animatedElements['about']
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-20'
                }`}
              >
                <Badge className="bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] text-foreground hover:opacity-90 px-4 py-1.5 text-sm border-0 shadow-md">
                  About the Author
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#5c87c7] to-[#6055b0] bg-clip-text text-transparent">
                  Meet the Expert Behind the Books
                </h2>
                <p className="text-foreground text-lg leading-relaxed">
                  Melody Okere is a dedicated author with a background in business and technology,
                  passionate about providing practical solutions through her writing. She creates
                  insightful and actionable guides to help readers overcome challenges, achieve
                  their goals, and navigate life's important decisions with confidence.
                </p>
                <p className="text-foreground text-lg leading-relaxed">
                  Each book is crafted with care, drawing from personal experiences and a deep
                  understanding of the challenges faced by teens and scholarship seekers. The
                  practical advice and strategies have been tested and proven effective in
                  real-world situations.
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-2 border-[#5c87c7] text-[#5c87c7] hover:bg-[#5c87c7]/10 h-12 w-12 transition-all duration-300 hover:scale-110"
                  >
                    <Instagram className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-2 border-[#92c4e4] text-[#92c4e4] hover:bg-[#92c4e4]/10 h-12 w-12 transition-all duration-300 hover:scale-110"
                  >
                    <Twitter className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-2 border-[#6055b0] text-[#6055b0] hover:bg-[#6055b0]/10 h-12 w-12 transition-all duration-300 hover:scale-110"
                  >
                    <Mail className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] opacity-10"></div>
          <div className="container relative z-10">
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                animatedElements['testimonials']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <Badge className="bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] text-white hover:opacity-90 px-4 py-1.5 text-sm border-0 mb-4 shadow-md">
                Reader Reviews
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#5c87c7] to-[#6055b0] bg-clip-text text-transparent">
                What Readers Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Discover why readers around the world love our books.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Johnson',
                  book: 'Teens Trouble Real Solutions',
                  text: 'This book completely changed how I communicate with my teenage daughter. The practical advice was easy to implement and made an immediate difference.',
                  rating: 5
                },
                {
                  name: 'Michael Chen',
                  book: 'How to Source and Get Scholarships',
                  text: 'Thanks to this guide, I secured a full scholarship to study in Germany. The step-by-step approach made the complex application process manageable.',
                  rating: 5
                },
                {
                  name: 'Emma Williams',
                  book: 'Teens Trouble Real Solutions',
                  text: 'As a school counselor, I recommend this book to all parents. It offers realistic solutions to common teenage issues that actually work.',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 delay-${index * 200} ${
                    animatedElements['testimonials']
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#92c4e4] group overflow-hidden">
                    <CardContent className="p-8">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                      <div className="flex mb-6">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-6 w-6 fill-[#5c87c7] text-[#5c87c7]" />
                          ))}
                      </div>
                      <p className="text-gray-600 mb-6 text-lg italic leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-medium text-lg text-gray-800 block">
                            {testimonial.name}
                          </span>
                          <span className="text-sm text-[#6055b0]">
                            Reader of {testimonial.book}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section id="newsletter" className="relative py-20 overflow-hidden">
          <div className="container relative z-10">
            <div
              className={`max-w-4xl mx-auto relative transition-all duration-1000 ${
                animatedElements['newsletter'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#92c4e4] to-[#6055b0] rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-10 md:p-16 border border-[#92c4e4] shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="absolute -top-10 -left-10 w-20 h-20 border-t-4 border-l-4 border-[#5c87c7]/50 rounded-tl-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-4 border-r-4 border-[#5c87c7]/50 rounded-br-3xl"></div>

                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5c87c7] to-[#6055b0] mb-6 text-center">
                  Stay Updated with New Releases
                </h2>
                <p className="text-gray-600 mb-8 text-center text-lg leading-relaxed">
                  Subscribe to our newsletter and be the first to know about new books, exclusive
                  offers, and author events.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-6 py-4 rounded-lg flex-1 border-2 border-[#92c4e4] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#5c87c7] transition-all duration-300"
                  />
                  <Button className="bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-lg hover:translate-y-0.5 border-0 py-6 shadow-md transition-all duration-300">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#92c4e4] to-[#6055b0] opacity-5"></div>
          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 gap-16">
              <div
                className={`space-y-8 transition-all duration-1000 ${
                  animatedElements['contact']
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-20'
                }`}
              >
                <Badge className="bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] text-white hover:opacity-90 px-4 py-1.5 text-sm border-0 shadow-md">
                  Get in Touch
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#5c87c7] to-[#6055b0] bg-clip-text text-transparent">
                  Have Questions?
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Whether you're interested in bulk orders for schools, speaking engagements, or
                  just want to share your thoughts, we'd love to hear from you.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      <Mail className="h-6 w-6" />
                    </div>
                    <span className="text-gray-600 text-lg group-hover:text-[#5c87c7] transition-colors duration-300">
                      contact@melodyshub.com
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-[#92c4e4] to-[#5c87c7] flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      <Instagram className="h-6 w-6" />
                    </div>
                    <span className="text-gray-600 text-lg group-hover:text-[#5c87c7] transition-colors duration-300">
                      @melodyshub
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-300 ${
                  animatedElements['contact']
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-20'
                }`}
              >
                <Card className="overflow-hidden border border-[#92c4e4] shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <form className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border-2 border-[#92c4e4] rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#5c87c7] transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            className="w-full px-4 py-3 border-2 border-[#92c4e4] rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#5c87c7] transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Subject</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-2 border-[#92c4e4] rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#5c87c7] transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Message</label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-[#92c4e4] rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#5c87c7] transition-all duration-300"
                        ></textarea>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-lg hover:translate-y-0.5 border-0 py-4 text-lg shadow-md transition-all duration-300 group">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          Send Message
                        </span>
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-16 overflow-hidden bg-gradient-to-r from-[#92c4e4] to-[#5c87c7]">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          {/* Decorative circles */}
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-background/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#6055b0]/20 blur-3xl"></div>

          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-2 group">
                  <div className="relative transition-all duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 bg-foreground rounded-full blur-sm opacity-80 group-hover:opacity-100 transition-all duration-300"></div>
                    <Image
                      src="/logo1.png"
                      alt="MelodysHub Logo"
                      width={80}
                      height={80}
                      className="relative z-10"
                    />
                  </div>
                  <span className="font-bold text-2xl text-foreground group-hover:tracking-wide transition-all duration-300">
                    MelodysHub
                  </span>
                </div>
                <p className="text-foreground/80">
                  Providing practical solutions for real-life challenges since 2015.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-6 text-foreground">Quick Links</h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-foreground/80 hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-foreground hover:after:w-full after:transition-all after:duration-300"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#books"
                      className="text-foreground/80 hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-foreground hover:after:w-full after:transition-all after:duration-300"
                    >
                      Books
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#about"
                      className="text-foreground/80 hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-foreground hover:after:w-full after:transition-all after:duration-300"
                    >
                      About Author
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contact"
                      className="text-foreground/80 hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-foreground hover:after:w-full after:transition-all after:duration-300"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-6 text-foreground">Our Books</h3>
                <ul className="space-y-4">
                  {books.map((book) => (
                    <li key={book.id}>
                      <Link
                        href={`/books/${book.slug}`}
                        className="text-foreground/80 hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-foreground hover:after:w-full after:transition-all after:duration-300"
                      >
                        {book.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="#"
                      className="text-foreground/80 hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-foreground hover:after:w-full after:transition-all after:duration-300"
                    >
                      Upcoming Releases
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-6 text-foreground">Follow Us</h3>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-2 border-foreground text-foreground hover:bg-foreground/20 h-12 w-12 transition-all duration-300 hover:scale-110"
                  >
                    <Instagram className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-2 border-foreground text-foreground hover:bg-foreground/20 h-12 w-12 transition-all duration-300 hover:scale-110"
                  >
                    <Twitter className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-2 border-foreground text-foreground hover:bg-foreground/20 h-12 w-12 transition-all duration-300 hover:scale-110"
                  >
                    <Mail className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-foreground/20 mt-12 pt-8 text-center text-foreground/80 text-sm">
              <p>© {new Date().getFullYear()} MelodysHub.com. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* CSS for animations and 3D book effects */}
        <style jsx global>{`
          /* Animation classes */
          .animate-fadeIn {
            animation: fadeIn 1s ease forwards;
          }

          .animate-slideInUp {
            animation: slideInUp 1s ease forwards;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .delay-200 {
            animation-delay: 200ms;
          }

          .delay-300 {
            animation-delay: 300ms;
          }

          .delay-500 {
            animation-delay: 500ms;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          /* 3D Book effects */
          .perspective {
            perspective: 1000px;
          }

          .transform-style {
            transform-style: preserve-3d;
          }

          .book-container {
            transform-style: preserve-3d;
            animation: float 6s ease-in-out infinite;
          }

          .book {
            position: relative;
            width: 300px;
            height: 450px;
            transform-style: preserve-3d;
            transform: rotateY(-30deg);
            transition: transform 1s ease;
          }

          .book:hover {
            transform: rotateY(-15deg);
          }

          .book-cover {
            position: absolute;
            width: 100%;
            height: 100%;
            transform-origin: left;
            transform-style: preserve-3d;
            transform: translateZ(0px);
            transition: transform 0.5s;
            z-index: 2;
          }

          .book-spine {
            position: absolute;
            width: 40px;
            height: 100%;
            left: -20px;
            top: 0;
            transform: rotateY(90deg) translateZ(150px);
            background: linear-gradient(90deg, #92c4e4 0%, #5c87c7 100%);
            transform-origin: right;
          }

          .book-side {
            position: absolute;
            width: 300px;
            height: 450px;
            top: 0;
            transform: translateZ(-20px);
            background: #f5f5f5;
            border-left: 1px solid #ddd;
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.1);
          }

          /* Book display in cards */
          .book-display {
            perspective: 1000px;
          }

          .book-3d {
            position: relative;
            width: 250px;
            height: 375px;
            transform-style: preserve-3d;
          }

          .rotate-y-30 {
            transform: rotateY(30deg);
          }

          .rotate-y-20 {
            transform: rotateY(20deg);
          }

          .book-3d-spine {
            position: absolute;
            width: 30px;
            height: 100%;
            left: -15px;
            top: 0;
            transform: rotateY(90deg) translateZ(125px);
            background: linear-gradient(90deg, #5c87c7 0%, #6055b0 100%);
            transform-origin: right;
          }

          .book-3d-side {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            transform: translateZ(-15px);
            background: #f5f5f5;
            border-left: 1px solid #ddd;
            box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
          }

          /* Background pattern */
          .bg-pattern {
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          }
        `}</style>
      </div>
    </div>
  )
}
