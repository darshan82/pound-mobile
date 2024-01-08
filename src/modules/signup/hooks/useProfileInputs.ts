import {useMemo} from 'react';

import * as Yup from 'yup';
import countryList from 'react-select-country-list';
import {InputFormat, InputOption} from '../../../interfaces/InputFormat';

type ToolBox = {
  profileInputs: InputFormat[];
};

type useProfileInputsProps = {
  gendersOptions: InputOption[];
};

export const useProfileInputs = ({
  gendersOptions,
}: useProfileInputsProps): ToolBox => {
  const options = useMemo(() => countryList().getData(), []);

  return {
    profileInputs: [
      {
        key: 'name-input',
        type: 'text',
        name: 'firstName',
        initialValue: '',
        labelTitle: 'first name',
        errorMessage: 'The first name is required',
        keyboardType: 'default',
        placeHolder: 'Enter first name',
        validation: Yup.string().required().min(1, 'a'),
      },
      {
        key: 'last-name-input',
        type: 'text',
        name: 'lastName',
        initialValue: '',
        labelTitle: 'last name',
        errorMessage: 'The last name is required',
        keyboardType: 'default',
        placeHolder: 'Enter last name',
        validation: Yup.string().required().min(1, 'a'),
      },
      {
        key: 'birthDate-input',
        type: 'date',
        name: 'birthDate',
        initialValue: '',
        labelTitle: 'birthday',
        errorMessage: 'The birthday is required',
        keyboardType: 'default',
        placeHolder: 'Select birthday',
        validation: Yup.date().required('a').max(new Date(), 'a'),
      },
      {
        key: 'gender-input',
        type: 'picker',
        name: 'gender',
        initialValue: '',
        labelTitle: 'gender',
        errorMessage: 'The gender is required',
        keyboardType: 'default',
        placeHolder: 'SELECT GENDER',
        options: gendersOptions,
        validation: Yup.string().required().min(1, 'as'),
      },
      {
        key: 'country-input',
        type: 'picker',
        name: 'country',
        initialValue: '',
        labelTitle: 'country',
        errorMessage: 'The country is required',
        keyboardType: 'default',
        placeHolder: 'SELECT COUNTRY',
        options,
        validation: Yup.string().required().min(1, 'as'),
      },
    ],
  };
};
