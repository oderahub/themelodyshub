// Book data store
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
}

export const books: Book[] = [
  {
    id: "book-1",
    title: "Teens Trouble Real Solutions",
    slug: "teens-trouble-real-solutions",
    price: 24.99,
    originalPrice: 29.99,
    coverImage: "/placeholder.svg?height=450&width=300&text=Teens+Trouble+Real+Solutions",
    description:
      "A comprehensive guide to help teenagers and parents navigate the challenges of adolescence with practical, actionable solutions for common problems.",
    longDescription: `"Teens Trouble Real Solutions" is the definitive guide for parents, educators, and teenagers themselves who are navigating the complex challenges of adolescence. Drawing from years of research and real-world experience, this book offers practical, actionable solutions to the most common problems teenagers face today.

From communication breakdowns and academic pressure to social media challenges and mental health concerns, this book addresses the full spectrum of teenage issues with compassion, understanding, and evidence-based strategies. Each chapter focuses on a specific challenge and provides step-by-step solutions that can be implemented immediately.

What sets this book apart is its dual perspective approach - offering insights for both parents and teenagers, helping to bridge the generation gap and foster mutual understanding. Real-life success stories throughout the book demonstrate how these solutions have transformed relationships and improved outcomes for families around the world.

Whether you're a parent struggling to connect with your teen, an educator looking for effective approaches, or a teenager seeking guidance, "Teens Trouble Real Solutions" provides the tools you need to navigate adolescence successfully.`,
    rating: 5,
    reviewCount: 128,
    badge: "Bestseller",
    badgeColor: "bg-[#6055b0]",
    author: "Dr. Sarah Johnson",
    publishDate: "2022-06-15",
    pages: 342,
    language: "English",
    isbn: "978-1234567890",
    categories: ["Parenting", "Adolescent Psychology", "Self-Help"],
    tableOfContents: [
      "Chapter 1: Understanding Today's Teenagers",
      "Chapter 2: Communication Strategies That Work",
      "Chapter 3: Navigating Social Media and Technology",
      "Chapter 4: Addressing Academic Pressure",
      "Chapter 5: Mental Health and Emotional Wellbeing",
      "Chapter 6: Peer Pressure and Social Challenges",
      "Chapter 7: Building Independence and Responsibility",
      "Chapter 8: Family Dynamics and Conflict Resolution",
      "Chapter 9: Success Stories and Case Studies",
      "Chapter 10: Resources and Support Networks",
    ],
    previewContent: `# Chapter 1: Understanding Today's Teenagers

## The Modern Teenage Experience

Today's teenagers face challenges that are both timeless and uniquely modern. The fundamental developmental tasks of adolescence remain the same as they have for generations: establishing identity, developing autonomy, and forming meaningful relationships. However, the context in which these developmental milestones occur has changed dramatically.

The digital revolution has transformed how teenagers communicate, learn, and socialize. Social media platforms create new opportunities for connection but also introduce unprecedented pressures and anxieties. Academic expectations have intensified in many communities, with college admissions becoming increasingly competitive. Meanwhile, mental health challenges among adolescents have risen to concerning levels.

Despite these challenges, teenagers today demonstrate remarkable resilience, creativity, and social consciousness. They are often more globally aware, technologically adept, and open-minded than previous generations. Understanding the full context of adolescent development today requires appreciating both the challenges and strengths of modern teenagers.

## The Teenage Brain: A Work in Progress

Recent advances in neuroscience have revolutionized our understanding of adolescent development. The teenage brain is not simply an adult brain with less experience—it is qualitatively different, with its own unique strengths and vulnerabilities.

Research has shown that the prefrontal cortex, responsible for judgment, decision-making, and impulse control, continues developing well into the mid-twenties. Meanwhile, the limbic system, associated with emotion, reward, and motivation, develops earlier and more rapidly. This developmental mismatch helps explain many characteristic teenage behaviors: risk-taking, emotional volatility, and sensitivity to social feedback.

Understanding the neuroscience of adolescence can transform how we interpret teenage behavior. What might appear as irresponsibility or defiance often reflects normal brain development. This knowledge doesn't excuse problematic behavior, but it provides context that can help adults respond more effectively and compassionately.`,
  },
  {
    id: "book-2",
    title: "How to Source and Get Scholarships for Schools in Europe",
    slug: "how-to-source-and-get-scholarships-for-schools-in-europe",
    price: 19.99,
    originalPrice: 24.99,
    coverImage: "/placeholder.svg?height=450&width=300&text=How+to+Source+and+Get+Scholarships",
    description:
      "A step-by-step guide to finding, applying for, and securing scholarships at European universities, with insider tips and strategies.",
    longDescription: `"How to Source and Get Scholarships for Schools in Europe" is the ultimate resource for students dreaming of studying in Europe but concerned about the financial implications. This comprehensive guide demystifies the entire scholarship process, from identifying opportunities to submitting winning applications.

Europe offers thousands of scholarship opportunities for international students, but finding and successfully applying for them can be overwhelming. This book breaks down the process into manageable steps, providing country-specific information for major European destinations including Germany, France, the Netherlands, Sweden, and the UK.

Written by education experts with extensive experience in international admissions and scholarship committees, this guide offers insider knowledge that gives readers a competitive edge. Learn how to craft compelling personal statements, secure strong recommendation letters, prepare for scholarship interviews, and avoid common application mistakes.

The book includes detailed profiles of major European scholarship programs, sample application materials from successful applicants, and a comprehensive timeline to keep your applications on track. Special chapters address discipline-specific scholarships and opportunities for underrepresented groups.

Whether you're a high school student planning ahead, an undergraduate seeking graduate funding, or a professional looking to return to academia, this book provides the tools and strategies you need to make studying in Europe financially accessible.`,
    rating: 5,
    reviewCount: 94,
    badge: "New Release",
    badgeColor: "bg-[#92c4e4]",
    author: "Prof. Michael Chen",
    publishDate: "2023-02-10",
    pages: 286,
    language: "English",
    isbn: "978-0987654321",
    categories: ["Education", "Study Abroad", "Financial Aid"],
    tableOfContents: [
      "Chapter 1: Why Study in Europe?",
      "Chapter 2: Understanding European Scholarship Landscape",
      "Chapter 3: Country-Specific Scholarship Opportunities",
      "Chapter 4: University-Specific Funding Options",
      "Chapter 5: Government and External Scholarships",
      "Chapter 6: Crafting a Winning Application",
      "Chapter 7: Personal Statements and Essays",
      "Chapter 8: Recommendation Letters and References",
      "Chapter 9: Interview Preparation",
      "Chapter 10: Managing Finances While Studying Abroad",
    ],
    previewContent: `# Chapter 1: Why Study in Europe?

## The European Advantage

Studying in Europe offers numerous advantages that make it an attractive option for international students. European universities consistently rank among the world's best educational institutions, with centuries of academic excellence and innovation. Many European countries invest heavily in higher education, resulting in well-funded research opportunities, modern facilities, and high-quality teaching.

One of the most compelling reasons to consider Europe is the cost advantage. Unlike the United States, where tuition fees at top universities can exceed $50,000 per year, many European countries offer quality education at a fraction of the cost. Countries like Germany, Norway, and Finland provide tuition-free education even for international students, while others offer significantly lower fees than their American counterparts.

Beyond academics and finances, studying in Europe provides unparalleled cultural experiences. The continent's rich history, diverse cultures, and geographical proximity to different countries make it an ideal location for personal growth and global perspective-building. European universities often emphasize international experience, with many programs taught entirely in English and student bodies representing dozens of nationalities.

## Career and Personal Development Benefits

A European degree can significantly enhance your career prospects. Employers increasingly value international experience and the soft skills developed through studying abroad: adaptability, cultural sensitivity, language skills, and independence. Many European universities maintain strong connections with industry, offering internships and practical training that smooth the transition from education to employment.

For research-focused students, Europe offers exceptional opportunities. The European Union's research funding programs are among the world's largest, and many countries prioritize research and development in their national budgets. This creates a dynamic environment for graduate students and researchers across disciplines.

Personal development benefits are equally significant. Living and studying in a different culture fosters independence, resilience, and self-confidence. You'll develop problem-solving skills as you navigate new systems and situations. Many students report that their time studying abroad was transformative, helping them discover new interests and perspectives that shape their future paths.`,
  },
]

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug)
}

export function getAllBooks(): Book[] {
  return books
}
