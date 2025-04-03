// Libs
import { Route, Routes } from 'react-router-dom'

// Router
import { HOME_PAGE } from '@/constants'

// Page
import HomePage from '@/pages/HomePage'

import MainLayout from '@/layouts'

const AppRouters = () => {
  return (
    <Routes>
      <Route path={HOME_PAGE} element={<MainLayout />}>
        <Route index element={<HomePage />} />

        {/* Ví dụ trang danh mục
          <Route path={CATEGORIES_PAGE} element={<Category />} />
        */}
      </Route>
    </Routes>
  )
}

export default AppRouters
