import { useEffect } from 'react'
import { useJstag } from './useJstag'

/**
 * Component that fires a Lytics pageView on mount.
 */
export function LyticsTracking(): JSX.Element {
  const jstag = useJstag()

  useEffect(() => {
    if (jstag && typeof jstag.pageView === 'function') {
      jstag.pageView()
    }
  }, [jstag])

  return <></>
}
