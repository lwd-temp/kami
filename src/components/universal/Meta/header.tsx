import { useInitialData, useKamiConfig } from 'hooks/use-initial-data'
import Head from 'next/head'
import { FC, memo, useEffect } from 'react'
import { isDev, loadScript } from 'utils'
export const DynamicHeaderMeta: FC = memo(() => {
  const initialData = useInitialData()
  const title = initialData.seo.title

  const themeConfig = useKamiConfig()
  const favicon = themeConfig.site.favicon || '/favicon.svg'
  const { dark: darkBg, light: lightBg } = themeConfig.site.background.src
  const { dark: darkFooter, light: lightFooter } =
    themeConfig.site.footer.background.src
  const { css, js, script, style } = themeConfig.site.custom

  useEffect(() => {
    js && js.length && js.forEach((src, i) => loadScript(src))
  }, [])

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {!isDev ? (
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      ) : null}

      {script ? (
        <script dangerouslySetInnerHTML={{ __html: script }} defer></script>
      ) : null}

      {style ? (
        <style dangerouslySetInnerHTML={{ __html: style }}></style>
      ) : null}
      {css && css.length
        ? css.map((href, i) => <link rel="stylesheet" href={href} key={i} />)
        : null}

      {/* for pwa */}
      <meta name="application-name" content={title} />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="msapplication-tooltip" content={title} />
      <meta name="theme-color" content="#39C5BB" />
      <meta name="msapplication-navbutton-color" content="#39C5BB" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />

      {/* for favicon */}
      <link rel="shortcut icon" href={favicon} />
      <link rel="icon" href={favicon} />
      <link rel="apple-touch-icon" href={favicon} />

      <link rel="preload" href={darkBg} as="image" />
      <link rel="preload" href={lightBg} as="image" />
      <link rel="preload" href={darkFooter} as="image" />
      <link rel="preload" href={lightFooter} as="image" />
    </Head>
  )
})
