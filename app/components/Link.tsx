import React, { forwardRef, Children } from 'react';
import { Link as RadixLink } from '@radix-ui/themes';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <NextLink href={href} passHref legacyBehavior>
        <RadixLink ref={ref} className={className} {...props}>
          {children}
        </RadixLink>
      </NextLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;
