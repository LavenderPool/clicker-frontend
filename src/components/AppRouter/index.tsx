import {Routes, Route} from 'react-router-dom'
import {publicRoutes} from '../../routes'
import MainLayout from "../../layouts/Main/MainLayout";


const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Route>
        </Routes>
    )
}

export default AppRouter
