import { Asset, EmbedEntry, Entry, LivePreviewTypeMapper, localeItems } from './common'
import { ExternalLink, InternalLink } from './common'

// ######################### MAIN LAYOUT #########################
export type MainLayout = {
  logo?: Asset;
  main_navigation?: Navigation[];
  footer_navigation?: Footer[];
  children: React.ReactNode;
  scrolled?: boolean;
};

export type WebConfig =  Entry & Header & {
  footer_navigation: Footer[]; 
  main_navigation: Navigation[];
}

// ######################### HEADER & NAVIGATION #########################
export interface Header extends Entry, Logo {
  scrolled?: boolean;
  items: NavItems[];
  locales?: localeItems
}

export interface Logo {
  logo?: Asset;
}

export interface LangaugeSelector {
  locales?: localeItems
  Opac?: boolean
}

export interface Navigation extends Entry {
  items: NavItems[]
}

export interface NavItems {
  $?: LivePreviewTypeMapper<NavItems>;
  text?: string
  link?: InternalLink[]
  mega_menu?:{
    sections?: MegaMenuSection[];
    cta_group?: {
      call_to_action?: CallToAction[]
    }[];
  }[]
}

export interface MegaMenuSection{
  title?:string
  $? : LivePreviewTypeMapper<MegaMenuSection>
  link:InternalLink[]
  links: SectionLink[]
}

export type CallToAction = {
  text: string
  icon?: Asset
  internal_link?: InternalLink[]
  external_link?: string
  $?: LivePreviewTypeMapper<CallToAction>
}

export interface SectionLink {
  thumbnail?: Asset;
  $?: LivePreviewTypeMapper<SectionLink>;
  text?:string
  link?:InternalLink[],
  link_text?:string
  
}

// ######################### FOOTER #########################
export interface Footer extends EmbedEntry {
  sections?: FooterSection[];
  copyright_info?: string;
  built_by?: string;
  $?: LivePreviewTypeMapper<Footer>;
  logo?: Asset;
}

export interface FooterSection extends FooterLink {
  links: FooterLink[]
}

export interface FooterLink {
  $?: LivePreviewTypeMapper<FooterLink>
  title?: string;
  text?: string
  link: InternalLink[]
  external_link?: ExternalLink
  [key: string]: LivePreviewTypeMapper<FooterLink> | InternalLink[] | ExternalLink | string | undefined;
}
