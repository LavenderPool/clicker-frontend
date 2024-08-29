import {
    MAIN_PAGE,
    BOOSTERS_PAGE,
    FRIENDS_PAGE,
    TASKS_PAGE,
    REWARD_PAGE,
    UPGRADE_PAGE,
    PROFILE_PAGE, AGE_REWARD_PAGE, SHARE_LINK_PAGE, ROULETTE_PAGE, WITHDRAWAL_USDT
} from "./utils/consts.ts";
import MainPage from "./pages/MainPage/MainPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import BoostersPage from "./pages/BoostersPage/BoostersPage";
import TasksPage from "./pages/TasksPage/TasksPage.tsx";
import RewardPage from "./pages/RewardPage/RewardPage.tsx";
import UpgradeBoosterPage from "./pages/UpgradeBoosterPage/UpgradeBoosterPage.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AgeRewardPage from "./pages/AgeRewardPage/AgeRewardPage";
import ShareLinkPage from "./pages/ShareLinkPage/ShareLinkPage";
import RoulettePage from "./pages/RoulettePage/RoulettePage.tsx";
import WithdrawalUSDTPage from "./pages/WithdrawalUSDTPage/WithdrawalUSDTPage.tsx";

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
    },
    {
        path: PROFILE_PAGE,
        Component: ProfilePage
    },
    {
        path: AGE_REWARD_PAGE,
        Component: AgeRewardPage
    },
    {
        path: SHARE_LINK_PAGE,
        Component: ShareLinkPage
    },
    {
        path: ROULETTE_PAGE,
        Component: RoulettePage
    },
    {
        path: WITHDRAWAL_USDT,
        Component: WithdrawalUSDTPage
    },
]