'use client';

import React, { forwardRef } from 'react';
import { Link as RadixLink } from '@radix-ui/themes';
import NextLink from 'next/link';

interface LinkProps extends React.ComponentProps<typeof RadixLink> {
  href: string;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <RadixLink asChild ref={ref} {...props}>
        <NextLink href={href}>{children}</NextLink>
      </RadixLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;
