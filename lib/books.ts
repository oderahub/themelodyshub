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
    coverImage: '/smart.png',
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
    previewContent: `# Chapter 1: Why Study Abroad? Benefits for African Students

## Global Perspective, Local Impact

The decision to study abroad represents one of the most significant investments African students can make in their future. International education offers transformative benefits that extend far beyond the academic qualification itself, creating opportunities for personal growth, career advancement, and societal impact.

For African students specifically, international education provides exposure to global standards, methodologies, and networks that can be leveraged to address local challenges. Many alumni of international programs return to their home countries with fresh perspectives, innovative approaches, and cross-cultural competencies that enable them to make meaningful contributions to development efforts.

The statistics are compelling: according to recent studies, internationally educated professionals often command higher salaries, experience lower unemployment rates, and advance more quickly to leadership positions. Beyond these tangible benefits, studying abroad builds resilience, adaptability, and cross-cultural communication skills that are increasingly valued in our globalized economy.

## Addressing Common Concerns

Despite these benefits, many African students hesitate to pursue international education due to concerns about cost, cultural adjustment, and the potential for "brain drain." This book acknowledges these legitimate concerns while providing strategies to address them.

The financial burden can be significantly reduced through strategic scholarship applications, work-study opportunities, and careful selection of destinations. Countries like Germany, Norway, and France offer tuition-free or low-cost education even for international students. Others, like Canada and Australia, provide generous work rights that allow students to offset living expenses while studying.`,
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
    coverImage: './teen.jpeg',
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
      "Chapter 1: Understanding Today's Teenagers",
      'Chapter 2: Communication Strategies That Work',
      'Chapter 3: Navigating Social Media and Technology',
      'Chapter 4: Addressing Academic Pressure',
      'Chapter 5: Mental Health and Emotional Wellbeing',
      'Chapter 6: Peer Pressure and Social Challenges',
      'Chapter 7: Building Independence and Responsibility',
      'Chapter 8: Family Dynamics and Conflict Resolution',
      'Chapter 9: Success Stories and Case Studies',
      'Chapter 10: Resources and Support Networks'
    ],
    previewContent: `# Chapter 1: Understanding Today's Teenagers

## The Modern Teenage Experience

Today's teenagers face challenges that are both timeless and uniquely modern. The fundamental developmental tasks of adolescence remain the same as they have for generations: establishing identity, developing autonomy, and forming meaningful relationships. However, the context in which these developmental milestones occur has changed dramatically.

The digital revolution has transformed how teenagers communicate, learn, and socialize. Social media platforms create new opportunities for connection but also introduce unprecedented pressures and anxieties. Academic expectations have intensified in many communities, with college admissions becoming increasingly competitive. Meanwhile, mental health challenges among adolescents have risen to concerning levels.

Despite these challenges, teenagers today demonstrate remarkable resilience, creativity, and social consciousness. They are often more globally aware, technologically adept, and open-minded than previous generations. Understanding the full context of adolescent development today requires appreciating both the challenges and strengths of modern teenagers.

## The Teenage Brain: A Work in Progress

Recent advances in neuroscience have revolutionized our understanding of adolescent development. The teenage brain is not simply an adult brain with less experience—it is qualitatively different, with its own unique strengths and vulnerabilities.

Research has shown that the prefrontal cortex, responsible for judgment, decision-making, and impulse control, continues developing well into the mid-twenties. Meanwhile, the limbic system, associated with emotion, reward, and motivation, develops earlier and more rapidly. This developmental mismatch helps explain many characteristic teenage behaviors: risk-taking, emotional volatility, and sensitivity to social feedback.`,
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
          'As an educator, I’ve recommended this book to countless parents. It bridges the communication gap between parents and teens effectively.'
      }
    ]
  },
  {
    id: 'book-3',
    title: 'Overcoming Procrastination',
    slug: 'overcoming-procrastination',
    price: 20.0,
    originalPrice: 24.99,
    coverImage: './overcoming.jpeg',
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
    previewContent: `# Chapter 1: Understanding Procrastination - The Science Behind Delay

## Beyond Laziness: The True Nature of Procrastination

Procrastination is often misunderstood as simple laziness or poor time management. This misconception not only fails to address the real problem, but it can also intensify feelings of shame and self-criticism that make procrastination worse. Modern psychological research reveals that procrastination is actually a complex emotional regulation challenge—not a character flaw.

At its core, procrastination is about avoiding negative emotions. When we face tasks that trigger feelings of boredom, anxiety, frustration, or inadequacy, we instinctively seek to escape these uncomfortable states. Procrastination provides immediate emotional relief, creating a powerful reinforcement cycle that can be difficult to break.

Neuroscience research has identified specific brain activities associated with procrastination. When faced with challenging tasks, the limbic system (our emotional brain) engages in a battle with the prefrontal cortex (our rational planning brain). Without strategies to manage this internal conflict, the emotional brain often wins, leading us to delay important work in favor of temporarily pleasurable diversions.

## The Procrastination Equation

Piers Steel, a leading researcher in the field, developed what he calls "the procrastination equation" to explain the factors that influence our tendency to delay:

Motivation = (Expectancy × Value) ÷ (Impulsiveness × Delay)

This equation illustrates that our motivation to complete a task increases when:
- We expect to succeed (Expectancy)
- We value the outcome or find the task enjoyable (Value)

And our motivation decreases when:
- We're easily distracted (Impulsiveness)
- The rewards are far in the future (Delay)

Understanding this equation gives us specific leverage points for intervention. Throughout this book, we'll explore practical strategies for increasing expectancy and value while decreasing impulsiveness and the impact of delay.`,
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
