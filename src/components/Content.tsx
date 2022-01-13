import { Grid, GridCellRangeRenderer, GridCellRenderer } from "react-virtualized";
import { MovieCard } from "./MovieCard";


interface ContentProps {
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

export function Content({ selectedGenre, movies }: ContentProps) {

  const cellRenderer: GridCellRenderer = ({ key, rowIndex, columnIndex, style }) => {
    const movie = movies[Math.trunc(rowIndex * 3 + columnIndex)]
    console.log(
      {
        key, rowIndex, columnIndex, movie
      }
    )
    return (
      <div key={key} style={style}>
        {
          movie &&
          <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        }
      </div>
    )
  }

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <Grid
          className="movies-list"
          cellRenderer={cellRenderer}
          columnCount={3}
          columnWidth={240}
          autoWidth
          height={1000}
          autoHeight
          rowCount={Math.ceil(movies.length / 3)}
          rowHeight={400}
          width={1000}
        />
      </main>
    </div>
  )
}