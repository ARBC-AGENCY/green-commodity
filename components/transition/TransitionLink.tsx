"use client";

import Link, { type LinkProps } from "next/link";
import { type AnchorHTMLAttributes, type MouseEvent } from "react";
import { useTransitionOverlay } from "./TransitionProvider";

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    label?: string;
  };

/** Drop-in replacement for next/link that plays the page-transition overlay first. */
export function TransitionLink({
  href,
  label,
  onClick,
  children,
  ...rest
}: TransitionLinkProps) {
  const { navigateWithTransition } = useTransitionOverlay();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const isModified =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (isModified || event.button !== 0) return;

    event.preventDefault();
    navigateWithTransition(href.toString(), label);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
