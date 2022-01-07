import { useStore } from 'common/store'
import { debounce, throttle } from 'lodash-es'
import { useEffect, useRef } from 'react'

export const useResizeScrollEvent = () => {
  const _currentY = useRef(0)
  const { appStore: app } = useStore()

  useEffect(() => {
    const handleScroll = throttle(
      () => {
        const currentY = document.documentElement.scrollTop
        const direction = _currentY.current > currentY ? 'up' : 'down'
        app.updatePosition(direction)
        _currentY.current = currentY
      },
      50,
      { leading: true },
    )

    const resizeHandler = debounce(() => {
      app.updateViewport()
    }, 500)
    window.onresize = resizeHandler
    app.updateViewport()

    if (typeof document !== 'undefined') {
      document.addEventListener('scroll', handleScroll)
    }
    return () => {
      window.onresize = null
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
