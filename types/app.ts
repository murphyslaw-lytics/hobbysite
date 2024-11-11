import type { AppProps } from 'next/app'
import { Asset, EmbedEntry, Entry, localeItems, MappedPreview } from './common'
import { CallToAction, ExternalLink, HeaderSection, InternalLink, SectionLink } from './components'

export interface Header extends Entry {
  $?: MappedPreview<Header>;
  logo?: Asset;
  scrolled?: boolean;
  main_navigation?: Navigation[];
  items?: items[];
  locales?: localeItems
}

export interface LangaugeSelector {
  locales?: localeItems
  Opac?: boolean
}

export interface items {
  $?: MappedPreview<items>;
  text?:string
  link?:InternalLink[]
  mega_menu?:{
    sections?:HeaderSection[];
    cta_group?: {
      call_to_action?:CallToAction[]
    }[];
  }[]
}
export interface Navigation extends Entry {
  items: {
    text?:string
    link?:InternalLink[]
    mega_menu?:{
      sections?:{
        title?:string
        link:InternalLink[]
        links: SectionLink[]
      }[];
      cta_group?: {
        call_to_action?:CallToAction[]
      }[];
    }[]
  }[]
  // $?: MappedPreview<Header>;
}
export interface Footer extends EmbedEntry {
  sections?:FooterSection[];
  copyright_info?: string;
  built_by?: string;
  $?: MappedPreview<Footer>;
  logo?: Asset;
}

export interface FooterSection extends FooterLink {
  links: FooterLink[]
}

export interface FooterLink {
  $?: MappedPreview<FooterLink>
  title?: string;
  text?: string
  link: InternalLink[]
  external_link?: ExternalLink
  [key: string]: MappedPreview<FooterLink> | InternalLink[] | ExternalLink | string | undefined;
}
 
export type SingleColLayout = {
  logo?: Asset;
  main_navigation?: Navigation[];
  footer_navigation?: Footer[];
  children: React.ReactNode;
  scrolled?: boolean;
};

export type csWebConfig =   Entry & Header & {
  footer_navigation: Footer[]; 
}

export interface Props {
  appProps:  AppProps
  locale?: string;
  web_config?:csWebConfig | null
}
