import {Routes, Route} from 'react-router-dom'
import {publicRoutes} from '../../routes'
import MainLayout from "../../layouts/Main/MainLayout";
import {START_PAGE} from "../../utils/consts";
import StartPage from "../../pages/StartPage/StartPage";


const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Route>

            <Route path={'/r'}>

            </Route>
            <Route path={START_PAGE} element={<StartPage />} />
        </Routes>
    )
}

export default AppRouter
