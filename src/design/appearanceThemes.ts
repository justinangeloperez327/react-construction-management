export type AppearanceThemeId="default"|"coffee"|"mint"|"forest"|"office";

export type AppearanceTheme={
  id:AppearanceThemeId;
  name:string;
  swatches:[string,string,string];
};

export const appearanceThemes:AppearanceTheme[]=[
  {id:"default",name:"Default",swatches:["#2563EB","#EFF6FF","#F8FAFC"]},
  {id:"coffee",name:"Coffee",swatches:["#8A5638","#EEDFD1","#F8F3EE"]},
  {id:"mint",name:"Mint",swatches:["#0F766E","#DCF5EC","#F2FBF7"]},
  {id:"forest",name:"Forest",swatches:["#1F6B3A","#DCEEDD","#F4F8F2"]},
  {id:"office",name:"Office",swatches:["#475569","#E9EEF3","#F6F7F9"]}
];

export const appearanceThemeIds=new Set<AppearanceThemeId>(appearanceThemes.map(theme=>theme.id));
export const defaultAppearanceTheme:AppearanceThemeId="default";
