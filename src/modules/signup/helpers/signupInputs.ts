import {InputFormat} from '../../../interfaces/InputFormat';

export const inputs: InputFormat[] = [
  {
    key: 'name-input',
    type: 'text',
    name: 'name',
    labelTitle: 'username',
    errorMessage: 'The username is required',
    keyboardType: 'default',
    placeHolder: 'Discord Username',
    editable: false,
  },
  {
    key: 'password-input',
    type: 'password',
    name: 'password',
    labelTitle: 'Password',
    errorMessage: 'The password should be at least 6 characters',
    keyboardType: 'default',
    placeHolder: 'Create Password',
    editable: true,
  },
  {
    key: 'password-repeat-input',
    type: 'password',
    name: 'confirmPassword',
    labelTitle: 'Password',
    errorMessage: 'The password must match',
    keyboardType: 'default',
    placeHolder: 'Re-Enter Password',
    editable: true,
  },
];
