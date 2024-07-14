import {MAIN_PAGE, BOOSTERS_PAGE, FRIENDS_PAGE, TASKS_PAGE, REWARD_PAGE, UPGRADE_PAGE} from "./utils/consts.ts";
import MainPage from "./pages/MainPage/MainPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import BoostersPage from "./pages/BoostersPage/BoostersPage";
import TasksPage from "./pages/TasksPage/TasksPage.tsx";
import RewardPage from "./pages/RewardPage/RewardPage.tsx";
import UpgradeBoosterPage from "./pages/UpgradeBoosterPage/UpgradeBoosterPage.tsx";

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
    {
        path: TASKS_PAGE,
        Component: TasksPage
    },
    {
        path: REWARD_PAGE,
        Component: RewardPage
    },
    {
        path: UPGRADE_PAGE,
        Component: UpgradeBoosterPage
    }
]