import {MAIN_PAGE, BOOSTERS_PAGE, FRIENDS_PAGE} from "./utils/consts.ts";
import MainPage from "./pages/MainPage/MainPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import BoostersPage from "./pages/BoostersPage/BoostersPage";

export const publicRoutes = [
    {
        path: MAIN_PAGE,
        Component: MainPage
    },
    {
        path: BOOSTERS_PAGE,
        Component: BoostersPage
    },
    {
        path: FRIENDS_PAGE,
        Component: FriendsPage
    },
]