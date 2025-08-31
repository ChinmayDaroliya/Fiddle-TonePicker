export interface HistoryState {
    text:string;
    timestamp: number;
}

export interface ToneRequest {
    text:string;
    formality: 'formal' | 'neutral' | 'casual';
    verbosity : 'concise' | 'neutral' | 'elaborate';
}

export interface CacheEntry {
    text:string;
    timestamp : number;
}

export interface ToneCell{
    formality: 'formal'|'neutral'|'casual';
    verbosity: 'concise'|'neutral'|'elaborate';
    label:string;
}

export interface ToneResponse{
    rewrittenText :string;
    cached?: boolean;
}