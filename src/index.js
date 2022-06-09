import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/styles/tailwind.css'
import 'assets/styles/index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

import { store } from './redux/_helpers'
import { Provider } from 'react-redux'

const App = React.lazy(() => import('./App'))

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 8000 // frequency provider is polling
  return library
}

ReactDOM.render(
  <ChakraProvider>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Provider>
    </Web3ReactProvider>
  </ChakraProvider>,
  document.getElementById('root'),
)
