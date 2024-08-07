import * as Yup from 'yup';

const initialValues = {
  group_id: null,
  group_name: '',
};

const validationSchema = Yup.object().shape({
  group_name: Yup.string().min(2).required('Kindly enter a valid group name').label('Group Name'),
});
const validationEditSchema = Yup.object().shape({
  group_id: Yup.number().required('Kindly select a Group').label('Group ID').nullable(),
});

function createInitalValues(responseObj) {
  console.log('Response Obj======', responseObj[0]);
  console.log('Response Obj group1======', responseObj.group_name);
  // console.log('Response Obj grou2p======', responseObj[0].group_name);
  if (responseObj[0]) {
    return {
      ...initialValues,
      group_id: responseObj[0].group_id,
      group_name: responseObj[0].group_name,
    };
  }
  return null;
}

function retDashboardAccessObj(checkedArray) {
  const Dashboard_Access = [];
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
    });
  return Dashboard_Access;
}

function convertValuesToFormat(formikValuesObj) {
  return retDashboardAccessObj(formikValuesObj);
}

function convertDashboardAccessObjsToCheckedString(dashboardAccessObjs) {
  return dashboardAccessObjs
    .map((item) => {
      const { client_primary_id, client_id, folder_id, dashboard_id, subcategory_id = null } = item;
      return `${subcategory_id}_${client_primary_id}_${client_id}_${folder_id}_${dashboard_id}`;
    })
    .filter((item) => item !== undefined);
}

export default {
  initialValues,
  validationSchema,
  validationEditSchema,
  convertValuesToFormat,
  createInitalValues,
};
