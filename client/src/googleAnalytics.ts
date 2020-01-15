const gaProperty = 'UA-154432488-1'
const disableStr = 'ga-disable-' + gaProperty

// TODO: terrible code, refactor!
export function startGoogleAnalytics() {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaProperty

  const headElement = document.getElementsByTagName('head')[0]
  headElement.appendChild(script)

  // @ts-ignore
  window.dataLayer = window.dataLayer || []
  // @ts-ignore
  function gtag() {
    // @ts-ignore
    dataLayer.push(arguments)
  }
  // @ts-ignore
  gtag('js', new Date())
  // @ts-ignore
  gtag('config', gaProperty, { anonymize_ip: true })

  if (document.cookie.indexOf(disableStr + '=true') > -1) {
    ;(window as any)[disableStr] = true
  }
}

export function stopGoogleAnalytics() {
  document.cookie =
    disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/'
  ;(window as any)[disableStr] = true
  alert('Google analytics was disabled')
}
