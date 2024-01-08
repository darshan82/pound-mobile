import {KeyboardTypeOptions} from 'react-native';

export interface InputOption {
  label: string;
  value: string;
}

export interface InputList {
  checked: boolean;
  label: string;
}

export interface InputFormat {
  key: string;
  rowInputs?: InputFormat[];
  type: 'text' | 'password' | 'picker' | 'range' | 'date' | 'list' | 'row';
  name: string;
  initialValue?: any;
  labelTitle: string;
  errorMessage?: string;
  keyboardType?: KeyboardTypeOptions;
  placeHolder: string;
  options?: InputOption[];
  list?: InputList[];
  validation?: any;
  range?: {min: number; max: number};
  editable?: boolean;
}
