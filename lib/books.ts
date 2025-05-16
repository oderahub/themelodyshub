// Book data store

export type Review = {
  name: string
  date: string
  rating: number
  comment: string
}

export type Book = {
  id: string
  title: string
  slug: string
  price: number
  originalPrice: number
  coverImage: string
  description: string
  longDescription: string
  rating: number
  reviewCount: number
  badge: string
  badgeColor: string
  author: string
  publishDate: string
  pages: number
  language: string
  isbn: string
  categories: string[]
  tableOfContents: string[]
  previewContent: string
  reviews: Review[]
}

export const books: Book[] = [
  {
    id: 'book-1',
    title: 'Study Abroad Guide for Africans',
    slug: 'study-abroad-guide-for-africans',
    price: 27.0,
    originalPrice: 34.99,
    coverImage: '/smart.jpg',
    description:
      'The ultimate guide for African students looking to study abroad, with strategies to maximize opportunities while minimizing costs.',
    longDescription: `"Study Abroad Guide for Africans" is an essential resource for African students with dreams of pursuing international education. This comprehensive guide addresses the unique challenges and opportunities that African students face when applying to universities abroad.

Written by experienced education consultants with firsthand knowledge of international admissions processes, this book provides practical advice on every aspect of the study abroad journey - from selecting the right programs and universities to securing financial aid and navigating visa applications.

What sets this guide apart is its focus on cost-effective strategies. The book reveals insider techniques for identifying affordable yet prestigious programs, maximizing scholarship opportunities, and managing finances while studying in foreign countries. Each chapter includes real success stories from African students who have successfully navigated these processes.

The guide covers popular study destinations including the United States, United Kingdom, Canada, Germany, Australia, and emerging options in Asia, providing country-specific information on application requirements, scholarship opportunities, and cultural considerations.

Whether you're a high school student planning your undergraduate education, a university graduate seeking advanced degrees, or a professional looking to enhance your qualifications, this book provides the strategic roadmap to make your international education dreams a reality while being mindful of financial constraints.`,
    rating: 5,
    reviewCount: 128,
    badge: 'Bestseller',
    badgeColor: 'bg-[#6055b0]',
    author: 'Melody Okere',
    publishDate: '2022-06-15',
    pages: 342,
    language: 'English',
    isbn: '978-1234567890',
    categories: ['Education', 'Study Abroad', 'Financial Aid', 'African Studies'],
    tableOfContents: [
      'Chapter 1: Why Study Abroad? Benefits for African Students',
      'Chapter 2: Choosing the Right Country and Institution',
      'Chapter 3: Understanding Admission Requirements',
      'Chapter 4: Standardized Tests and Preparation Strategies',
      'Chapter 5: Financial Planning and Scholarship Opportunities',
      'Chapter 6: Crafting Compelling Applications',
      'Chapter 7: Visa Application Processes',
      'Chapter 8: Pre-Departure Preparations',
      'Chapter 9: Adjusting to Life Abroad',
      'Chapter 10: Leveraging Your International Degree Back Home'
    ],
    previewContent: '',
    reviews: [
      {
        name: 'Aisha Adebayo',
        date: '1 month ago',
        rating: 5,
        comment:
          'This guide was a lifesaver for my study abroad application! The scholarship tips helped me secure funding for my program in Canada.'
      },
      {
        name: 'Chukwuemeka Obi',
        date: '2 months ago',
        rating: 4,
        comment:
          'Very detailed and practical advice. The visa section was particularly helpful, though I wish there was more on Asian universities.'
      },
      {
        name: 'Fatima Diallo',
        date: '3 months ago',
        rating: 5,
        comment:
          'I recommend this to every African student dreaming of studying abroad. The success stories kept me motivated throughout the process.'
      }
    ]
  },
  {
    id: 'book-2',
    title: 'Teen Troubles, Real Solutions',
    slug: 'teen-troubles-real-solutions',
    price: 15.0,
    originalPrice: 19.99,
    coverImage: '/teen.jpeg',
    description:
      'A comprehensive guide to help teenagers and parents navigate the challenges of adolescence with practical, actionable solutions for common problems.',
    longDescription: `"Teen Troubles, Real Solutions" is the definitive guide for parents, educators, and teenagers themselves who are navigating the complex challenges of adolescence. Drawing from years of research and real-world experience, this book offers practical, actionable solutions to the most common problems teenagers face today.

From communication breakdowns and academic pressure to social media challenges and mental health concerns, this book addresses the full spectrum of teenage issues with compassion, understanding, and evidence-based strategies. Each chapter focuses on a specific challenge and provides step-by-step solutions that can be implemented immediately.

What sets this book apart is its dual perspective approach - offering insights for both parents and teenagers, helping to bridge the generation gap and foster mutual understanding. Real-life success stories throughout the book demonstrate how these solutions have transformed relationships and improved outcomes for families around the world.

Whether you're a parent struggling to connect with your teen, an educator looking for effective approaches, or a teenager seeking guidance, "Teen Troubles, Real Solutions" provides the tools you need to navigate adolescence successfully.`,
    rating: 4,
    reviewCount: 213,
    badge: 'Bestseller',
    badgeColor: 'bg-[#ff7e5f]',
    author: 'Melody Okere',
    publishDate: '2023-03-22',
    pages: 286,
    language: 'English',
    isbn: '978-1234567890',
    categories: ['Parenting', 'Adolescent Psychology', 'Self-Help', 'Family Relationships'],
    tableOfContents: [
      'Chapter 1: Understanding Teen Development',
      'Chapter 2: Communication Strategies That Work',
      'Chapter 3: Academic Success Without Stress',
      'Chapter 4: Social Media and Digital Life',
      'Chapter 5: Mental Health and Emotional Well-being',
      'Chapter 6: Building Self-Esteem and Confidence',
      'Chapter 7: Peer Pressure and Making Good Choices',
      'Chapter 8: Family Dynamics and Conflict Resolution',
      'Chapter 9: Future Planning and Goal Setting',
      'Chapter 10: Creating a Supportive Environment'
    ],
    previewContent: '',
    reviews: [
      {
        name: 'Thompson Ohaegbulam',
        date: '2 months ago',
        rating: 5,
        comment:
          'This book completely changed my approach to parenting my teenage son. The practical advice was easy to implement and I saw results almost immediately.'
      },
      {
        name: 'Jamie Sammuel',
        date: '3 months ago',
        rating: 5,
        comment:
          'I was skeptical at first, but this book offers genuine solutions that work in the real world. The chapter on digital boundaries was particularly helpful for our family.'
      },
      {
        name: 'Taylor Darlington',
        date: '4 months ago',
        rating: 4,
        comment:
          "As an educator, I've recommended this book to countless parents. It bridges the communication gap between parents and teens effectively."
      }
    ]
  },
  {
    id: 'book-3',
    title: 'Overcoming Procrastination',
    slug: 'overcoming-procrastination',
    price: 20.0,
    originalPrice: 24.99,
    coverImage: '/overcoming.jpeg',
    description:
      'A practical guide to getting things done, breaking the procrastination cycle, and achieving your goals through proven productivity techniques.',
    longDescription: `"Overcoming Procrastination" is a transformative guide for anyone who struggles with putting things off, missing deadlines, or feeling overwhelmed by their to-do list. This practical book cuts through the noise of productivity advice to deliver a science-backed system for breaking the procrastination habit once and for all.

Drawing from cognitive psychology, behavioral science, and neuroscience, this book explains why we procrastinate and provides concrete strategies to overcome these natural tendencies. Rather than offering quick fixes or simplistic advice, it presents a comprehensive framework for understanding and addressing the root causes of procrastination.

The book introduces readers to the Path to Peak Productivity system, a step-by-step approach that builds lasting habits through small, manageable changes. Each chapter focuses on a specific aspect of procrastination and includes practical exercises, reflection questions, and implementation tools that readers can apply immediately to their work, studies, or personal projects.

What sets this book apart is its compassionate approach. Instead of shame or judgment, it offers understanding and evidence-based solutions. The author acknowledges that procrastination is often a symptom of deeper issues—perfectionism, fear of failure, lack of motivation, or unclear goals—and addresses these root causes with targeted strategies.

Whether you're a student facing assignment deadlines, a professional managing complex projects, or someone with personal goals you've been putting off, "Overcoming Procrastination" provides the roadmap you need to transform your productivity and reclaim your time.`,
    rating: 4,
    reviewCount: 185,
    badge: 'Top Rated',
    badgeColor: 'bg-[#9c27b0]',
    author: 'Melody Okere',
    publishDate: '2023-11-05',
    pages: 264,
    language: 'English',
    isbn: '978-0987654322',
    categories: ['Productivity', 'Self-Help', 'Psychology', 'Time Management'],
    tableOfContents: [
      'Chapter 1: Understanding Procrastination - The Science Behind Delay',
      'Chapter 2: The Procrastination Cycle - How We Get Trapped',
      'Chapter 3: Mindset Shifts - Moving from Avoidance to Approach',
      'Chapter 4: Strategic Goal Setting and Task Breakdown',
      'Chapter 5: Environment Design for Productivity',
      'Chapter 6: The Focus Formula - Deep Work and Flow States',
      'Chapter 7: Overcoming Perfectionism and Fear of Failure',
      'Chapter 8: Motivation Management - Finding Your Drivers',
      'Chapter 9: Building Systems Not Just Schedules',
      'Chapter 10: The Path to Peak Productivity - Putting It All Together'
    ],
    previewContent: '',
    reviews: [
      {
        name: 'Michael Brown',
        date: '1 month ago',
        rating: 5,
        comment:
          'This book helped me break my procrastination habits. The Path to Peak Productivity system is a game-changer for anyone struggling with deadlines.'
      },
      {
        name: 'Sophie Nguyen',
        date: '2 months ago',
        rating: 4,
        comment:
          'Really insightful and practical. The exercises were useful, though I found some chapters a bit repetitive.'
      },
      {
        name: 'Raj Patel',
        date: '3 months ago',
        rating: 5,
        comment:
          'As a student, this book was exactly what I needed to stay on top of my assignments. Highly recommend for anyone who feels stuck.'
      }
    ]
  }
]

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug)
}

export function getAllBooks(): Book[] {
  return books
}
