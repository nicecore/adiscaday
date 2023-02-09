import '@/styles/globals.css'
import SiteHeader from '@/components/SiteHeader'

/* 
Root app component. SiteHeader is imported and used to 
wrap around the root component.
*/

function App({ Component, pageProps }) {
  return (
    <SiteHeader>
      <Component {...pageProps} />
    </SiteHeader>
  )
}

export default App;
