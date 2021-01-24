import { ReactNode } from 'react';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import classes from './Layout.module.scss';

export interface ClientLayoutProps {
  children?: ReactNode;
  disableScrollRestoration?: boolean;
}

function ClientLayoutContent({
  children,
  disableScrollRestoration = false
}: ClientLayoutProps) {
  useScrollRestoration(disableScrollRestoration);

  return (
    <div className={[classes['layout']].join(' ').trim()}>
      <div className={classes['layout-content']}>{children}</div>
    </div>
  );
}

export function ClientLayout(props: ClientLayoutProps) {
  return <ClientLayoutContent {...props} />;
}
