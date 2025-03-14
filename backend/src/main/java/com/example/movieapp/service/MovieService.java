package com.example.movieapp.service;

import com.example.movieapp.model.Movie;
import com.example.movieapp.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieByTitle(String title) {
        return movieRepository.findByTitle(title);
    }

    public void deleteMovieByTitle(String title) {
        Movie movie = movieRepository.findByTitle(title);
        if (movie != null) {
            movieRepository.delete(movie);
        }
    }
}