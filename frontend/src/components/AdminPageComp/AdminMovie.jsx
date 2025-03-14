const AdminMovie = ({movie}) => {
  return (
      <div className="admin__movie">
              <div className="admin__movie__header">
                <h3 className="admin__movie__title">{movie.title == null ? "N/A" : movie.title}</h3>
                <button className="admin__movie__edit__button">Edit</button>
              </div>
              <div className="admin__movie__rows">
                <div className="admin__movie__info">
                    <span className="admin__movie__info__span1">Movie ID: </span>
                    <span className="admin__movie__info__span1">Genre: </span>
                    <span className="admin__movie__info__span1">Cast: </span>
                    <span className="admin__movie__info__span1">Director: </span>
                    <span className="admin__movie__info__span1">Producer: </span>
                    <span className="admin__movie__info__span1">Reviews: </span>
                    <span className="admin__movie__info__span1">Image-URL: </span>
                    <span className="admin__movie__info__span1">Video-URL: </span>
                    <span className="admin__movie__info__span1">MPPA: </span>
                    <span className="admin__movie__info__span1">Showtimes: </span>
                    <span className="admin__movie__info__span1">Sypnopsis: </span>
                </div>
                <div className="admin__movie__info">
                    <span className="admin__movie__info__span2">{movie.id == null ? "N/A" : movie.id}</span>
                    <span className="admin__movie__info__span2">{movie.genre == null ? "N/A" : movie.genre}</span>
                    <span className="admin__movie__info__span2">{movie.cast == null ? "N/A" : movie.cast}</span>
                    <span className="admin__movie__info__span2">{movie.director == null ? "N/A" : movie.director}</span>
                    <span className="admin__movie__info__span2">{movie.producer == null ? "N/A" : movie.producer}</span>
                    <span className="admin__movie__info__span2">{movie.reviews == null ? "N/A" : movie.reviews}</span>
                    <span className="admin__movie__info__span2">{movie.picture == null ? "N/A" : movie.picture}</span>
                    <span className="admin__movie__info__span2">{movie.video == null ? "N/A" : movie.video}</span>
                    <span className="admin__movie__info__span2">{movie.mppa == null ? "N/A" : movie.mppa}</span>
                    <span className="admin__movie__info__span2">{movie.showtimes == null ? "N/A" : movie.showtimes}</span>
                    <span className="admin__movie__info__span2">{movie.synopsis == null ? "N/A" : movie.synopsis}</span>
                </div>
                    
                 
                </div>
                <i className="material-symbols-outlined admin__movie__trash">delete</i>
      
            </div>
  )
}

export default AdminMovie
