import * as Yup from 'yup';

const initialValues = {
  personalInfo: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    group_id: null,
    role_id: null,
  },
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

const EditUserSchema = Yup.object().shape({
  personalInfo: Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .label('Firstname'),
    last_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .label('Lastname'),
    email: Yup.string().email('Invalid email').required('Required').label('Email'),
    role_id: Yup.number().required('Kindly select a role').label('Role').nullable(),
    group_id: Yup.number().required('Kindly select a Group').label('Group').nullable(),
  }),
});

//  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
const CreateUserSchema = Yup.object().shape({
  personalInfo: Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .label('Firstname'),
    last_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .label('Lastname'),
    email: Yup.string().email('Invalid email').required('Required').label('Email'),
    password: Yup.string()
      .when('employeeType', {
        is: 'Billable', // Apply rules if employeeType is "Billable"
        then: Yup.string()
          .required(
            'Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case Character'
          )
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case Character'
          )
          .max(16, 'Too Long!'),
        otherwise: Yup.string().max(16, 'Too Long!'), // Optional for "Non-Billable"
      })
      .label('Password'),
    role_id: Yup.number().required('Kindly select a role').label('Role').nullable(),
    group_id: Yup.number().required('Kindly select a Group').label('Group').nullable(),
    employeeType: Yup.string().required('Please select an employee type').label('Employee Type'),
  }),
});

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
    Dashboard_Access: Dashboard_Access,
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
  return newObj;
}
function retRoleAccessObj(obj) {
  let newObj = {};
  for (let key in obj) newObj[key] = obj[key] === 1 ? true : false;

  return newObj;
}

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

function createInitalValues(responseObj) {
  if (responseObj.user_details && responseObj.role_access)
    return {
      personalInfo: {
        ...responseObj.user_details[0],
        group_id: responseObj.user_details[0].group_id,
        first_name: responseObj.user_details[0].first_name,
      },
      userAccess: {
        ...compareResponseAndInitialObj(responseObj.role_access[0], initialValues.userAccess),
      },
      dashboardAccess: {
        Dashboard_Access: [],
        Client_List: [],
      },
    };
  return null;
}

function transformUserAccessObj(initalObj, responseObj = {}) {
  const obj = {};
  for (let key in responseObj) {
    if (key in initalObj) obj[key] = responseObj[key];
  }
  return obj;
}

const util = {
  initialValues,
  CreateUserSchema,
  EditUserSchema,
  createInitalValues,
  retDashboardAccessObj,
  retUserAccessObj,
  retRoleAccessObj,
  transformUserAccessObj,
};

export default util;
