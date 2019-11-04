// -------------------------------------------------------
// 本页面内用于添加各种前后端通用路由，注意跟pages文件夹的区别和联系
// routes
//     .add('about')
//     .add('blog', '/blog/:slug')
//     .add('user', '/user/:id', 'profile')
//     .add('/:noname/:lang(en|es)/:wow+', 'complex')
//     .add({name: 'beta', pattern: '/v3', page: 'v3'})
// -------------------------------------------------------
import nextRoutes from "next-routes";

let routes = nextRoutes();

// page1
routes.add("/", "/page1");

export default routes;
export const Link = routes.Link;
