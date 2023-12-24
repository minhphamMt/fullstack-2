export const adminMenu = [
  {
    //hệ thống admin
    name: "menu.admin.manage-user",
    menus: [
      { name: "menu.admin.crud", link: "/system/user-manage" },
      { name: "menu.admin.crud-redux", link: "/system/user-redux" },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.user-redux",
        //
        //   },
        // ],
      },
      { name: "menu.admin.manage-admin", link: "/system/admin" },
    ],
  },
  {
    //hệ thống phòng khám
    name: "menu.admin.manage-clinic",
    menus: [
      { name: "menu.admin.manage-clinic", link: "/system/manage-clinic" },
    ],
  },
  {
    //hệ thống chuyên khoa
    name: "menu.admin.manage-specialty",
    menus: [
      { name: "menu.admin.manage-specialty", link: "/system/manage-specialty" },
    ],
  },
  {
    //quản lý cẩm nang handbook
    name: "menu.admin.manage-handbook",
    menus: [
      { name: "menu.admin.manage-handbook", link: "/system/manage-handbook" },
    ],
  },
];
