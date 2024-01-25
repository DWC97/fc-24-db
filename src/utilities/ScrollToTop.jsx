// hooks
import { useEffect } from "react"

// routing
import { useLocation } from "react-router-dom"


// function used to ensure that scroll position didn't persist when moving forward through routes
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}