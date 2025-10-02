
import {useThemeStore} from "../store/useThemeStore";
import { PaletteIcon } from "lucide-react";
import {THEMES} from "../constants";
const ThemeSelector=()=>{
   const{theme,setTheme} =useThemeStore();
   return (
    <div className ="dropdown dropdown-end">
<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
    <PaletteIcon className="size-5"></PaletteIcon>
</div>

     <div className ="dropdown-content menu mt-2 p-2 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-64 border border-base-content/10 max-h-96 overflow-y-auto z-50">
     <div className="space-y-1">
        {THEMES.map((themeOption)=>(
            <button key={themeOption.name} className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
    theme===themeOption.name
    ?"bg-primary/70 text-primary"
    :"hover:bg-base-content/5"

            }`}
            onClick={()=>setTheme(themeOption.name)}
            
            >
    <PaletteIcon className="size-4"/>
    <span className="text-sm font-medium">{themeOption.label}</span>
   
   <div className="ml-auto flex gap-1">
    {themeOption.colors.map((color,i)=>(
        <span
        key={i}
         className="size-2 rounded-full"
         style={{backgroundColor:color}}
        ></span>
    ))}
   </div>
            </button>
        ))}
     </div>
        
     </div>

    </div>
   )
};
export default ThemeSelector ;