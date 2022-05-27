export interface Theme {
  id: number;
  name: string;
  sidebarBackground: string;
  sidebarText: string;
  boardBackground: string;
  sidebarLinksHover: string;
  topnavBackground: string;
}
export interface Themes {
  LightBlue: Theme;
  DarkMode: Theme;
}

export const LightBlueTheme: Theme = {
  name: 'LightBlue',
  sidebarBackground: '#17aaaf',
  sidebarText: '#091e42',
  sidebarLinksHover: '#091e422e',
  boardBackground: '#59d9dd',
  topnavBackground: '#1d919d',
  id: 1,
};
export const DarkMode: Theme = {
  name: 'DarkMode',
  sidebarBackground: '#000000e8',
  sidebarText: '#ffffff',
  sidebarLinksHover: '#747474',
  boardBackground: '#2e2e2e',
  topnavBackground: '#000000e8',
  id: 2,
};

export const Themes: Themes = {
  LightBlue: LightBlueTheme,
  DarkMode: DarkMode,
};
