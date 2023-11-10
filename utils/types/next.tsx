import type { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { ReactNode, ReactElement } from 'react';

// next types
interface AuthEnabledComponentConfig {
  auth: {
    role: string;
    loading: string;
    unauthorized: string; // redirect to index url where they can sign in
  };
}

export type AppAuthProps = AppProps & {
  Component: NextComponentType<NextPageContext> &
    Partial<AuthEnabledComponentConfig>;
};

export type LayoutProps = {
  children?: ReactNode;
};

export type SideNavLinkInterface = {
  url: string;
  alt?: string;
  text?: string;
  tagText?: string;
  toggleTag?: boolean;
  icon?: ReactElement;
};

export type FormData = {
  ethereumAddress: string;
  customerName: string;
  phoneNumber: string;
  emailAddress: string;
  acceptTerms: boolean;
};

export type FormError = {
  error: string;
  code: string | null;
  target?: unknown | undefined;
};
