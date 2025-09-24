import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  role_id: Yup.number().required('Kindly select a role').label('Role').nullable(),
  group_id: Yup.number().required('Kindly select a Group').label('Group ID').nullable(),
  finalUserlist: Yup.array().min(1, 'Select atleast one User'),
});
const validationEditSchema = Yup.object().shape({
  role_id: Yup.number().required('Kindly select a role').label('Role').nullable(),
  group_id: Yup.number().required('Kindly select a Group').label('Group ID').nullable(),
});

const initialValues = {
  group_id: null,
  role_id: null,
  Userslist: [],
  finalUserlist: [],
  userAccess: {
    access_id: false,
    users: false,
    user_add: false,
    user_edit: false,
    user_delete: false,
    user_view: false,
    employees: false,
    employees_add: false,
    employees_edit: false,
    employees_delete: false,
    employees_view: false,
    groups: false,
    groups_add: false,
    groups_edit: false,
    groups_delete: false,
    groups_view: false,
    reports: false,
    reports_add: false,
    reports_edit: false,
    reports_delete: false,
    reports_view: false,
    roles: false,
    role_add: false,
    role_edit: false,
    role_delete: false,
    role_view: false,
    leaves: false,
    leaves_add: false,
    leaves_edit: false,
    leaves_delete: false,
    leaves_view: false,
    salary: false,
    salary_add: false,
    salary_edit: false,
    salary_delete: false,
    salary_view: false,
    documents: false,
    documents_add: false,
    documents_edit: false,
    documents_delete: false,
    documents_view: false,
    holiday: false,
    referral: false,
    attendance: false,
    projectinfo: false,
    attendance: false,
    timesheet: false,
    admin_salaryslips: false,
  },
  checked: [],
};
const initialEditValues = {
  group_id: null,
  role_id: null,
  userAccess: {
    access_id: false,
    users: false,
    user_add: false,
    user_edit: false,
    user_delete: false,
    user_view: false,
    employees: false,
    employees_add: false,
    employees_edit: false,
    employees_delete: false,
    employees_view: false,
    groups: false,
    groups_add: false,
    groups_edit: false,
    groups_delete: false,
    groups_view: false,
    reports: false,
    reports_add: false,
    reports_edit: false,
    reports_delete: false,
    reports_view: false,
    roles: false,
    role_add: false,
    role_edit: false,
    role_delete: false,
    role_view: false,
    leaves: false,
    leaves_add: false,
    leaves_edit: false,
    leaves_delete: false,
    leaves_view: false,
    salary: false,
    salary_add: false,
    salary_edit: false,
    salary_delete: false,
    salary_view: false,
    documents: false,
    documents_add: false,
    documents_edit: false,
    documents_delete: false,
    documents_view: false,
    holiday: false,
    referral: false,
    attendance: false,
    projectinfo: false,
    attendance: false,
    timesheet: false,
    admin_salaryslips: false,
  },

  checked: [],
};

function getCheckedUsers(usersArr = [], checkedUsers = []) {
  return usersArr.map((user) => ({
    ...user,
    checked: Boolean(checkedUsers.find((res) => res.id === user.id)),
  }));
}

function getRoleAccess(initialObj, responseObj) {
  const newObj = {};
  for (let key in initialObj) {
    if (typeof responseObj[key] === 'number') newObj[key] = responseObj[key] === 1 ? true : false;
    else newObj[key] = false;
  }
  return newObj;
}

function retDashboardAccessObjsToCheckedString(dashboardAccessObjs) {
  return dashboardAccessObjs
    .map((item) => {
      const { client_primary_id, client_id, folder_id, dashboard_id, subcategory_id = null } = item;

      //      if (folder_id === null) return (client_primary_id + '_' + client_id).toString();
      return `${subcategory_id}_${client_primary_id}_${client_id}_${folder_id}_${dashboard_id}`;
    })
    .filter((item) => item !== undefined);
}

const getUsers = (users) => users.map((user) => user.id);

function retDashboardAccessObj(checkedArray) {
  const Dashboard_Access = [];
  const Client_List = [];
  checkedArray
    .map((item) => item.split('_'))
    .map((item) => {
      Dashboard_Access.push({
        subcategory_id: item[0] === 'null' ? null : item[0] || null,
        client_primary_id: item[1] === 'null' ? null : item[1] || null,
        client_id: item[2] === 'null' ? null : item[2] || null,
        folder_id: item[3] === 'null' ? null : item[3] || null,
        dashboard_id: item[4] === 'null' ? null : item[4] || null,
      });
      Client_List.push({
        subcategory_id: item[0] || null,
        client_primary_id: item[1] || null,
        client_id: item[2] || null,
      });
    });
  return {
    dashboard_access: Dashboard_Access,
    Client_List: Client_List.filter((value, index) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        Client_List.findIndex((obj) => {
          return JSON.stringify(obj) === _value;
        })
      );
    }),
  };
}

function retUserAccessObj(obj) {
  let newObj = {};
  for (let key in obj) newObj[key] = obj[key] === true ? 1 : 0;
  if (obj['reports']) newObj['phm'] = newObj['reports'];
  if (obj['snowflake']) newObj['matillion'] = newObj['snowflake'];
  return newObj;
}

//Edit Functions
function compareResponseAndInitialObj(responseObj, initalObj) {
  if (responseObj === undefined) return initalObj;
  const newobj = {};
  const newObj2 = {};
  for (let key in responseObj) {
    if (key in initalObj) newobj[key] = responseObj[key];
  }
  for (let key in newobj) newObj2[key] = newobj[key] === 1 ? true : false;
  return newObj2;
}
function convertDashboardAccessObjsToCheckedString(dashboardAccessObjs) {
  return dashboardAccessObjs
    .map((item) => {
      if (item.folder_id === null)
        return (item.client_primary_id + '_' + item.client_id).toString();
      return (
        item.client_primary_id +
        '_' +
        item.client_id +
        '_' +
        item.folder_id +
        '_' +
        item.dashboard_id
      ).toString();
    })
    .filter((item) => item !== undefined);
}
function createInitalValues(responseObj) {
  if (responseObj.role_access) {
    return {
      ...initialValues,
      userAccess: {
        ...compareResponseAndInitialObj(responseObj.role_access[0], initialEditValues.userAccess),
      },
    };
  }
  return null;
}

export default {
  initialValues,
  initialEditValues,
  validationSchema,
  validationEditSchema,
  getCheckedUsers,
  getRoleAccess,
  retDashboardAccessObjsToCheckedString,
  getUsers,
  retDashboardAccessObj,
  retUserAccessObj,
  createInitalValues,
};
