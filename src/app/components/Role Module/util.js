import * as Yup from 'yup';
const initialValues = {
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
};
const CreateRoleSchema = Yup.object().shape({
  role: Yup.string().required('Role is Required'),
});

function retRoleAccessObj(obj) {
  const newObj = {};
  for (let key in obj) {
    if (typeof obj[key] === 'boolean') {
      newObj[key] = obj[key] === true ? 1 : 0;
    } else newObj[key] = obj[key];
  }
  return newObj;
}

function compareResponseAndInitialObj(responseObj, initalObj) {
  const newObj = { ...initalObj, ...responseObj };
  const newObj2 = {};
  for (let key in newObj) {
    if (typeof newObj[key] === 'number' && (newObj[key] === 0 || newObj[key] === 1)) {
      newObj2[key] = newObj[key] === 1 ? true : false;
    } else newObj2[key] = newObj[key];
  }
  if (responseObj.role_id) newObj2['role_id'] = responseObj['role_id'];
  return newObj2;
}

function createInitalValues(responseObj) {
  if (responseObj[0] && responseObj[0].role)
    return {
      ...compareResponseAndInitialObj(responseObj[0], initialValues),
    };
  return null;
}

const util = {
  initialValues,
  createInitalValues,
  retRoleAccessObj,
  //validationSchema,
  CreateRoleSchema,
};

export default util;
