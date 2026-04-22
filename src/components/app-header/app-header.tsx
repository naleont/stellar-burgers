import { FC } from 'react';
import { AppHeaderUI } from '@ui';

export interface AppHeaderProps {
  userName: string | undefined;
}

export const AppHeader: FC<AppHeaderProps> = (props) => {
  const { userName } = props;
  return <AppHeaderUI userName={userName} />;
};
