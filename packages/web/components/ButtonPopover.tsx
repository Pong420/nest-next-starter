import React, { useEffect, useState } from 'react';
import {
  Button,
  Popover,
  IButtonProps,
  IPopoverProps
} from '@blueprintjs/core';

export interface ButtonPopoverProps
  extends IButtonProps,
    Pick<IPopoverProps, 'position' | 'content'> {
  popoverProps?: IPopoverProps;
}

// https://stackoverflow.com/a/4819886
export function isTouchable() {
  if (typeof window === 'undefined') {
    return false;
  }

  if ('ontouchstart' in window || window.navigator.msMaxTouchPoints)
    return true;

  // eslint-disable-next-line
  // @ts-ignore
  if ('DocumentTouch' in window && document instanceof DocumentTouch)
    return true;

  const prefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-'];
  const queries = prefixes.map(prefix => `(${prefix}touch-enabled)`);

  return window.matchMedia(queries.join(',')).matches;
}

export const ButtonPopover = React.forwardRef<any, ButtonPopoverProps>(
  ({ popoverProps, content, position = 'bottom', disabled, ...props }, ref) => {
    const [disablePopover, setDisablePopover] = useState(false);
    const button = <Button ref={ref} disabled={disabled} {...props} />;

    useEffect(() => {
      setDisablePopover(isTouchable());
    }, []);

    return (
      <>
        {content && !disablePopover ? (
          <Popover
            popoverClassName={'button-popover'}
            interactionKind="hover-target"
            hoverOpenDelay={0}
            hoverCloseDelay={0}
            content={content}
            position={position}
            disabled={disabled}
            {...popoverProps}
          >
            {button}
          </Popover>
        ) : (
          button
        )}
        {/* <style jsx global>
          {`
            .button-popover {
              .#{$ns}-popover-content {
                padding: $pt-grid-size/2 $pt-grid-size;
                white-space: nowrap;
              }
            }
          `}
        </style> */}
      </>
    );
  }
);
