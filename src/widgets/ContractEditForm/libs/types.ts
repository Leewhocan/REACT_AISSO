import { Control, SubmitHandler } from "react-hook-form";

export interface NewContractForm {
  title: string;
  sum: number;
  description: string;
  tnvedId: string;
  countryId: string;
  image: string;
}

export interface ContractEditFormProps {
  control: Control<NewContractForm>;
  handleSubmit: (
    onSubmit: SubmitHandler<NewContractForm>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<NewContractForm>;
  isLoading: boolean;
  showButton: boolean;
}
