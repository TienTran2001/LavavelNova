const currentPath = {
  login: '/login',
  dashboards: {
    home: '/dashboards/main',
    user: '/dashboards/users',
  },
  materials: {
    home: '/materials/main',
    create: '/materials/create',
    update: '/materials/:id',
  },
  materialCategories: {
    home: '/materials/categories',
    create: '/materials/categories/create',
    update: '/materials/categories/:id',
  },
};

export default currentPath;
