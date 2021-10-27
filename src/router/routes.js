//import Home from "../views/Home.vue";
const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/auth/Login.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    children: [
      {
        path: "main",
        name: "Main",
        component: () => import("../components/dashboard/Main.vue")
      },
      {
        path: "create-bulk-content",
        name: "Bulk",
        component: () => import("../components/dashboard/Bulk.vue")
      },
      {
        path: "view",
        name: "View",
        component: () => import("../components/dashboard/View.vue")
      },
      {
        path: "calendar",
        name: "Calendar",
        component: () => import("../components/dashboard/Calendar.vue")
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("../components/dashboard/Profile.vue")
      },
    ]
  }
];

export default routes;
