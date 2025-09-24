import { Margin } from '@mui/icons-material';
import { Divider, FormControlLabel, Grid } from '@mui/material';
import AppThemeCheckbox from 'app/components/ReusableComponents/AppThemeCheckbox';
import { useFormikContext } from 'formik';

const styles = `
@media (min-width: 960px) {
  .form-group-divider {
    display: none;
  }
}
`;

export default function UserAccess() {
  const { handleChange, values, setFieldValue } = useFormikContext();

  const renderLabel = (labelName) => {
    if (typeof labelName !== 'string') return '';
    const actions = ['add', 'edit', 'delete', 'view'];
    const matchedAction = actions.find((action) => labelName.includes(action));
    return matchedAction ? matchedAction.charAt(0).toUpperCase() + matchedAction.slice(1) : '';
  };

  const handleToggleAll = (moduleName, fields) => {
    const allChecked = fields.every((field) => values.userAccess[field]);
    fields.forEach((field) => setFieldValue(`userAccess.${field}`, !allChecked));
    setFieldValue(`userAccess.${moduleName}`, !allChecked);
  };

  const renderFormGroup = (label, moduleName, fields) => (
    <>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <AppThemeCheckbox
                onChange={() => handleToggleAll(moduleName, fields)}
                checked={values.userAccess[moduleName]}
              />
            }
            label={label}
            sx={{ mr: 8 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9}>
          {fields.map((field) => (
            <FormControlLabel
              key={field}
              control={
                <AppThemeCheckbox
                  onChange={handleChange(`userAccess.${field}`)}
                  checked={values.userAccess[field]}
                />
              }
              label={renderLabel(field)}
            />
          ))}
        </Grid>
      </Grid>
      <Divider className="form-group-divider" />
    </>
  );

  return (
    <div style={{ width: '100%', marginLeft: '35px' }}>
      <style>{styles}</style>
      <h3>User Access</h3>
      {/* Users */}
      {renderFormGroup('Users', 'users', ['user_add', 'user_edit', 'user_delete', 'user_view'])}

      <Divider className="form-group-divider" />

      {/* Group */}
      {renderFormGroup('Group', 'groups', [
        'groups_add',
        'groups_edit',
        'groups_delete',
        'groups_view',
      ])}

      {/* Roles */}
      {renderFormGroup('Roles', 'roles', ['role_add', 'role_edit', 'role_delete', 'role_view'])}

      {/* Clients */}
      {renderFormGroup('Leaves', 'leaves', [
        'leaves_add',
        'leaves_edit',
        'leaves_delete',
        'leaves_view',
      ])}

      {/* Reports */}
      {renderFormGroup('Reports', 'reports', [
        'reports_add',
        'reports_edit',
        'reports_delete',
        'reports_view',
      ])}
      {/* Generate Reports */}
      {renderFormGroup('Salary', 'salary', [
        'salary_add',
        'salary_edit',
        'salary_delete',
        'salary_view',
      ])}
      {/* Employess */}
      {renderFormGroup('Employess', 'employees', [
        'employees_add',
        'employees_edit',
        'employees_delete',
        'employees_view',
      ])}
      {/* documents */}
      {renderFormGroup('Documents', 'documents', [
        'documents_add',
        'documents_edit',
        'documents_delete',
        'documents_view',
      ])}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControlLabel
          control={
            <AppThemeCheckbox
              onChange={() => setFieldValue('userAccess.referral', !values.userAccess.referral)}
              checked={values.userAccess.referral}
            />
          }
          label="Referral"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControlLabel
          control={
            <AppThemeCheckbox
              onChange={() =>
                setFieldValue('userAccess.projectinfo', !values.userAccess.projectinfo)
              }
              checked={values.userAccess.projectinfo}
            />
          }
          label="Project Information"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControlLabel
          control={
            <AppThemeCheckbox
              onChange={() => setFieldValue('userAccess.holiday', !values.userAccess.holiday)}
              checked={values.userAccess.holiday}
            />
          }
          label="Holiday"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControlLabel
          control={
            <AppThemeCheckbox
              onChange={() => setFieldValue('userAccess.attendance', !values.userAccess.attendance)}
              checked={values.userAccess.attendance}
            />
          }
          label="Attendance"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControlLabel
          control={
            <AppThemeCheckbox
              onChange={() =>
                setFieldValue('userAccess.admin_salaryslips', !values.userAccess.admin_salaryslips)
              }
              checked={values.userAccess.admin_salaryslips}
            />
          }
          label="Admin Salaryslips"
        />
      </Grid>

{/* modified for timesheet */}

<Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControlLabel
          control={
            <AppThemeCheckbox
              onChange={() =>
                setFieldValue('userAccess.timesheet', !values.userAccess.timesheet)
              }
              checked={values.userAccess.timesheet}
            />
          }
          label="Timesheet"
        />
      </Grid>

      <Divider className="form-group-divider" />
    </div>
  );
}
