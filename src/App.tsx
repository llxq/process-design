import Loading from '@/components/Loading'
import router from '@/routers'
import { RouterProvider } from 'react-router-dom'
import '@/assets/styles/index.scss'

const App = () => <RouterProvider router={ router } fallbackElement={ <Loading /> }></RouterProvider>

export default App
