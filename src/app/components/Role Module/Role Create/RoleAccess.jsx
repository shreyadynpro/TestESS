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

export default function RoleAccess() {
  const { handleChange, values, setFieldValue } = useFormikContext();

  const renderLabel = (labelName) => {
    if (typeof labelName !== 'string') return '';
    const actions = ['add', 'edit', 'delete', 'view'];
    const matchedAction = actions.find((action) => labelName.includes(action));
    return matchedAction ? matchedAction.charAt(0).toUpperCase() + matchedAction.slice(1) : '';
  };

  const handleToggleAll = (moduleName, fields) => {
    const allChecked = fields.every((field) => values[field]);
    fields.forEach((field) => setFieldValue(`${field}`, !allChecked));
    setFieldValue(moduleName, !allChecked);
  };

  const renderFormGroup = (label, moduleName, fields) => (
    <>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControlLabel
            control={
              <AppThemeCheckbox
                onChange={() => handleToggleAll(moduleName, fields)}
                checked={values[moduleName]}
              />
            }
            label={label}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9}>
          {fields.map((field) => (
            <FormControlLabel
              key={field}
              control={
                <AppThemeCheckbox onChange={handleChange(`${field}`)} checked={values[field]} />
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
    <div style={{ width: '100%' }}>
      <style>{styles}</style>
      <p>Role Access</p>
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

      {/* leaves */}
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

      <Divider className="form-group-divider" />

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
    </div>
  );
}
