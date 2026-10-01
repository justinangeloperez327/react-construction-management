export type CompanyThemeId=
  |"al-geemi"
  |"trojan"
  |"kad"
  |"al-sahel"
  |"target"
  |"alec"
  |"saif-bin-darwish"
  |"western-bainoona"
  |"sobha"
  |"general-construction";

export type CompanyTheme={
  id:CompanyThemeId;
  name:string;
  shortName:string;
  colors:{
    primary:string;
    primaryHover:string;
    accent:string;
    soft:string;
    lightBackground:string;
    darkBackground:string;
  };
};

export const companyThemes:CompanyTheme[]=[
  {id:"al-geemi",name:"Al Geemi Contracting Co",shortName:"Al Geemi",colors:{primary:"#244E8A",primaryHover:"#1D3F70",accent:"#D7262E",soft:"#E9EFF8",lightBackground:"#F8FAFC",darkBackground:"#0B1628"}},
  {id:"trojan",name:"Trojan Construction Holding",shortName:"Trojan",colors:{primary:"#031971",primaryHover:"#02145D",accent:"#61A8E3",soft:"#E9F2FC",lightBackground:"#F7F9FF",darkBackground:"#020A2E"}},
  {id:"kad",name:"KAD Construction",shortName:"KAD",colors:{primary:"#2F2B72",primaryHover:"#24205C",accent:"#00AEEF",soft:"#ECECF7",lightBackground:"#F7F8FC",darkBackground:"#11122D"}},
  {id:"al-sahel",name:"Al Sahel Contracting",shortName:"Al Sahel",colors:{primary:"#173F67",primaryHover:"#103452",accent:"#FDBB21",soft:"#EDF3F8",lightBackground:"#F8FAFC",darkBackground:"#0A1C2E"}},
  {id:"target",name:"Target Engineering Construction",shortName:"Target",colors:{primary:"#002855",primaryHover:"#001F44",accent:"#D71920",soft:"#E8EEF4",lightBackground:"#F8FAFC",darkBackground:"#071426"}},
  {id:"alec",name:"ALEC Holdings",shortName:"ALEC",colors:{primary:"#002855",primaryHover:"#001F44",accent:"#6F8294",soft:"#E6EEF5",lightBackground:"#F7F9FB",darkBackground:"#061321"}},
  {id:"saif-bin-darwish",name:"Saif Bin Darwish",shortName:"SBD",colors:{primary:"#082E63",primaryHover:"#062550",accent:"#4D78A8",soft:"#E7EEF6",lightBackground:"#F8FAFC",darkBackground:"#061426"}},
  {id:"western-bainoona",name:"Western Bainoona Group",shortName:"WBG",colors:{primary:"#B80000",primaryHover:"#980000",accent:"#202124",soft:"#F8EAEA",lightBackground:"#FAFAFA",darkBackground:"#101113"}},
  {id:"sobha",name:"Sobha Construction",shortName:"Sobha",colors:{primary:"#1E86A5",primaryHover:"#176B84",accent:"#D8B65C",soft:"#E8F3F6",lightBackground:"#F7FAFA",darkBackground:"#071A1F"}},
  {id:"general-construction",name:"General Construction Co",shortName:"GCC",colors:{primary:"#002F77",primaryHover:"#00265F",accent:"#F07B26",soft:"#EAF1FB",lightBackground:"#F8FAFC",darkBackground:"#07152B"}}
];

export const defaultCompanyTheme:CompanyThemeId="al-geemi";
export const companyThemeIds=new Set<CompanyThemeId>(companyThemes.map(theme=>theme.id));
