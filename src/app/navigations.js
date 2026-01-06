const sortByName = (a, b) => a.name?.toLowerCase().localeCompare(b.name?.toLowerCase());

export const transformArray = (clients, folderObj, dashboardObj, catnsubcatval) => {
  return clients.map(({ client_id, client_name, client_primary_id, subcategory }) => {
    let condn =
      folderObj[client_id] &&
      Object.values(folderObj[client_id]) &&
      Object.keys(folderObj[client_id]).filter(Boolean).length > 0;
    let children = folderObj[client_id] && Object.values(folderObj[client_id]);

    const newClient = {
      label: <span style={{ color: 'tomato' }}>{client_name}</span>,
      value: `${catnsubcatval}_${client_primary_id}_${client_id}`,
      client_primary_id,
      name: client_name,
      subcategory_name: subcategory,
      client_name,
      id: client_id,
      route: `/dashboard/${client_id}`,
      path: `/dashboard/${client_id}`,
      client_id,
      callDefault: true,
      level: 1,
      icon: 'person',
    };
    if (condn) {
      newClient['children'] = children
        .map(({ folder_id, folder_name }) => {
          let innerChild = null;
          if (dashboardObj && dashboardObj[client_id] && dashboardObj[client_id][folder_id])
            innerChild = Object.values(dashboardObj[client_id][folder_id]);
          const folder = {
            label: <span style={{ color: 'dodgerblue' }}>{folder_name}</span>,
            value: `${catnsubcatval}_${client_primary_id}_${client_id}_${folder_id}`,
            setFolderClient: true,
            name: folder_name,
            subcategory_name: subcategory,
            id: folder_id,
            folder_name,
            client_id,
            folder_id,
            client_name,
            level: 2,
            icon: 'folder',
          };
          if (innerChild)
            folder['children'] = innerChild
              .map(({ dash_id, title }) => ({
                label: <span style={{ color: 'teal' }}>{title}</span>,
                value: `${catnsubcatval}_${client_primary_id}_${client_id}_${folder_id}_${dash_id}`,
                client_id,
                dash_id,
                icon: 'dashboard',
                name: title,
                client_name,
                folder_name,
                subcategory_name: subcategory,
                route: `/dashboard/${client_id + folder_id + dash_id}`,
                path: `/dashboard/${client_id + folder_id + dash_id}`,
                level: 3,
                callDashboard: true,
                folder_id,
              }))
              .sort(sortByName);
          return folder;
        })
        .sort(sortByName);
    }
    return newClient;
  });
};

export const navigations = [{ name: 'Dashboard', path: '/dashboard', icon: 'dashboard' }];

export const createSubCategory = (categoryObj, folders, dashboards) => {
  const onlyClientsArr = [];
  const subCategoryArr = [];

  const keys = Object.keys(categoryObj);
  keys.forEach((item) => {
    if (item === '') {
      onlyClientsArr.push(...transformArray(categoryObj[item], folders, dashboards, null));
    } else if (item.length > 0) {
      const [firstCategory] = categoryObj[item];
      const config = { icon: 'group', level: 0, path: '' };
      const child = {
        ...config,
        label: <span style={{ color: 'tomato' }}>{firstCategory.subcategory}</span>,
        name: firstCategory.subcategory,
        subcategory_id: firstCategory.subcategory_id,
        value: firstCategory.subcategory_id,
        children: transformArray(
          categoryObj[item],
          folders,
          dashboards,
          firstCategory.subcategory_id
        ),
      };
      subCategoryArr.push(child);
    }
  });

  return [...onlyClientsArr, ...subCategoryArr];
};