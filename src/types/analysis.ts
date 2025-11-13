export interface AnalysisResult {
  filename: string;
  dominant_colors: string[];
  message: string;
}

export interface RealtimeResponse {
  dominant_colors?: string[];
  error?: string;
}

export interface AnalysisItem {
  id: number;
  filename: string;
  dominant_colors: string[];
  timestamp: string;
  image_url: string;
}

export interface HistoryApiResponse {
  items: AnalysisItem[];
  total_items: number;
  total_pages: number;
  current_page: number;
}
