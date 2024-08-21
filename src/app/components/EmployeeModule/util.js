import * as Yup from 'yup';
const initialValues = {
  id: null,
  name: '',
  first_name: '',
  last_name: '',
  mid_name: '',
  email1: '',
  primary_address_state: '',
  dpro_parent_skill: '',
  dpro_designation_offered: '',
  marital_status: '',
};
const CreateEmployeeSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is Required'),
  last_name: Yup.string().required('Last Name is Required'),
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
  CreateEmployeeSchema,
  retRoleAccessObj,
  //validationSchema,
  CreateEmployeeSchema,
};

export default util;
