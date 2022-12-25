import config from '~/config';

// Pages
import { HaveSearchBarLayout } from '~/layouts';
import { DefaultLayout } from '~/layouts';
import Home from '~/pages/Home/';
import Motel from '~/pages/Motel';
import House from '~/pages/House';
import Office from '~/pages/Office/';
import Apartment from '~/pages/Apartment';
import Ground from '~/pages/Ground';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Password from '~/components/Password';
import PostManagement from '~/pages/PostManagement';
import Post from '~/components/PostManagement/Post';
import PostList from '~/components/PostManagement/PostList';
import Login from '~/components/Login';
import Register from '~/components/Register';
import FindRoomates from '~/pages/FindRoomates';
import HaveSidebarLayout from '~/layouts/HaveSidebarLayout';
import DetailPost from '~/components/DetailPost';
import SearchResult from '~/components/SearchResult';
import Message from '~/components/Message';
import PostListOfUser from '~/components/PostListOfUser';
import ForgotPassword from '~/components/ForgotPassword';
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
        path: config.routes.findroomates,
        component: FindRoomates,
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
    {
        path: config.routes.detailPage,
        component: DetailPost,
        layout: HaveSearchBarLayout,
    },
    {
        path: config.routes.searchResult,
        component: SearchResult,
        layout: HaveSearchBarLayout,
    },
    {
        path: config.routes.postmng,
        component: PostManagement,
        layout: HaveSidebarLayout,
    },

    {
        path: config.routes.message,
        component: Message,
    },
    {
        path: config.routes.post,
        component: Post,
        layout: HaveSidebarLayout,
    },

    {
        path: config.routes.postlist,
        component: PostList,
        layout: HaveSidebarLayout,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: HaveSidebarLayout,
    },
    {
        path: config.routes.password,
        component: Password,
        layout: HaveSidebarLayout,
    },
    {
        path: config.routes.postListOfUser,
        component: PostListOfUser,
        layout: DefaultLayout,
    },
    {
        path: config.routes.forgotPassword,
        component: ForgotPassword,
        layout: DefaultLayout,
    },

    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.search, component: Search },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
