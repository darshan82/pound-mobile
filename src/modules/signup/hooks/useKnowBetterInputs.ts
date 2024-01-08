import * as Yup from 'yup';

import {
  InputFormat,
  InputOption,
  InputList,
} from '../../../interfaces/InputFormat';

type ToolBox = {
  knowBetterInputs: InputFormat[];
};

type useKBIProps = {
  commitments: InputOption[];
  goals: InputOption[];
  identities: InputList[];
};

export const useKnowBetterInputs = ({
  commitments,
  goals,
  identities,
}: useKBIProps): ToolBox => {
  return {
    knowBetterInputs: [
      {
        key: 'height',
        type: 'row',
        name: 'height',
        labelTitle: 'Height',
        placeHolder: 'placeHolder',
        rowInputs: [
          {
            key: 'feet-input',
            type: 'text',
            name: 'feet',
            labelTitle: 'Feet',
            errorMessage: 'The feet is required',
            keyboardType: 'number-pad',
            placeHolder: 'Feet',
            initialValue: '',
            validation: Yup.number()
              .required()
              .min(1, 'Enter a feet value between 1 to 7')
              .max(7, 'Enter a feet value between 1 to 7'),
          },
          {
            key: 'inch-input',
            type: 'text',
            name: 'inches',
            labelTitle: 'Inches',
            errorMessage: 'The inches is required',
            keyboardType: 'number-pad',
            placeHolder: 'Inches',
            initialValue: '',
            validation: Yup.number()
              .required()
              .min(0, 'Enter a inches value between 0 to 12')
              .max(12, 'Enter a inches value between 0 to 12'),
          },
        ],
      },
      {
        key: 'weight-input',
        type: 'text',
        name: 'weight',
        labelTitle: 'Weight',
        errorMessage: 'The weight is required',
        keyboardType: 'number-pad',
        placeHolder: 'Select Weight',
        initialValue: '',
        validation: Yup.number().required().min(1, 'min'),
      },
      {
        key: 'want-input',
        type: 'picker',
        name: 'want',
        initialValue: '',
        labelTitle: 'I want to ...',
        errorMessage: 'The want to is required',
        keyboardType: 'default',
        placeHolder: 'Pick one',
        options: goals,
        validation: Yup.string().required().min(1, 'as'),
      },
      {
        key: 'commitment-input',
        type: 'picker',
        name: 'commitment',
        initialValue: '',
        labelTitle: 'I am committed to...',
        errorMessage: 'The commitment to is required',
        keyboardType: 'default',
        placeHolder: 'Pick one',
        options: commitments,
        validation: Yup.string().required().min(1, 'as'),
      },
      {
        key: 'checklist-input',
        type: 'list',
        name: 'apply',
        initialValue: [],
        labelTitle: 'Check all that apply',
        errorMessage: 'Check at least one option',
        keyboardType: 'default',
        placeHolder: 'Pick one',
        list: identities,
        validation: Yup.array().test({
          message: 'array length',
          test: arr => !!arr && arr.length > 0,
        }),
      },
    ],
  };
};
