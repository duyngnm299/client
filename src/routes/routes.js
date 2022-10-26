import config from '~/config';

// Pages
import { HaveSearchBarLayout } from '~/layouts';
import Home from '~/pages/Home/';
import Motel from '~/pages/Motel';
import House from '~/pages/House';
import HouseFacade from '~/pages/HouseFacade';
import Office from '~/pages/Office/';
import Apartment from '~/pages/Apartment';
import Ground from '~/pages/Ground';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Upload from '~/pages/Upload';
import Password from '~/pages/Password';
import PostManagement from '~/pages/PostManagement';
import Auth from '~/pages/Auth';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    {
        path: config.routes.motel,
        component: Motel,
        layout: HaveSearchBarLayout,
    },
    {
        path: config.routes.house,
        component: House,
        layout: HaveSearchBarLayout,
    },
    {
        path: config.routes.housefacade,
        component: HouseFacade,
        layout: HaveSearchBarLayout,
    },
    {
        path: config.routes.office,
        component: Office,
        layout: HaveSearchBarLayout,
    },
    {
        path: config.routes.apartment,
        component: Apartment,
        layout: HaveSearchBarLayout,
    },
    {
        path: config.routes.ground,
        component: Ground,
        layout: HaveSearchBarLayout,
    },

    { path: config.routes.profile, component: Profile },
    { path: config.routes.auth, component: Auth },

    { path: config.routes.password, component: Password },
    { path: config.routes.postmng, component: PostManagement },
    { path: config.routes.upload, component: Upload },
    { path: config.routes.search, component: Search },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
