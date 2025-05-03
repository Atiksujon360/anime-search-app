export interface Anime {
  mal_id: number;
  title: string;
  synopsis: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
  rank: number;
  popularity: number;
  members: number;
}


export interface AnimeSearchProps {
  query: string;
  onQueryChange: (newQuery: string) => void;
  onSearchClick: () => void; // Add a prop for handling search icon click
}
