import { useState, useEffect, useRef, useCallback } from "react";
import {
  Heart, Users, Ruler, Eye, Scissors, Dumbbell, GraduationCap, Cigarette,
  Baby, MapPin, ChevronLeft, Sparkles, Target,
  UserCircle, Flame, Brain, ArrowRight, RotateCcw,
  Zap, TrendingDown, Search, Coffee, Wine, Check
} from "lucide-react";

// ─── CONFIGURATION PUB & AFFILIATION ─────
// Remplace par ton vrai ID AdSense et ton lien affilié
const ADSENSE_CLIENT = "ca-pub-7149920833436766";
const AFFILIATE_URL = "https://www.meetic.fr"; // ← ton lien affilié ici (Meetic, Parship, etc.)
const AFFILIATE_LABEL = "Meetic";

// Composant Google AdSense
function AdBanner({ slot, format = "auto", className = "" }) {
  const adRef = useRef(null);
  const pushed = useRef(false);
  useEffect(() => {
    if (adRef.current && !pushed.current) {
      pushed.current = true;
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
    }
  }, []);
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <ins className="adsbygoogle"
        ref={adRef}
        style={{ display: "block", minHeight: 50 }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true" />
    </div>
  );
}

// Bouton CTA affilié
function AffiliateButton({ count }) {
  const msg = count > 100000
    ? `${count.toLocaleString("fr-FR")} personnes vous correspondent — lancez-vous !`
    : count > 10000
    ? "Ils existent, il ne reste plus qu'à les trouver !"
    : count > 1000
    ? "Ils sont rares mais ils existent — allez à leur rencontre !"
    : count > 100
    ? "Quelques dizaines de perles rares vous attendent quelque part..."
    : count > 10
    ? "Moins de 100 en France... chaque rencontre pourrait être la bonne !"
    : count > 0
    ? "Ils se comptent sur les doigts d'une main — tentez votre chance !"
    : "Et si vous assoupliez un critère ? En attendant, explorez !";
  return (
    <a href={AFFILIATE_URL} target="_blank" rel="noopener noreferrer sponsored"
      className="block w-full mt-4 py-3.5 rounded-xl font-semibold text-white text-center text-sm overflow-hidden relative group"
      style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)", boxShadow: "0 0 25px rgba(244,63,94,0.3)" }}>
      <span className="relative z-10 flex items-center justify-center gap-2">
        <Search size={16} className="group-hover:scale-110 transition-transform" />
        {msg}
      </span>
    </a>
  );
}

// Lien affilié discret
function AffiliateLink() {
  return (
    <a href={AFFILIATE_URL} target="_blank" rel="noopener noreferrer sponsored"
      className="inline-flex items-center gap-1 text-xs mt-2 transition-colors"
      style={{ color: "rgba(236,72,153,0.5)" }}
      onMouseEnter={e => e.target.style.color = "rgba(236,72,153,0.8)"}
      onMouseLeave={e => e.target.style.color = "rgba(236,72,153,0.5)"}>
      <Heart size={10} /> Sponsorisé par {AFFILIATE_LABEL}
    </a>
  );
}

const POPULATION_FRANCE = 68_000_000;

const DATA = {
  sexe: { homme: 0.484, femme: 0.516 },
  orientation: { hetero: 0.93, homo: 0.04, bi: 0.03 },
  age_adult: { mean: 45, std: 15.5 },
  celibataire_by_age_continuous: [
    { age: 18, rate: 0.85 }, { age: 22, rate: 0.78 }, { age: 25, rate: 0.58 },
    { age: 28, rate: 0.42 }, { age: 30, rate: 0.35 }, { age: 33, rate: 0.28 },
    { age: 35, rate: 0.25 }, { age: 40, rate: 0.22 }, { age: 45, rate: 0.20 },
    { age: 50, rate: 0.20 }, { age: 55, rate: 0.22 }, { age: 60, rate: 0.28 },
    { age: 65, rate: 0.32 }, { age: 70, rate: 0.38 }, { age: 80, rate: 0.50 },
    { age: 90, rate: 0.60 }, { age: 99, rate: 0.65 }
  ],
  taille_homme: { mean: 175.6, std: 7.1 },
  taille_femme: { mean: 162.5, std: 6.4 },
  yeux: { marron: 0.40, bleu: 0.28, vert: 0.15, noisette: 0.12, gris: 0.05 },
  cheveux: { brun: 0.45, chatain: 0.25, blond: 0.18, roux: 0.04, noir: 0.06, gris_blanc: 0.02 },
  silhouette: { mince: 0.22, normale: 0.35, athletique: 0.15, ronde: 0.20, forte: 0.08 },
  diplome: { sans: 0.23, bac: 0.20, bac2: 0.15, bac3: 0.14, bac5: 0.22, doctorat: 0.06 },
  diplome_par_age_factor: {
    "18-24": { bac5: 0.3, doctorat: 0.05 }, "25-29": { bac5: 1.2, doctorat: 0.4 },
    "30-34": { bac5: 1.3, doctorat: 0.8 }, "35-39": { bac5: 1.1, doctorat: 1.0 },
    "40-49": { bac5: 0.9, doctorat: 1.1 }, "50-59": { bac5: 0.7, doctorat: 1.0 },
    "60+": { bac5: 0.5, doctorat: 0.8 }
  },
  fumeur: { non: 0.68, occasionnel: 0.08, oui: 0.24 },
  sport: { jamais: 0.35, occasionnel: 0.30, regulier: 0.25, intensif: 0.10 },
  // Religion (IFOP/INED surveys France)
  religion: {
    catholique: 0.29, musulman: 0.10, protestant: 0.02,
    juif: 0.008, bouddhiste: 0.005, orthodoxe: 0.01,
    autre_religion: 0.007, sans_religion: 0.51, spirituel: 0.05
  },
  // Origine / apparence ethnique (INED TeO surveys, estimations France métropolitaine + DOM)
  origine: {
    europeenne: 0.72, maghrebine: 0.10, afro_caribbeenne: 0.06,
    subsaharienne: 0.04, asiatique: 0.03, metisse: 0.03,
    moyen_orientale: 0.015, autre_origine: 0.005
  },
  enfants: { veut: 0.45, ne_veut_pas: 0.30, a_deja: 0.25 },
  enfants_par_age_factor: {
    "18-24": { veut: 1.4, ne_veut_pas: 1.6, a_deja: 0.1 },
    "25-29": { veut: 1.3, ne_veut_pas: 1.0, a_deja: 0.4 },
    "30-34": { veut: 1.1, ne_veut_pas: 0.8, a_deja: 0.9 },
    "35-39": { veut: 0.8, ne_veut_pas: 0.7, a_deja: 1.4 },
    "40-49": { veut: 0.4, ne_veut_pas: 0.9, a_deja: 1.6 },
    "50-59": { veut: 0.1, ne_veut_pas: 1.1, a_deja: 1.5 },
    "60+": { veut: 0.05, ne_veut_pas: 1.2, a_deja: 1.4 }
  },
};

const CITIES = [
  { name: "Paris", dep: "75", pop: 2133 }, { name: "Marseille", dep: "13", pop: 873 },
  { name: "Lyon", dep: "69", pop: 522 }, { name: "Toulouse", dep: "31", pop: 504 },
  { name: "Nice", dep: "06", pop: 342 }, { name: "Nantes", dep: "44", pop: 323 },
  { name: "Montpellier", dep: "34", pop: 302 }, { name: "Strasbourg", dep: "67", pop: 290 },
  { name: "Bordeaux", dep: "33", pop: 260 }, { name: "Lille", dep: "59", pop: 236 },
  { name: "Rennes", dep: "35", pop: 225 }, { name: "Reims", dep: "51", pop: 182 },
  { name: "Saint-Étienne", dep: "42", pop: 177 }, { name: "Le Havre", dep: "76", pop: 169 },
  { name: "Toulon", dep: "83", pop: 176 }, { name: "Grenoble", dep: "38", pop: 158 },
  { name: "Dijon", dep: "21", pop: 160 }, { name: "Angers", dep: "49", pop: 157 },
  { name: "Nîmes", dep: "30", pop: 148 }, { name: "Villeurbanne", dep: "69", pop: 155 },
  { name: "Clermont-Ferrand", dep: "63", pop: 147 }, { name: "Aix-en-Provence", dep: "13", pop: 145 },
  { name: "Le Mans", dep: "72", pop: 144 }, { name: "Brest", dep: "29", pop: 139 },
  { name: "Tours", dep: "37", pop: 138 }, { name: "Amiens", dep: "80", pop: 134 },
  { name: "Limoges", dep: "87", pop: 130 }, { name: "Annecy", dep: "74", pop: 133 },
  { name: "Perpignan", dep: "66", pop: 121 }, { name: "Boulogne-Billancourt", dep: "92", pop: 121 },
  { name: "Metz", dep: "57", pop: 120 }, { name: "Besançon", dep: "25", pop: 120 },
  { name: "Orléans", dep: "45", pop: 116 }, { name: "Rouen", dep: "76", pop: 115 },
  { name: "Mulhouse", dep: "68", pop: 109 }, { name: "Caen", dep: "14", pop: 108 },
  { name: "Nancy", dep: "54", pop: 105 }, { name: "Saint-Denis (93)", dep: "93", pop: 113 },
  { name: "Argenteuil", dep: "95", pop: 110 }, { name: "Montreuil", dep: "93", pop: 109 },
  { name: "Roubaix", dep: "59", pop: 99 }, { name: "Tourcoing", dep: "59", pop: 98 },
  { name: "Dunkerque", dep: "59", pop: 87 }, { name: "Avignon", dep: "84", pop: 92 },
  { name: "Nanterre", dep: "92", pop: 96 }, { name: "Créteil", dep: "94", pop: 93 },
  { name: "Poitiers", dep: "86", pop: 90 }, { name: "Versailles", dep: "78", pop: 85 },
  { name: "Courbevoie", dep: "92", pop: 84 }, { name: "Vitry-sur-Seine", dep: "94", pop: 94 },
  { name: "Pau", dep: "64", pop: 78 }, { name: "Colombes", dep: "92", pop: 86 },
  { name: "Aulnay-sous-Bois", dep: "93", pop: 86 }, { name: "Asnières-sur-Seine", dep: "92", pop: 88 },
  { name: "Rueil-Malmaison", dep: "92", pop: 81 }, { name: "La Rochelle", dep: "17", pop: 80 },
  { name: "Antibes", dep: "06", pop: 74 }, { name: "Saint-Maur-des-Fossés", dep: "94", pop: 77 },
  { name: "Calais", dep: "62", pop: 73 }, { name: "Champigny-sur-Marne", dep: "94", pop: 78 },
  { name: "Aubervilliers", dep: "93", pop: 87 }, { name: "Béziers", dep: "34", pop: 79 },
  { name: "Bourges", dep: "18", pop: 66 }, { name: "Cannes", dep: "06", pop: 75 },
  { name: "Saint-Nazaire", dep: "44", pop: 72 }, { name: "Colmar", dep: "68", pop: 70 },
  { name: "Quimper", dep: "29", pop: 63 }, { name: "Valence", dep: "26", pop: 65 },
  { name: "Drancy", dep: "93", pop: 72 }, { name: "Mérignac", dep: "33", pop: 73 },
  { name: "Ajaccio", dep: "2A", pop: 73 }, { name: "Levallois-Perret", dep: "92", pop: 66 },
  { name: "Troyes", dep: "10", pop: 62 }, { name: "Issy-les-Moulineaux", dep: "92", pop: 70 },
  { name: "Noisy-le-Grand", dep: "93", pop: 69 }, { name: "Villeneuve-d'Ascq", dep: "59", pop: 63 },
  { name: "Neuilly-sur-Seine", dep: "92", pop: 61 }, { name: "La Seyne-sur-Mer", dep: "83", pop: 65 },
  { name: "Antony", dep: "92", pop: 63 }, { name: "Lorient", dep: "56", pop: 58 },
  { name: "Sarcelles", dep: "95", pop: 59 }, { name: "Pessac", dep: "33", pop: 65 },
  { name: "Ivry-sur-Seine", dep: "94", pop: 64 }, { name: "Cergy", dep: "95", pop: 67 },
  { name: "Chambéry", dep: "73", pop: 60 }, { name: "Niort", dep: "79", pop: 60 },
  { name: "Clichy", dep: "92", pop: 63 }, { name: "Montauban", dep: "82", pop: 62 },
  { name: "Beauvais", dep: "60", pop: 57 }, { name: "Cholet", dep: "49", pop: 55 },
  { name: "Saint-Quentin", dep: "02", pop: 54 }, { name: "Vannes", dep: "56", pop: 55 },
  { name: "Charleville-Mézières", dep: "08", pop: 47 }, { name: "La Roche-sur-Yon", dep: "85", pop: 55 },
  { name: "Sartrouville", dep: "78", pop: 52 }, { name: "Laval", dep: "53", pop: 52 },
  { name: "Évreux", dep: "27", pop: 48 }, { name: "Épinal", dep: "88", pop: 32 },
  { name: "Bastia", dep: "2B", pop: 48 }, { name: "Châteauroux", dep: "36", pop: 44 },
  // DOM-TOM
  { name: "La Réunion", dep: "974", pop: 902, domtom: true },
  { name: "Guadeloupe", dep: "971", pop: 384, domtom: true },
  { name: "Martinique", dep: "972", pop: 355, domtom: true },
  { name: "Guyane", dep: "973", pop: 295, domtom: true },
  { name: "Mayotte", dep: "976", pop: 321, domtom: true },
  { name: "Nouvelle-Calédonie", dep: "988", pop: 272, domtom: true },
  { name: "Polynésie française", dep: "987", pop: 280, domtom: true },
  { name: "Saint-Martin", dep: "978", pop: 32, domtom: true },
  { name: "Saint-Barthélemy", dep: "977", pop: 11, domtom: true },
  { name: "Saint-Pierre-et-Miquelon", dep: "975", pop: 6, domtom: true },
  { name: "Wallis-et-Futuna", dep: "986", pop: 11, domtom: true },
];

// ─── HELPERS ─────
function gaussianCDF(x, m, s) { const erf = z => { const t = 1/(1+0.3275911*Math.abs(z)); const p = t*(0.254829592+t*(-0.284496736+t*(1.421413741+t*(-1.453152027+t*1.061405429)))); const r = 1-p*Math.exp(-z*z); return z>=0?r:-r; }; return 0.5*(1+erf((x-m)/(s*Math.sqrt(2)))); }
function gaussianRangeProb(lo, hi, m, s) { return Math.max(0.001, gaussianCDF(hi,m,s)-gaussianCDF(lo,m,s)); }
function gaussianPDF(x, m, s) { return (1/(s*Math.sqrt(2*Math.PI)))*Math.exp(-0.5*((x-m)/s)**2); }
function interpolateCelibRate(age) { const pts=DATA.celibataire_by_age_continuous; if(age<=pts[0].age) return pts[0].rate; if(age>=pts[pts.length-1].age) return pts[pts.length-1].rate; for(let i=0;i<pts.length-1;i++){if(age>=pts[i].age&&age<=pts[i+1].age){const t=(age-pts[i].age)/(pts[i+1].age-pts[i].age);return pts[i].rate+t*(pts[i+1].rate-pts[i].rate);}} return 0.3; }
function avgCelibRateForRange(a1, a2) { const{mean,std}=DATA.age_adult; let ws=0,tw=0; for(let a=a1;a<=a2;a++){const w=gaussianPDF(a,mean,std);ws+=interpolateCelibRate(a)*w;tw+=w;} return tw>0?ws/tw:0.3; }
function ageRangeToKey(a1,a2) { const m=(a1+a2)/2; if(m<25)return"18-24";if(m<30)return"25-29";if(m<35)return"30-34";if(m<40)return"35-39";if(m<50)return"40-49";if(m<60)return"50-59";return"60+"; }
function sumProbs(dm, vals) { return vals.reduce((s,v)=>s+(dm[v]||0),0); }

function AnimatedNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value), frame = useRef(null);
  useEffect(() => { const from=prev.current,to=value; if(from===to)return; const st=performance.now(); const anim=(now)=>{const p=Math.min((now-st)/duration,1);setDisplay(Math.round(from+(to-from)*(1-Math.pow(1-p,4))));if(p<1)frame.current=requestAnimationFrame(anim);else prev.current=to;}; frame.current=requestAnimationFrame(anim); return()=>cancelAnimationFrame(frame.current); }, [value, duration]);
  return (<div className="flex items-center justify-center gap-1">{display.toLocaleString("fr-FR").split("").map((c,i)=>(<span key={i} className={`inline-block ${c==="\u202F"||c===" "?"w-2":"w-[1.1em]"} text-center font-mono`} style={{textShadow:c!==" "&&c!=="\u202F"?"0 0 20px rgba(236,72,153,0.6), 0 0 40px rgba(168,85,247,0.3)":"none"}}>{c}</span>))}</div>);
}

function ParticleBG() { return (<div className="fixed inset-0 overflow-hidden pointer-events-none" style={{zIndex:0}}>{Array.from({length:30}).map((_,i)=>(<div key={i} className="absolute rounded-full" style={{width:`${2+Math.random()*3}px`,height:`${2+Math.random()*3}px`,left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,background:i%3===0?"#ec4899":i%3===1?"#a855f7":"#6366f1",opacity:0.15+Math.random()*0.2,animation:`float-particle ${8+Math.random()*12}s ease-in-out infinite`,animationDelay:`${-Math.random()*10}s`}}/>))}</div>); }

const STEPS = [
  { id:"sexe", title:"Quel genre recherchez-vous ?", icon:Heart, category:"Base", multi:true, options:[{value:"femme",label:"Une femme",icon:Heart},{value:"homme",label:"Un homme",icon:UserCircle},{value:"peu_importe",label:"Peu importe",icon:Sparkles}] },
  { id:"orientation", title:"Quelle orientation sexuelle ?", icon:Flame, category:"Base", multi:true, options:[{value:"hetero",label:"Hétérosexuel(le)",icon:Heart},{value:"homo",label:"Homosexuel(le)",icon:Heart},{value:"bi",label:"Bisexuel(le)",icon:Heart},{value:"peu_importe",label:"Peu importe",icon:Sparkles}] },
  { id:"age", title:"Quelle fourchette d'âge ?", icon:Users, category:"Base", type:"dual_slider_age" },
  { id:"celibataire", title:"Doit-il/elle être célibataire ?", icon:Target, category:"Base", options:[{value:"oui",label:"Oui, absolument",icon:Target},{value:"non",label:"Peu importe",icon:Users}] },
  { id:"origine", title:"Quelle origine / apparence ?", icon:Users, category:"Physique", multi:true, options:[{value:"europeenne",label:"Européenne"},{value:"maghrebine",label:"Maghrébine"},{value:"afro_caribbeenne",label:"Afro-caribéenne"},{value:"subsaharienne",label:"Subsaharienne"},{value:"asiatique",label:"Asiatique"},{value:"metisse",label:"Métisse"},{value:"moyen_orientale",label:"Moyen-orientale"},{value:"autre_origine",label:"Autre"},{value:"peu_importe",label:"Peu importe"}] },
  { id:"taille", title:"Quelle fourchette de taille ?", icon:Ruler, category:"Physique", type:"dual_slider" },
  { id:"yeux", title:"Quelle couleur des yeux ?", icon:Eye, category:"Physique", multi:true, options:[{value:"marron",label:"Marron",color:"#8B4513"},{value:"bleu",label:"Bleu",color:"#4A90D9"},{value:"vert",label:"Vert",color:"#2E8B57"},{value:"noisette",label:"Noisette",color:"#C4A35A"},{value:"gris",label:"Gris",color:"#9CA3AF"},{value:"peu_importe",label:"Peu importe",color:null}] },
  { id:"cheveux", title:"Quelle couleur de cheveux ?", icon:Scissors, category:"Physique", multi:true, options:[{value:"brun",label:"Brun"},{value:"chatain",label:"Châtain"},{value:"blond",label:"Blond"},{value:"roux",label:"Roux"},{value:"noir",label:"Noir"},{value:"gris_blanc",label:"Gris / Blanc"},{value:"peu_importe",label:"Peu importe"}] },
  { id:"silhouette", title:"Quel type de silhouette ?", icon:Dumbbell, category:"Physique", multi:true, options:[{value:"mince",label:"Mince"},{value:"normale",label:"Normale"},{value:"athletique",label:"Athlétique"},{value:"ronde",label:"Ronde"},{value:"forte",label:"Forte"},{value:"peu_importe",label:"Peu importe"}] },
  { id:"religion", title:"Quelle religion / croyance ?", icon:Sparkles, category:"Style de vie", multi:true, options:[{value:"catholique",label:"Catholique"},{value:"musulman",label:"Musulman(e)"},{value:"protestant",label:"Protestant(e)"},{value:"juif",label:"Juif / Juive"},{value:"bouddhiste",label:"Bouddhiste"},{value:"orthodoxe",label:"Orthodoxe"},{value:"autre_religion",label:"Autre religion"},{value:"sans_religion",label:"Sans religion"},{value:"spirituel",label:"Spirituel(le)"},{value:"peu_importe",label:"Peu importe"}] },
  { id:"diplome", title:"Quel niveau d'études minimum ?", icon:GraduationCap, category:"Style de vie", options:[{value:"sans",label:"Peu importe"},{value:"bac",label:"Bac"},{value:"bac2",label:"Bac+2"},{value:"bac3",label:"Bac+3/Licence"},{value:"bac5",label:"Bac+5/Master"},{value:"doctorat",label:"Doctorat"}] },
  { id:"fumeur", title:"Acceptez-vous un(e) fumeur(se) ?", icon:Cigarette, category:"Style de vie", options:[{value:"non",label:"Non-fumeur uniquement",icon:Zap},{value:"occasionnel",label:"Occasionnel OK",icon:Coffee},{value:"peu_importe",label:"Peu importe",icon:Wine}] },
  { id:"sport", title:"Pratique sportive souhaitée ?", icon:Dumbbell, category:"Style de vie", multi:true, options:[{value:"intensif",label:"Sportif intense"},{value:"regulier",label:"Régulier"},{value:"occasionnel",label:"Occasionnel"},{value:"jamais",label:"Pas sportif"},{value:"peu_importe",label:"Peu importe"}] },
  { id:"enfants", title:"Concernant les enfants ?", icon:Baby, category:"Style de vie", multi:true, options:[{value:"veut",label:"Veut des enfants"},{value:"ne_veut_pas",label:"N'en veut pas"},{value:"a_deja",label:"En a déjà"},{value:"peu_importe",label:"Peu importe"}] },
  { id:"region", title:"Dans quelle ville cherchez-vous ?", icon:MapPin, category:"Style de vie", type:"city_search" }
];

function calculateCandidates(answers) {
  let pool = POPULATION_FRANCE;
  const factors = [];
  const getVals = (v) => Array.isArray(v) ? v : [v];
  const hasPeu = (v) => { const a = getVals(v); return a.includes("peu_importe"); };

  if (answers.sexe && !hasPeu(answers.sexe)) { const f=sumProbs(DATA.sexe,getVals(answers.sexe)); pool*=f; factors.push({name:"Genre",factor:f}); }
  if (answers.orientation && !hasPeu(answers.orientation)) { const f=sumProbs(DATA.orientation,getVals(answers.orientation)); pool*=f; factors.push({name:"Orientation",factor:f}); }
  if (answers.age_min!=null&&answers.age_max!=null) { const f=gaussianRangeProb(answers.age_min,answers.age_max,DATA.age_adult.mean,DATA.age_adult.std); pool*=f; factors.push({name:"Tranche d'âge",factor:f}); }
  if (answers.celibataire==="oui"&&answers.age_min!=null) { const f=avgCelibRateForRange(answers.age_min,answers.age_max); pool*=f; factors.push({name:"Célibataire",factor:f}); }
  if (answers.origine && !hasPeu(answers.origine)) { const f=sumProbs(DATA.origine,getVals(answers.origine)); pool*=f; factors.push({name:"Origine",factor:f}); }
  if (answers.taille_min!=null&&answers.taille_max!=null) { const st=answers.sexe==="homme"||(!Array.isArray(answers.sexe)&&answers.sexe==="homme")?DATA.taille_homme:answers.sexe==="femme"?DATA.taille_femme:{mean:(DATA.taille_homme.mean+DATA.taille_femme.mean)/2,std:Math.max(DATA.taille_homme.std,DATA.taille_femme.std)*1.2}; const f=gaussianRangeProb(answers.taille_min,answers.taille_max,st.mean,st.std); pool*=f; factors.push({name:"Taille",factor:f}); }
  if (answers.yeux && !hasPeu(answers.yeux)) { const f=sumProbs(DATA.yeux,getVals(answers.yeux)); pool*=f; factors.push({name:"Couleur des yeux",factor:f}); }
  if (answers.cheveux && !hasPeu(answers.cheveux)) { const f=sumProbs(DATA.cheveux,getVals(answers.cheveux)); pool*=f; factors.push({name:"Couleur des cheveux",factor:f}); }
  if (answers.silhouette && !hasPeu(answers.silhouette)) { const f=sumProbs(DATA.silhouette,getVals(answers.silhouette)); pool*=f; factors.push({name:"Silhouette",factor:f}); }
  if (answers.religion && !hasPeu(answers.religion)) { const f=sumProbs(DATA.religion,getVals(answers.religion)); pool*=f; factors.push({name:"Religion",factor:f}); }
  if (answers.diplome&&answers.diplome!=="sans") { const lv=["sans","bac","bac2","bac3","bac5","doctorat"]; const idx=lv.indexOf(answers.diplome); const ak=answers.age_min!=null?ageRangeToKey(answers.age_min,answers.age_max):null; let f=0; for(let i=idx;i<lv.length;i++){let b=DATA.diplome[lv[i]];if(ak){const c=DATA.diplome_par_age_factor[ak]?.[lv[i]];if(c!==undefined)b*=c;}f+=b;} f=Math.min(f,0.95); pool*=f; factors.push({name:"Niveau d'études",factor:f}); }
  if (answers.fumeur&&answers.fumeur!=="peu_importe") { let f; if(answers.fumeur==="non")f=DATA.fumeur.non;else if(answers.fumeur==="occasionnel")f=DATA.fumeur.non+DATA.fumeur.occasionnel;else f=1; pool*=f; factors.push({name:"Tabac",factor:f}); }
  if (answers.sport && !hasPeu(answers.sport)) { const f=sumProbs(DATA.sport,getVals(answers.sport)); pool*=f; factors.push({name:"Sport",factor:f}); }
  if (answers.enfants && !hasPeu(answers.enfants)) { const vals=getVals(answers.enfants); const ak=answers.age_min!=null?ageRangeToKey(answers.age_min,answers.age_max):null; let f=0; for(const v of vals){let b=DATA.enfants[v]||0;if(ak){const c=DATA.enfants_par_age_factor[ak]?.[v];if(c!==undefined)b*=c;}f+=b;} f=Math.min(f,0.95); pool*=f; factors.push({name:"Enfants",factor:f}); }
  if (answers.region&&answers.region!=="peu_importe") { const city=CITIES.find(c=>c.name===answers.region); if(city){const f=city.pop/68000;pool*=f;factors.push({name:`Localisation (${city.name})`,factor:f});} }

  const finalCount = Math.max(0, Math.round(pool));
  factors.sort((a,b)=>a.factor-b.factor);
  return { finalCount, percentage: (finalCount/POPULATION_FRANCE)*100, factors, mostEliminating: factors[0]||null };
}

function getRarityAnalysis(count, pct, most) {
  let tier,emoji,message,color;
  if(count>500000){tier="Commun";emoji="🌍";color="#22c55e";message="Votre idéal est assez répandu. Vous avez de bonnes chances de rencontrer cette personne !";}
  else if(count>100000){tier="Peu commun";emoji="💎";color="#3b82f6";message="Ce profil se fait plus rare, mais reste tout à fait trouvable dans une grande ville.";}
  else if(count>10000){tier="Rare";emoji="⭐";color="#a855f7";message="Vous cherchez quelqu'un de spécial. Ce profil est plus rare qu'un trèfle à quatre feuilles.";}
  else if(count>1000){tier="Très rare";emoji="🦄";color="#ec4899";message="Ce profil est un véritable spécimen. L'équivalent d'une perle dans un océan de coquillages.";}
  else if(count>100){tier="Ultra rare";emoji="💫";color="#f43f5e";message="Statistiquement, vous pourriez remplir un café avec tous vos candidats potentiels en France.";}
  else if(count>10){tier="Légendaire";emoji="🔥";color="#ef4444";message="Votre idéal est si rare qu'il/elle pourrait tenir dans un ascenseur. Littéralement.";}
  else if(count>0){tier="Mythique";emoji="👑";color="#fbbf24";message="Ce profil est presque une créature de légende. Vous comptez sur les doigts d'une main.";}
  else{tier="Impossible";emoji="🌌";color="#6366f1";message="Statistiquement, cette personne n'existe pas en France. Peut-être sur une autre planète ?";}
  let elimText=""; if(most) elimText=`Le critère le plus sélectif : "${most.name}" (facteur ×${most.factor.toFixed(3)})`;
  return {tier,emoji,message,color,elimText};
}

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentPool, setCurrentPool] = useState(POPULATION_FRANCE);
  const [animating, setAnimating] = useState(false);
  const [sliderMin, setSliderMin] = useState(155);
  const [sliderMax, setSliderMax] = useState(185);
  const [ageSliderMin, setAgeSliderMin] = useState(25);
  const [ageSliderMax, setAgeSliderMax] = useState(35);
  const [citySearch, setCitySearch] = useState("");
  const [multiSel, setMultiSel] = useState([]);

  const cs = STEPS[step];
  const progress = (step / STEPS.length) * 100;

  const commitAnswer = useCallback((value) => {
    if (animating) return;
    setAnimating(true);
    let na;
    if (cs.id==="taille") na={...answers,taille_min:value.min,taille_max:value.max};
    else if (cs.id==="age") na={...answers,age_min:value.min,age_max:value.max};
    else na={...answers,[cs.id]:value};
    setAnswers(na);
    setCurrentPool(calculateCandidates(na).finalCount);
    setTimeout(()=>{setAnimating(false);setMultiSel([]);if(step<STEPS.length-1)setStep(step+1);else setPhase("result");},800);
  },[animating,answers,cs,step]);

  const toggleMulti = useCallback((v) => {
    if (v==="peu_importe") { commitAnswer("peu_importe"); return; }
    setMultiSel(p=>p.includes(v)?p.filter(x=>x!==v):[...p,v]);
  },[commitAnswer]);

  const goBack = () => {
    if(step>0){const na={...answers};const pid=STEPS[step-1].id;if(pid==="taille"){delete na.taille_min;delete na.taille_max;}else if(pid==="age"){delete na.age_min;delete na.age_max;}else delete na[pid];if(pid==="region")setCitySearch("");setAnswers(na);setMultiSel([]);setCurrentPool(calculateCandidates(na).finalCount);setStep(step-1);}
  };

  const restart = () => {
    setPhase("intro");setStep(0);setAnswers({});setCurrentPool(POPULATION_FRANCE);
    setSliderMin(155);setSliderMax(185);setAgeSliderMin(25);setAgeSliderMax(35);
    setCitySearch("");setMultiSel([]);
  };

  const result = phase==="result"?calculateCandidates(answers):null;
  const rarity = result?getRarityAnalysis(result.finalCount,result.percentage,result.mostEliminating):null;

  const sexeVals = answers.sexe ? (Array.isArray(answers.sexe) ? answers.sexe : [answers.sexe]) : [];
  const isMaleOnly = sexeVals.length===1 && sexeVals[0]==="homme";
  const isFemaleOnly = sexeVals.length===1 && sexeVals[0]==="femme";
  const tailleStats = isMaleOnly ? DATA.taille_homme : isFemaleOnly ? DATA.taille_femme : {mean:(DATA.taille_homme.mean+DATA.taille_femme.mean)/2, std:Math.max(DATA.taille_homme.std,DATA.taille_femme.std)*1.2};
  const TMin=130,TMax=230;
  const tailleProb = gaussianRangeProb(sliderMin,sliderMax,tailleStats.mean,tailleStats.std);
  const gp=[]; for(let x=TMin;x<=TMax;x++) gp.push({x,y:gaussianPDF(x,tailleStats.mean,tailleStats.std)});
  const mPDF = Math.max(...gp.map(p=>p.y));

  const AMin=18,AMax=99,aS=DATA.age_adult;
  const ageProb = gaussianRangeProb(ageSliderMin,ageSliderMax,aS.mean,aS.std);
  const agp=[]; for(let a=AMin;a<=AMax;a++) agp.push({x:a,y:gaussianPDF(a,aS.mean,aS.std)});
  const amPDF = Math.max(...agp.map(p=>p.y));

  const norm = s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const fCities = citySearch.length>0?CITIES.filter(c=>norm(c.name).includes(norm(citySearch))).slice(0,12):CITIES.slice(0,12);
  const domCities = CITIES.filter(c=>c.domtom), metroCities = CITIES.filter(c=>!c.domtom);

  const renderCurve = (pts,my,sMin,sMax,aMin,aMax,mean,gid) => (
    <svg width="100%" height="80" viewBox={`${aMin} 0 ${aMax-aMin} 80`} preserveAspectRatio="none">
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a855f7" stopOpacity="0.4"/><stop offset="100%" stopColor="#a855f7" stopOpacity="0"/></linearGradient></defs>
      <path d={`M ${aMin} 80 ${pts.map(p=>`L ${p.x} ${80-(p.y/my)*70}`).join(" ")} L ${aMax} 80 Z`} fill={`url(#${gid})`} opacity="0.3"/>
      <path d={pts.map((p,i)=>`${i===0?"M":"L"} ${p.x} ${80-(p.y/my)*70}`).join(" ")} fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="1"/>
      <path d={`M ${Math.max(aMin,sMin)} 80 ${pts.filter(p=>p.x>=sMin&&p.x<=sMax).map(p=>`L ${p.x} ${80-(p.y/my)*70}`).join(" ")} L ${Math.min(aMax,sMax)} 80 Z`} fill="rgba(236,72,153,0.25)"/>
      <path d={pts.filter(p=>p.x>=sMin&&p.x<=sMax).map((p,i)=>`${i===0?"M":"L"} ${p.x} ${80-(p.y/my)*70}`).join(" ")} fill="none" stroke="#ec4899" strokeWidth="1.5"/>
      <line x1={mean} y1="5" x2={mean} y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2"/>
    </svg>
  );

  const renderDual = (min,max,aMin,aMax,setMin,setMax) => (
    <div className="relative h-10 mb-1">
      <div className="absolute top-4 left-0 right-0 h-1.5 rounded-full" style={{background:"rgba(255,255,255,0.06)"}}/>
      <div className="absolute top-4 h-1.5 rounded-full" style={{left:`${((min-aMin)/(aMax-aMin))*100}%`,right:`${100-((max-aMin)/(aMax-aMin))*100}%`,background:"linear-gradient(90deg, #ec4899, #a855f7)"}}/>
      <input type="range" min={aMin} max={aMax} value={min} onChange={e=>{const v=+e.target.value;if(v<max-1)setMin(v);}} className="absolute top-0 left-0 w-full h-10 appearance-none bg-transparent pointer-events-none" style={{zIndex:min>aMax-10?5:3,WebkitAppearance:"none"}}/>
      <input type="range" min={aMin} max={aMax} value={max} onChange={e=>{const v=+e.target.value;if(v>min+1)setMax(v);}} className="absolute top-0 left-0 w-full h-10 appearance-none bg-transparent pointer-events-none" style={{zIndex:4,WebkitAppearance:"none"}}/>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden" style={{background:"linear-gradient(145deg, #0a0a0f 0%, #0d0518 30%, #120a24 60%, #0a0a0f 100%)",fontFamily:"'Outfit', sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        @keyframes float-particle{0%,100%{transform:translateY(0) translateX(0)}25%{transform:translateY(-30px) translateX(10px)}50%{transform:translateY(-10px) translateX(-15px)}75%{transform:translateY(-40px) translateX(5px)}}
        @keyframes slide-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fade-in{from{opacity:0}to{opacity:1}}
        @keyframes count-pulse{0%{transform:scale(1)}50%{transform:scale(1.03)}100%{transform:scale(1)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes glow-ring{0%,100%{box-shadow:0 0 15px rgba(236,72,153,0.3),0 0 30px rgba(168,85,247,0.15)}50%{box-shadow:0 0 25px rgba(236,72,153,0.5),0 0 50px rgba(168,85,247,0.25)}}
        .slide-up{animation:slide-up .5s cubic-bezier(.16,1,.3,1) forwards}
        .fade-in{animation:fade-in .4s ease forwards}
        .count-pulse{animation:count-pulse .6s ease}
        .glow-ring{animation:glow-ring 3s ease-in-out infinite}
        .option-btn{transition:all .25s cubic-bezier(.16,1,.3,1);border:1px solid rgba(168,85,247,0.15);background:rgba(255,255,255,0.03);backdrop-filter:blur(10px)}
        .option-btn:hover{border-color:rgba(236,72,153,0.5);background:rgba(236,72,153,0.08);transform:translateY(-2px);box-shadow:0 8px 25px rgba(236,72,153,0.15),0 0 0 1px rgba(236,72,153,0.2)}
        .option-btn:active{transform:translateY(0) scale(0.98)}
        .option-btn.selected{border-color:rgba(236,72,153,0.7);background:linear-gradient(135deg,rgba(236,72,153,0.15),rgba(168,85,247,0.1));box-shadow:0 0 20px rgba(236,72,153,0.2),inset 0 0 20px rgba(236,72,153,0.05)}
        .neon-text{background:linear-gradient(135deg,#ec4899,#a855f7,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .shimmer-text{background:linear-gradient(90deg,#ec4899,#a855f7,#ec4899);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite}
        input[type=range]{-webkit-appearance:none;background:transparent}
        input[type=range]::-webkit-slider-track{height:6px;border-radius:3px;background:transparent}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#ec4899,#a855f7);border:2px solid #1a0a2e;cursor:pointer;box-shadow:0 0 15px rgba(236,72,153,0.5);pointer-events:all}
        .result-card{background:linear-gradient(145deg,rgba(15,5,30,0.95),rgba(10,10,20,0.95));border:1px solid rgba(168,85,247,0.2);box-shadow:0 0 60px rgba(236,72,153,0.1),0 0 120px rgba(168,85,247,0.05)}
        .factor-bar{transition:width 1s cubic-bezier(.16,1,.3,1)}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(168,85,247,0.3);border-radius:2px}
      `}</style>
      <ParticleBG/>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">

        {phase==="intro"&&(
          <div className="text-center max-w-lg slide-up">
            <div className="mb-6 relative inline-block"><div className="w-20 h-20 rounded-full flex items-center justify-center glow-ring" style={{background:"linear-gradient(135deg,rgba(236,72,153,0.15),rgba(168,85,247,0.15))"}}><Heart size={36} color="#ec4899"/></div></div>
            <h1 className="text-4xl font-bold mb-3 tracking-tight"><span className="neon-text">Le Simulateur</span><br/><span style={{color:"rgba(255,255,255,0.9)"}}>de Rareté Amoureuse</span></h1>
            <p className="text-base mb-2" style={{color:"rgba(255,255,255,0.5)",lineHeight:1.6}}>Parmi les <span className="shimmer-text font-semibold">68 millions</span> de Français, combien correspondent à votre idéal amoureux ?</p>
            <p className="text-sm mb-8" style={{color:"rgba(255,255,255,0.35)"}}>Basé sur les données démographiques réelles de la France (INSEE).</p>
            <button onClick={()=>setPhase("quiz")} className="group relative px-8 py-3.5 rounded-full font-semibold text-white overflow-hidden" style={{background:"linear-gradient(135deg,#ec4899,#a855f7)",boxShadow:"0 0 30px rgba(236,72,153,0.3)"}}>
              <span className="relative z-10 flex items-center gap-2">Découvrir <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></span>
            </button>
            <div className="mt-10 flex items-center justify-center gap-6 text-xs" style={{color:"rgba(255,255,255,0.25)"}}>
              <span className="flex items-center gap-1"><Brain size={12}/> Probabiliste</span>
              <span className="flex items-center gap-1"><Search size={12}/> 15 critères</span>
              <span className="flex items-center gap-1"><Sparkles size={12}/> Données INSEE</span>
            </div>
            <AdBanner slot="1111111111" format="horizontal" className="mt-6 opacity-70" />
          </div>
        )}

        {phase==="quiz"&&cs&&(
          <div className="w-full max-w-lg">
            <div className="text-center mb-6 slide-up">
              <p className="text-xs uppercase tracking-widest mb-1" style={{color:"rgba(255,255,255,0.35)"}}>Candidat{currentPool!==1?"s":""} restant{currentPool!==1?"s":""}</p>
              <div className="text-4xl font-bold count-pulse" style={{fontFamily:"'Space Mono', monospace",color:"#fff"}}><AnimatedNumber value={currentPool}/></div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium" style={{color:"rgba(168,85,247,0.7)"}}>{cs.category}</span>
                <span className="text-xs" style={{color:"rgba(255,255,255,0.3)"}}>{step+1}/{STEPS.length}</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.06)"}}><div className="h-full rounded-full transition-all duration-700 ease-out" style={{width:`${progress}%`,background:"linear-gradient(90deg,#ec4899,#a855f7)"}}/></div>
            </div>
            <div key={step} className="slide-up">
              {/* Ad banner top */}
              <AdBanner slot="5555555555" format="horizontal" className="mb-4 opacity-60" />

              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:"rgba(236,72,153,0.1)",border:"1px solid rgba(236,72,153,0.2)"}}>{cs.icon&&<cs.icon size={20} color="#ec4899"/>}</div>
                <h2 className="text-lg font-semibold" style={{color:"rgba(255,255,255,0.9)"}}>{cs.title}</h2>
              </div>
              {cs.multi?<p className="text-xs mb-4 ml-[52px]" style={{color:"rgba(168,85,247,0.5)"}}>Plusieurs choix possibles</p>:<div className="mb-5"/>}

              {/* TAILLE */}
              {cs.type==="dual_slider"?(
                <div className="px-2">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="text-center"><span className="text-xs block mb-0.5" style={{color:"rgba(255,255,255,0.35)"}}>Min</span><span className="text-3xl font-bold neon-text" style={{fontFamily:"'Space Mono'"}}>{sliderMin}</span></div>
                    <span className="text-lg mt-4" style={{color:"rgba(255,255,255,0.2)"}}>–</span>
                    <div className="text-center"><span className="text-xs block mb-0.5" style={{color:"rgba(255,255,255,0.35)"}}>Max</span><span className="text-3xl font-bold neon-text" style={{fontFamily:"'Space Mono'"}}>{sliderMax}</span></div>
                    <span className="text-lg ml-1 mt-4" style={{color:"rgba(255,255,255,0.4)"}}>cm</span>
                  </div>
                  <div className="text-center mb-4"><span className="inline-block text-xs px-3 py-1 rounded-full" style={{background:"rgba(168,85,247,0.1)",border:"1px solid rgba(168,85,247,0.2)",color:"rgba(168,85,247,0.8)"}}>{(tailleProb*100).toFixed(1)}% de la population</span></div>
                  <div className="relative mb-2" style={{height:80}}>{renderCurve(gp,mPDF,sliderMin,sliderMax,TMin,TMax,tailleStats.mean,"tG")}</div>
                  {renderDual(sliderMin,sliderMax,TMin,TMax,setSliderMin,setSliderMax)}
                  <div className="flex justify-between text-xs mb-5" style={{color:"rgba(255,255,255,0.25)"}}><span>{TMin} cm</span><span>Moy: {tailleStats.mean} cm</span><span>{TMax} cm</span></div>
                  <button onClick={()=>commitAnswer({min:sliderMin,max:sliderMax})} disabled={animating} className="w-full py-3 rounded-xl font-semibold text-white" style={{background:"linear-gradient(135deg,#ec4899,#a855f7)",opacity:animating?0.5:1}}>Valider</button>
                </div>

              ):cs.type==="dual_slider_age"?(
                <div className="px-2">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="text-center"><span className="text-xs block mb-0.5" style={{color:"rgba(255,255,255,0.35)"}}>Min</span><span className="text-3xl font-bold neon-text" style={{fontFamily:"'Space Mono'"}}>{ageSliderMin}</span></div>
                    <span className="text-lg mt-4" style={{color:"rgba(255,255,255,0.2)"}}>–</span>
                    <div className="text-center"><span className="text-xs block mb-0.5" style={{color:"rgba(255,255,255,0.35)"}}>Max</span><span className="text-3xl font-bold neon-text" style={{fontFamily:"'Space Mono'"}}>{ageSliderMax}</span></div>
                    <span className="text-lg ml-1 mt-4" style={{color:"rgba(255,255,255,0.4)"}}>ans</span>
                  </div>
                  <div className="text-center mb-4"><span className="inline-block text-xs px-3 py-1 rounded-full" style={{background:"rgba(168,85,247,0.1)",border:"1px solid rgba(168,85,247,0.2)",color:"rgba(168,85,247,0.8)"}}>{(ageProb*100).toFixed(1)}% de la population adulte</span></div>
                  <div className="relative mb-2" style={{height:80}}>{renderCurve(agp,amPDF,ageSliderMin,ageSliderMax,AMin,AMax,aS.mean,"aG")}</div>
                  {renderDual(ageSliderMin,ageSliderMax,AMin,AMax,setAgeSliderMin,setAgeSliderMax)}
                  <div className="flex justify-between text-xs mb-5" style={{color:"rgba(255,255,255,0.25)"}}><span>{AMin} ans</span><span>Moy: {aS.mean} ans</span><span>{AMax} ans</span></div>
                  <button onClick={()=>commitAnswer({min:ageSliderMin,max:ageSliderMax})} disabled={animating} className="w-full py-3 rounded-xl font-semibold text-white" style={{background:"linear-gradient(135deg,#ec4899,#a855f7)",opacity:animating?0.5:1}}>Valider</button>
                </div>

              ):cs.type==="city_search"?(
                <div className="px-2">
                  <div className="relative mb-3">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:"rgba(255,255,255,0.3)"}}/>
                    <input type="text" value={citySearch} onChange={e=>setCitySearch(e.target.value)} placeholder="Rechercher une ville..." className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(168,85,247,0.2)",color:"rgba(255,255,255,0.9)",caretColor:"#ec4899"}}/>
                  </div>
                  <button onClick={()=>{commitAnswer("peu_importe");setCitySearch("");}} disabled={animating} className="option-btn rounded-xl px-4 py-3 text-left flex items-center gap-3 w-full mb-2" style={{opacity:animating?0.5:1}}><Sparkles size={16} style={{color:"#a855f7"}}/><span className="text-sm font-medium" style={{color:"rgba(255,255,255,0.85)"}}>Toute la France</span></button>
                  <div className="overflow-y-auto pr-1" style={{maxHeight:280}}>
                    {citySearch.length>0?(fCities.length>0?(<div className="space-y-1.5">{fCities.map(c=>(<button key={c.name} onClick={()=>{commitAnswer(c.name);setCitySearch("");}} disabled={animating} className="option-btn rounded-xl px-4 py-2.5 text-left flex items-center justify-between w-full" style={{opacity:animating?0.5:1}}><div className="flex items-center gap-2.5"><MapPin size={14} style={{color:c.domtom?"#6366f1":"#ec4899"}}/><span className="text-sm font-medium" style={{color:"rgba(255,255,255,0.85)"}}>{c.name}</span></div><span className="text-xs" style={{color:"rgba(255,255,255,0.25)"}}>{c.pop}k</span></button>))}</div>):<p className="text-center text-sm py-6" style={{color:"rgba(255,255,255,0.3)"}}>Aucune ville trouvée</p>):(
                      <>
                        <p className="text-xs uppercase tracking-wider mb-2 mt-1 font-semibold" style={{color:"rgba(236,72,153,0.5)"}}>Métropole</p>
                        <div className="space-y-1.5 mb-3">{metroCities.slice(0,10).map(c=>(<button key={c.name} onClick={()=>{commitAnswer(c.name);setCitySearch("");}} disabled={animating} className="option-btn rounded-xl px-4 py-2.5 text-left flex items-center justify-between w-full" style={{opacity:animating?0.5:1}}><div className="flex items-center gap-2.5"><MapPin size={14} style={{color:"#ec4899"}}/><span className="text-sm font-medium" style={{color:"rgba(255,255,255,0.85)"}}>{c.name}</span></div><span className="text-xs" style={{color:"rgba(255,255,255,0.25)"}}>{c.pop}k</span></button>))}</div>
                        <p className="text-xs uppercase tracking-wider mb-2 font-semibold" style={{color:"rgba(99,102,241,0.5)"}}>DOM-TOM</p>
                        <div className="space-y-1.5">{domCities.map(c=>(<button key={c.name} onClick={()=>{commitAnswer(c.name);setCitySearch("");}} disabled={animating} className="option-btn rounded-xl px-4 py-2.5 text-left flex items-center justify-between w-full" style={{opacity:animating?0.5:1}}><div className="flex items-center gap-2.5"><MapPin size={14} style={{color:"#6366f1"}}/><span className="text-sm font-medium" style={{color:"rgba(255,255,255,0.85)"}}>{c.name}</span></div><span className="text-xs" style={{color:"rgba(255,255,255,0.25)"}}>{c.pop}k</span></button>))}</div>
                      </>
                    )}
                  </div>
                </div>

              ):cs.multi?(
                <div>
                  <div className={`grid gap-2.5 ${cs.options.length<=3?"grid-cols-1":"grid-cols-2"}`}>
                    {cs.options.map(opt=>{
                      const isSel = opt.value!=="peu_importe" && multiSel.includes(opt.value);
                      return (
                        <button key={opt.value} onClick={()=>toggleMulti(opt.value)} disabled={animating}
                          className={`option-btn rounded-xl px-4 py-3.5 text-left flex items-center gap-3 ${isSel?"selected":""}`} style={{opacity:animating?0.5:1}}>
                          {opt.value!=="peu_importe"?(
                            <div className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-all" style={{borderColor:isSel?"#ec4899":"rgba(255,255,255,0.15)",background:isSel?"linear-gradient(135deg,#ec4899,#a855f7)":"transparent"}}>
                              {isSel&&<Check size={12} color="#fff" strokeWidth={3}/>}
                            </div>
                          ):(opt.icon?<opt.icon size={18} style={{color:"rgba(255,255,255,0.4)"}}/>:<Sparkles size={18} style={{color:"rgba(255,255,255,0.4)"}}/>)}
                          {opt.color?<div className="w-4 h-4 rounded-full flex-shrink-0 border border-white/10" style={{background:opt.color}}/>:null}
                          <span className="text-sm font-medium" style={{color:"rgba(255,255,255,0.85)"}}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={()=>{if(multiSel.length>0)commitAnswer(multiSel);}} disabled={animating||multiSel.length===0}
                    className="w-full mt-4 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all"
                    style={{background:multiSel.length>0?"linear-gradient(135deg,#ec4899,#a855f7)":"rgba(255,255,255,0.05)",opacity:multiSel.length>0?1:0.3,boxShadow:multiSel.length>0?"0 0 20px rgba(236,72,153,0.2)":"none"}}>
                    <Check size={16}/> Valider{multiSel.length>0?` (${multiSel.length})`:""}
                  </button>
                </div>

              ):(
                <div className={`grid gap-2.5 ${cs.options&&cs.options.length<=3?"grid-cols-1":"grid-cols-2"}`}>
                  {cs.options&&cs.options.map(opt=>(
                    <button key={opt.value} onClick={()=>commitAnswer(opt.value)} disabled={animating}
                      className={`option-btn rounded-xl px-4 py-3.5 text-left flex items-center gap-3 ${answers[cs.id]===opt.value?"selected":""}`} style={{opacity:animating?0.5:1}}>
                      {opt.color!==undefined?(opt.color?<div className="w-5 h-5 rounded-full flex-shrink-0 border border-white/10" style={{background:opt.color}}/>:<Sparkles size={18} style={{color:"rgba(255,255,255,0.4)"}}/>):opt.icon?<opt.icon size={18} style={{color:"#ec4899"}}/>:null}
                      <span className="text-sm font-medium" style={{color:"rgba(255,255,255,0.85)"}}>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {step>0&&(<button onClick={goBack} className="mt-4 flex items-center gap-1 text-xs mx-auto" style={{color:"rgba(255,255,255,0.3)"}}><ChevronLeft size={14}/> Revenir</button>)}

              {/* Ad banner bottom */}
              <AdBanner slot="6666666666" format="horizontal" className="mt-5 opacity-60" />
            </div>
          </div>
        )}

        {phase==="result"&&result&&rarity&&(
          <div className="w-full max-w-lg slide-up">
            <div className="result-card rounded-2xl p-6 mb-4">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{rarity.emoji}</div>
                <h2 className="text-sm uppercase tracking-widest mb-1 font-semibold" style={{color:rarity.color}}>{rarity.tier}</h2>
                <div className="text-4xl font-bold mb-1" style={{fontFamily:"'Space Mono', monospace",color:"#fff"}}><AnimatedNumber value={result.finalCount} duration={2000}/></div>
                <p className="text-xs" style={{color:"rgba(255,255,255,0.4)"}}>candidat{result.finalCount!==1?"s":""} en France</p>
              </div>
              <div className="rounded-xl p-4 mb-5" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(168,85,247,0.15)"}}>
                <div className="flex items-center justify-between mb-2"><span className="text-xs" style={{color:"rgba(255,255,255,0.5)"}}>Score de Rareté</span><span className="text-xs font-mono font-bold" style={{color:rarity.color}}>{result.percentage<0.001?result.percentage.toExponential(1):result.percentage.toFixed(4)}%</span></div>
                <div className="h-2 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.06)"}}><div className="h-full rounded-full transition-all duration-1000" style={{width:`${Math.max(2,Math.min(100,Math.log10(result.finalCount+1)/Math.log10(POPULATION_FRANCE)*100))}%`,background:`linear-gradient(90deg,${rarity.color},#a855f7)`}}/></div>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{color:"rgba(255,255,255,0.6)"}}>{rarity.message}</p>

              {/* Affiliate CTA — prime position */}
              <AffiliateButton count={result.finalCount} />

              {/* Ad after CTA */}
              <AdBanner slot="3333333333" format="rectangle" className="my-4 opacity-70" />

              {rarity.elimText&&(<div className="rounded-lg px-3 py-2 mb-5 flex items-start gap-2" style={{background:"rgba(236,72,153,0.06)",border:"1px solid rgba(236,72,153,0.15)"}}><TrendingDown size={14} className="mt-0.5 flex-shrink-0" color="#ec4899"/><p className="text-xs" style={{color:"rgba(255,255,255,0.5)"}}>{rarity.elimText}</p></div>)}
              <div>
                <h3 className="text-xs uppercase tracking-wider mb-3 font-semibold" style={{color:"rgba(255,255,255,0.35)"}}>Impact de chaque critère</h3>
                <div className="space-y-2">
                  {result.factors.map((f,i)=>{const ip=(1-f.factor)*100;return(
                    <div key={i} className="fade-in" style={{animationDelay:`${i*80}ms`}}>
                      <div className="flex justify-between items-center mb-0.5"><span className="text-xs" style={{color:"rgba(255,255,255,0.55)"}}>{f.name}</span><span className="text-xs font-mono" style={{color:"rgba(255,255,255,0.35)"}}>−{ip.toFixed(1)}%</span></div>
                      <div className="h-1 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.05)"}}><div className="factor-bar h-full rounded-full" style={{width:`${ip}%`,background:ip>70?"#ef4444":ip>40?"#f59e0b":"#22c55e"}}/></div>
                    </div>);})}
                </div>
              </div>
            </div>
            <button onClick={restart} className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2" style={{background:"linear-gradient(135deg,rgba(236,72,153,0.2),rgba(168,85,247,0.2))",border:"1px solid rgba(168,85,247,0.3)"}}><RotateCcw size={16}/> Recommencer</button>

            {/* Bottom ad */}
            <AdBanner slot="4444444444" format="horizontal" className="mt-4 opacity-60" />

            <p className="text-center text-xs mt-4" style={{color:"rgba(255,255,255,0.2)"}}>Calcul probabiliste basé sur les données INSEE et enquêtes sociologiques.<br/>Les résultats sont des estimations statistiques, pas une science exacte 😉</p>

            <div className="text-center mt-2"><AffiliateLink /></div>
          </div>
        )}
      </div>
    </div>
  );
}
