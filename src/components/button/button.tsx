import React, { ElementType, MouseEventHandler, ReactNode } from 'react'
import { StyledButton } from './styled';
import { ComponentSize } from '../../config/sizes';

export type ButtonType = 'default' | 'danger' | 'ghost' | 'secondary';

interface BaseButtonProps {
  type?: ButtonType;
  icon?: ElementType;
  size?: ComponentSize;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

type HTMLButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps;

type HTMLAnchorProps = {
  href?: string;
} & BaseButtonProps;

/**
 * For React Router Link
 */
type CustomNodeProps = {
  as?: ElementType;
  to?: string
} & BaseButtonProps;

export type ButtonProps = HTMLButtonProps & HTMLAnchorProps & CustomNodeProps;

const Button: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    type = 'default',
    icon,
    size = 'default',
    className,
    children,
    disabled = false,
    loading,
    onClick,
    href,
    as,
    to
  } = props;

  const styles = {
    innerType: type,
    size,
    disabled,
    withText: children !== null
  }

  if(as) {
    return(
      <StyledButton
        as={as}
        to={to}
        ref={ref}
        className={className}
        {...styles}
      >
        {loading ? 'loading...': children}
      </StyledButton>
    )
  }
  
  if(href) {
    return(
      <StyledButton
        ref={ref as React.MutableRefObject<HTMLButtonElement>}
        className={className}
        {...styles}
      >
        {loading ? 'loading...': children}
      </StyledButton>
    )
  }

  return (
    <StyledButton
        type='button'
        onClick={onClick}
        ref={ref as React.MutableRefObject<HTMLButtonElement>}
        className={className}
        {...styles}
      >
        {loading ? 'loading...': children}
      </StyledButton>
  )
  
}

export default React.forwardRef<unknown, ButtonProps>(Button);
