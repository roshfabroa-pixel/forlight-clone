import PageHeader from '../components/PageHeader.jsx'
import Blog from '../components/Blog.jsx'

// Thin wrapper: PageHeader banner + the same <Blog> component the
// homepage uses, just without a post limit so every article shows.
export default function BlogPage() {
  return (
    <>
      <PageHeader title="Solar Insights Blog" crumb="Blog" image="blogbanner" />
      <Blog />
    </>
  )
}
