export type IconPropsType = {
  size: number;
  color?: string;
};

export type ButtonPropsType = {
  type?: "submit" | "button" | "reset";
  text: string;
  variant: "primary" | "secondary" | "outline-primary" | "outline-secondary";
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type IconButtonPropsType = {
  icon: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type SearchInputPropsType = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  deleteValue: (event: React.MouseEvent<HTMLSpanElement>) => void;
};

export type TextInputPropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: JSX.Element;
  errorMessage?: string;
  onIconClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export type HeaderPropsType = {
  title: string;
  children?: React.ReactNode;
};

export type UserType = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  phone: string;
  verified: boolean;
  followers: string[];
  followings: string[];
  accountActive: boolean;
};

export type CredentialsType = {
  account: string;
  password: string;
};

export type CredentialsSignUpType = UserType & {
  password: string;
  passwordConfirmation: string;
};

export type TweetType = {
  _id: string;
  text: string;
  hastags: string[];
  location: string;
  media: string[];
  likes: string[];
  comments: string[];
  retweets: string[];
  user: UserType;
};
