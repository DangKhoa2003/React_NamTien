// Pages
import Home from '~/pages/Home';
import Iron from '~/pages/Iron';
import Stair from '~/pages/Stair';
import Roof from '~/pages/Roof';
import Fence from '~/pages/Fence';
import AluminumDoor from '~/pages/AluminumDoor';
import Bulkhead from '~/pages/Bulkhead';
import Contact from '~/pages/Contact';
import NewProduct from '~/pages/NewProduct';
import Login from '~/pages/Login';
import EditBanner from '~/pages/EditBanner';
import Post from '~/pages/Post';
import Company from '~/pages/Company';
import VideoYT from '~/pages/VideoYT';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/iron', component: Iron },
    { path: '/stair', component: Stair },
    { path: '/roof', component: Roof },
    { path: '/fence', component: Fence },
    { path: '/aluminumDoor', component: AluminumDoor },
    { path: '/bulkhead', component: Bulkhead },
    { path: '/contact', component: Contact },
    { path: '/newProduct', component: NewProduct },
    { path: '/admin', component: Login },
    { path: '/banner', component: EditBanner },
    { path: '/post', component: Post },
    { path: '/company', component: Company },
    { path: '/videoYT', component: VideoYT },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
