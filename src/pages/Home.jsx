import Hero from '../components/Hero.jsx'
import Stats from '../components/Stats.jsx'
import About from '../components/About.jsx'
import SolarTypes from '../components/SolarTypes.jsx'
import Process from '../components/Process.jsx'
import Features from '../components/Features.jsx'
import Services from '../components/Services.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import Blog from '../components/Blog.jsx'
import Testimonial from '../components/Testimonial.jsx'

// The homepage is a curated tour, not the full site: it previews each
// section (3 blog posts, not all of them) and hands off to a dedicated
// page for anyone who wants the full picture — that's what keeps a
// long single page from becoming the *entire* site.
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <SolarTypes />
      <Process />
      <Features />
      <Services />
      <CtaBanner />
      <Blog limit={3} showFilters={false} />
      <Testimonial />
    </>
  )
}
