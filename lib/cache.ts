
import { CacheEntry } from "./types";

class SimpleCache {
    private cache = new Map<string, CacheEntry>();
    private readonly TTL = 5*60*1000; // 5minute
    private readonly MAX_SIZE = 100;

    private generatekey(text:string, formality:string , verbosity:string):string{
        // hash function for cache key

        const str = `${text}-${formality}-${verbosity}`;
        let hash =0;
        for(let i=0;i<str.length;i++){
            const char = str.charCodeAt(i);
            hash = ((hash << 5)-  hash) + char;
            hash = hash & hash; //convert to 32 bit integer
        }
        return hash.toString();
    }

    get(text:string , formality:string , verbosity:string):string | null{
        const key = this.generatekey(text,formality,verbosity);
        const entry = this.cache.get(key);

        if(!entry){
            return null;
        }

        // check is entry has expired

        if(Date.now() - entry.timestamp > this.TTL){
            this.cache.delete(key);
            return null;
        }

        return entry.text;
    }

    set(text:string,formality:string,verbosity:string,rewrittenText:string):void{
            const key = this.generatekey(text,formality,verbosity);

            // remove oldest entry if cache is full

            if(this.cache.size >= this.MAX_SIZE){
                const firstKey = this.cache.keys().next().value;

                if(firstKey){
                    this.cache.delete(firstKey);
                }

            }
            this.cache.set(key,{
                text:rewrittenText,
                timestamp:Date.now()
            });
    }

    clear():void{
        this.cache.clear();
    }
}

export const cache = new SimpleCache();